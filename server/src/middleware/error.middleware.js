import logger from "../utils/logger.js";

export const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    const isProduction = process.env.NODE_ENV === "production";

    logger.error(err.message, {
        method: req.method,
        url: req.originalUrl,
        statusCode
    });

    const message = isProduction ? (
        statusCode >= 500 ? "Internal Server Error" : err.message
    ) : err.message || "Something went wrong";

    res.status(statusCode).json({
        success: false,
        message,
        errors: err.errors || [],
        ...(isProduction ? {} : {stack: err.stack})
    });
};
