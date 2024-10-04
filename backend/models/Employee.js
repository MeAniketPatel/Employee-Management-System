// models/Employee.js
const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    mobileNo: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        enum: ['Manager', 'Developer', 'Designer'], // Example options
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true,
    },
    courses: {
        type: [String], // Array to hold selected courses
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Employee', EmployeeSchema);
