const { v2 } = require('cloudinary')
const fs = require('fs');
const path = require('path');

v2.config({
  cloud_name: process.env.imageCloudName,
  api_key: process.env.imageUploadApi,
  api_secret: process.env.imageCloudSecret
});

// public id finder
exports.extractPublicId = (imageUrl) => {
  const parts = imageUrl.split('/');
  const fileName = parts.pop();
  const publicId = fileName.split('.')[0];
  return publicId;
}

exports.imgDeleter = async (publicId) => {
  try {
    let deletePic = await v2.uploader.destroy(publicId);
    return true
  } catch (error) {
    return null
  }
}

// upload image
exports.imageUploader = async (image) => {
  try {
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    let result = await new Promise((resolve, reject) => {
      const stream = v2.uploader.upload_stream({ transformation: { quality: 'auto:low' } }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
      stream.write(buffer);
      stream.end();
    });

    return result.url
  } catch (error) {
    return null
  }
}

// pdf uploader
exports.pdfUploader = async (pdf) => {
  try {
    const base64Data = pdf.replace(/^data:application\/pdf;base64,/, '');
    const binaryData = Buffer.from(base64Data, 'base64');
    let output = path.join(__dirname, "../assignments")

    if (!fs.existsSync(output)) {
      fs.mkdirSync(output)
    }
    const fileName = `assignment_${Date.now()}.pdf`;
    const filePath = path.join(output, fileName);

    fs.writeFileSync(filePath, binaryData);

    return "/assignments/"+fileName;
  } catch (error) {
    return null;
  }
}
