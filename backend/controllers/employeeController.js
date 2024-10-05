// controllers/employeeController.js

const Employee = require('../models/Employee');
const uploadToCloudinary = require('../services/uploadService');

// Create employee function
const createEmployee = async (req, res) => {
    const { name, email, mobileNo, designation, gender, courses } = req.body;
    console.log(req.body);


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
};

// Update employee function
const updateEmployee = async (req, res) => {
    const { name, email, mobileNo, designation, gender, courses } = req.body;

    try {
        // Find the employee by ID
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }

        // Check for duplicate email if it's being updated
        if (email && email !== employee.email) {
            const existingEmployee = await Employee.findOne({ email });
            if (existingEmployee) {
                return res.status(400).json({ success: false, message: 'Email already exists' });
            }
        }

        // Upload new image to Cloudinary if provided
        let imageUrl = employee.image; // Keep existing image URL
        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file.buffer);
            imageUrl = uploadResult.secure_url; // Update to the new secure URL from Cloudinary
        }

        // Update employee details
        employee.name = name || employee.name;
        employee.email = email || employee.email;
        employee.mobileNo = mobileNo || employee.mobileNo;
        employee.designation = designation || employee.designation;
        employee.gender = gender || employee.gender;
        employee.courses = Array.isArray(courses) ? courses : [courses] || employee.courses;
        employee.image = imageUrl; // Store the secure URL from Cloudinary

        await employee.save();
        return res.status(200).json({ success: true, message: 'Employee updated successfully', employee });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get all employees function
const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        return res.status(200).json({ success: true, employees });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};
const getEmployeesById = async (req, res) => {
    try {
        // Use req.params.id to get the employee ID from the request
        const employee = await Employee.findById(req.params.id); // Use findById to get a single employee

        if (!employee) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }

        return res.status(200).json({ success: true, employee }); // Return the employee data
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Export functions
module.exports = {
    createEmployee,
    updateEmployee,
    getAllEmployees,
    getEmployeesById
};
