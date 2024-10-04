// middleware/upload.js
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Use memory storage for Cloudinary upload
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(file.originalname.toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb('Error: Only images (JPG/PNG) are allowed!');
    },
});

module.exports = upload;
