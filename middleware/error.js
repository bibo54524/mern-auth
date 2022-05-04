const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    //console.log("Error:" + err);

    if (err.code === 11000) {
        const message = 'Duplicate Field Value Enter';
        error = new ErrorResponse(message, 400);
    }
    if (err.name === 'validationError') {
        const message = Object.values(err.errors).map((val) => val.message);
        error = new ErrorResponse(message, 400);
    }
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error',
    });
};

module.exports = errorHandler;
