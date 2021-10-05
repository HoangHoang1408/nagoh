import ErrorHandler from "../utils/errorHandler";

// hanlder specific error
const handleCastError = (err) => {
  const message = `Resource not found. Invalid: ${err.path} `;
  return new ErrorHandler(message, 400);
};
const handleValidationError = (err) => {
  const message = Object.values(err.errors)
    .map((e) => e.message)
    .join(", ");
  return new ErrorHandler(message, 400);
};

// globale error handler
const globalErrorHandler = (err, req, res, next) => {
  // reset error object
  err.statusCode = err.statusCode || 500;
  err = JSON.parse(JSON.stringify(err));
  let error = { ...err };

  // handle specific error
  if (error.name === "CastError") error = handleCastError(error);
  if (error.name === "ValidationError") error = handleValidationError(error);

  // response
  res.status(error.statusCode).json({
    success: false,
    error: err,
    message: error.message,
    stack: error.stacks,
  });
};
export default globalErrorHandler;
