# Employee Management System

## Overview

The **Employee Management System** is a web application designed for managing employees with an intuitive interface for the admin. It provides functionality for creating, updating, listing, and deleting employee records. The system also offers advanced features such as search, pagination, sorting, and validation.

This system is built using the **MERN stack** (MongoDB, Express, React, Node.js) and integrates Cloudinary for image storage. The frontend is styled with **Tailwind CSS**.

## Live Demo
[Click here to view the live demo](https://employee-managment-system-mern.netlify.app)

### Login Credentials for Testing:
- **username:** admin
- **password:** 12345

## Features

- **Admin Login:**
  - Secure login with show/hide password functionality.
- **Dashboard:**
  - Displays a welcome message ("Welcome to Admin Panel").
  - Links to employee management pages (Employee List, Create Employee, Logout).
- **Employee Management:**
  - **Employee List**: Displays all employees with pagination, search, and sorting on multiple fields (Name, Email, ID, Date).
  - **Create Employee**: Form to create a new employee with fields like:
    - Unique ID (auto-generated)
    - Name (textbox)
    - Email (textbox with email format validation and duplicacy check)
    - Mobile Number (textbox with numeric validation)
    - Designation (dropdown)
    - Gender (radio button)
    - Courses (checkbox)
    - Image (file upload, only JPG/PNG supported, integrated with Cloudinary)
    - Creation Date (auto-generated)
    - Actions (Edit, Delete)
  - **Edit/Update Employee**: Form to update employee details.
  - **Delete Employee**: Soft delete functionality with confirmation.
- **Search and Filter:**
  - Search functionality to filter employees by name, email, or other fields.
- **Pagination and Sorting:**

  - Pagination on the employee list for better navigation.
  - Sorting functionality on various fields like Name, Email, ID, and Date.

- **Validation:**
  - Proper validation on fields like Email (format, duplicacy), Mobile Number (numeric only), and required fields.

## Technology Stack

### Frontend:

- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling the frontend.
- **Axios**: For making HTTP requests to the backend API.
- **Vite**: For faster frontend tooling and bundling.

### Backend:

- **Node.js**: JavaScript runtime environment for the backend.
- **Express.js**: Web framework for Node.js to handle routing and API requests.
- **MongoDB**: NoSQL database for storing employee data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **Cloudinary**: For storing and managing employee images.

### Additional Libraries:

- **JWT (JSON Web Token)**: For admin authentication.
- **bcrypt.js**: For hashing and verifying passwords.

## Project Setup

### Prerequisites:

- **Node.js** and **npm** installed on your local machine.
- A **MongoDB** instance (cloud-based, MongoDB Atlas).
- A **Cloudinary** account for image upload integration.

### Backend Setup:

1. Clone the repository:

   ```bash
   git clone https://github.com/MeAniketPatel/Employee-Management-System.git
   cd Employee-Management-System
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables in a `.env` file:

   ```env
   PORT=3000
   MONGO_URI=your-mongodb-uri
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   JWT_SECRET=your-jwt-secret
   ```

4. Start the backend server:

   ```bash
   node server.js
   ```

   The backend server will start on `http://localhost:3000`.

### Frontend Setup:

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`.

### Project Structure

```bash
employee-management-system/
├── backend/
│   ├── config/
│   │   ├── cloudinary.js         # Cloudinary configuration for image uploads
│   │   ├── db.js                 # MongoDB connection setup
│   ├── controllers/
│   │   ├── authController.js     # User authentication logic (login, register)
│   │   ├── employeeController.js # Employee CRUD operations
│   ├── middleware/
│   │   ├── errorHandler.js       # Centralized error handling middleware
│   │   ├── upload.js             # Cloudinary image upload logic
│   ├── models/
│   │   ├── Employee.js           # Mongoose schema for Employee model
│   │   ├── User.js               # Mongoose schema for User model (admin)
│   ├── routes/
│   │   ├── auth.js               # Routes for authentication (login, register)
│   │   ├── employee.js           # Routes for employee management (CRUD)
│   ├── .env                      # Environment variables configuration file
│   ├── server.js                 # Backend server entry point
│   └── package.json              # Backend dependencies and scripts
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── CreateEmployee.jsx # Component for creating a new employee
    │   │   ├── Dashboard.jsx      # Admin dashboard with navigation options
    │   │   ├── EditEmployee.jsx   # Component for editing existing employee details
    │   │   ├── EmployeeList.jsx   # Component for listing employees with pagination and search
    │   │   ├── Login.jsx          # Component for admin login
    │   │   ├── Navbar.jsx         # Navbar component for navigation links
    │   ├── App.jsx               # Main application component with routes
    │   ├── index.js              # Entry point for React app
    ├── .env                      # Frontend environment variables configuration file
    ├── tailwind.config.js        # Tailwind CSS configuration for styling
    └── package.json              # Frontend dependencies and scripts

```

### API Endpoints

- **POST** `/api/login` - Admin login.
- **GET** `/api/employees` - Get all employees (with pagination and search).
- **POST** `/api/employees` - Create a new employee.
- **PUT** `/api/employees/:id` - Update an employee by ID.
- **DELETE** `/api/employees/:id` - delete an employee by ID.

### Validation

- **Email Validation**: Ensures a valid email format and checks for duplicate email addresses.
- **Mobile Number Validation**: Ensures only numbers are allowed.
- **File Upload Validation**: Supports only JPG and PNG formats for employee images.

### Deployment

To deploy this project, you will need to:

1. Deploy the frontend (e.g., Netlify, Vercel).
2. Deploy the backend (e.g., Render).
3. Set up environment variables on your hosting platforms.

## Conclusion

The Employee Management System is a complete solution for handling employee data with a user-friendly admin panel. This system provides advanced features like image uploads, data validation, search, and pagination, making it a versatile and scalable application.
