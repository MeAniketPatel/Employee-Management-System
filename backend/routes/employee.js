// routes/employeeRoutes.js
const express = require('express');
const { createEmployee, updateEmployee, getAllEmployees, getEmployeesById, deleteEmployeesById } = require('../controllers/employeeController');
const upload = require('../middleware/upload'); // Importing multer upload middleware

const router = express.Router();

router.post('/employees', upload.single('image'), createEmployee);
router.put('/employees/:id', upload.single('image'), updateEmployee);
router.get('/employees', getAllEmployees);
router.get('/employees/:id', getEmployeesById);
router.delete('/employees/:id', deleteEmployeesById);

module.exports = router;
