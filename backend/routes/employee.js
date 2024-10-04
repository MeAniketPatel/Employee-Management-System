const express = require('express');
const multer = require('multer');
const Employee = require('../models/Employee');
const router = express.Router();
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

// @route   POST /api/employees
// @desc    Create an employee
router.post('/employees', upload.single('image'), async (req, res) => {
    const { name, email, mobileNo, designation, gender, courses } = req.body;

    try {
        // Validate email format (simple regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email format' });
        }

        // Check for duplicate email
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ success: false, message: 'Email already exists' });
        }

        // Upload the image to Cloudinary
        let imageUrl = '';
        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.buffer);
            imageUrl = uploadResult.secure_url; // Get the secure URL from Cloudinary
        }

        // Create a new employee instance
        const newEmployee = new Employee({
            name,
            email,
            mobileNo,
            designation,
            gender,
            courses: Array.isArray(courses) ? courses : [courses], // Ensure it's an array
            image: imageUrl, // Store the secure URL from Cloudinary
        });

        await newEmployee.save();
        return res.status(201).json({ success: true, message: 'Employee created successfully', employee: newEmployee });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
