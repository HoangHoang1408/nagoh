import { getSession } from "next-auth/client";
import catchAsync from "./catchAsync";
import ErrorHandler from "../utils/errorHandler";
export const isAuthenticated = catchAsync(async (req, res, next) => {
  const session = await getSession({ req });
  if (!session)
    return next(new ErrorHandler("Login first to access this resource!", 400));
  req.user = session.user;
  next();
});
export const limitRoles =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new ErrorHandler("You are not allowed to access this resource!", 403)
      );
    next();
  };
