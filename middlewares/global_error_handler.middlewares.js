export const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error!!"

    const errorResponse = {
        success: false,
        message
    }

    if (err && typeof err === 'object' && err.statusCode === 400) {
        // HTTP 400 Bad Request
        errorResponse.errors = err // added new property (error) in errorResponse
    }

    res.status(statusCode).json(errorResponse)
}