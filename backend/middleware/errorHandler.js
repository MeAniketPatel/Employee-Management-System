// middleware/errorHandler.js

// Error handler middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Set default status code if not already set

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error', // Respond with error message
    });
};

module.exports = errorHandler;
