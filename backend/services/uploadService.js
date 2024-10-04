// services/uploadService.js
const cloudinary = require('../config/cloudinary');

// Helper function for uploading to Cloudinary using Promises
const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
            if (error) {
                return reject(error);
            }
            resolve(result);
        });
        uploadStream.end(fileBuffer); // Send file buffer to Cloudinary
    });
};

module.exports = uploadToCloudinary;
