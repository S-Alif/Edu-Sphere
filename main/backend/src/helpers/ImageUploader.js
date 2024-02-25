const { v2 } =  require('cloudinary')

v2.config({
  cloud_name: process.env.imageCloudName,
  api_key: process.env.imageUploadApi,
  api_secret: process.env.imageCloudSecret
});


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
    console.log(error)
    return null
  }
}