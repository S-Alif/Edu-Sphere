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
exports.pdfUploader = async (fileDataUrl) => {
  try {
    // Extract the MIME type from the data URL
    const matches = fileDataUrl.match(/^data:application\/(?:pdf|vnd\.openxmlformats-officedocument\.(?:wordprocessingml\.document|presentationml\.presentation)|msword|vnd\.ms-powerpoint);base64/);
    if (!matches) {
      return null
    }

    let fileExtension = '';
    if (fileDataUrl.includes('application/pdf')) {
      fileExtension = 'pdf';
    } else if (fileDataUrl.includes('vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      fileExtension = 'docx';
    } else if (fileDataUrl.includes('vnd.openxmlformats-officedocument.presentationml.presentation')) {
      fileExtension = 'pptx';
    } else if (fileDataUrl.includes('application/msword')) {
      fileExtension = 'doc';
    } else if (fileDataUrl.includes('vnd.ms-powerpoint')) {
      fileExtension = 'ppt';
    } else {
      return null
    }

    // Remove the data URL prefix
    const base64Data = fileDataUrl.replace(/^data:application\/(?:pdf|vnd\.openxmlformats-officedocument\.(?:wordprocessingml\.document|presentationml\.presentation)|msword|vnd\.ms-powerpoint);base64,/, '');

    // Decode base64 data and write the file
    const binaryData = Buffer.from(base64Data, 'base64');
    const outputDir = path.join(__dirname, "../assignments");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
    const fileName = `file_${Date.now()}.${fileExtension}`;
    const filePath = path.join(outputDir, fileName);
    fs.writeFileSync(filePath, binaryData);

    // Return the file path
    return "/assignments/" + fileName;
  } catch (error) {
    return null;
  }
};