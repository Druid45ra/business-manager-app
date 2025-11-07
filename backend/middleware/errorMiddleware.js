// /backend/middleware/errorMiddleware.js

const errorHandler = (err, req, res, next) => {
  // Determine the status code: if it's already set (e.g., 400 or 401), use it, otherwise default to 500 (Server Error)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode);

  // Send a structured JSON response
  res.json({
    message: err.message,
    // Only include the stack trace if the application is in development mode
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = {
  errorHandler,
};
