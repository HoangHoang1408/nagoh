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
const handle11000 = (err) => {
  return new ErrorHandler(
    `The ${Object.keys(err.keyValue)[0]} has already exsist!`,
    400
  );
};
// globale error handler
const globalErrorHandler = (err, req, res, next) => {
  // reset error object
  err.statusCode = err.statusCode || 500;
  // err = JSON.parse(JSON.stringify(err));
  let error = { ...err };
  // handle specific error
  if (error.name === "CastError") error = handleCastError(error);
  if (error.name === "ValidationError") error = handleValidationError(error);
  if (error.code === 11000) error = handle11000(error);
  // response
  error.message = err.message;
  res.status(error.statusCode).json({
    success: false,
    error,
    message: error.message || err.message,
    stack: error.stacks,
  });
};
export default globalErrorHandler;
