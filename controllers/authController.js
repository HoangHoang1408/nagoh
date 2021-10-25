import User from "../models/user";
import ErrorHandler from "../utils/errorHandler";
import catchAsync from "../middlewares/catchAsync";
import { uploadToStorage, deleteFromStorage } from "../firebase/firebase";
import absoluteUrl from "next-absolute-url";
import sendEmail from "../utils/sendEmail";
import crypto from "crypto";
import { templateString } from "../data/emailTemplate/data";

// Register User => /api/auth/register
export const registerUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  let avatar = {
    fullPath: "avatarImages/defaultAvatar.png",
    avatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/bookit-9a9e7.appspot.com/o/avatarImages%2FdefaultAvatar.png?alt=media&token=ab112023-3b25-49e6-89c9-a59879a3689a",
  };
  if (req.file) avatar = await uploadToStorage("avatarImages", req.file);
  const user = await User.create({
    name,
    email,
    password,
    avatar,
  });
  res.status(200).json({
    success: true,
    message: "Account register successfully!",
    user: {
      name: user.name,
      email: user.email,
      id: user._id,
    },
  });
});

// api/me
export const getUserInfo = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    user,
  });
});

// api/me/updateInfo
export const updateProfile = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, req.body, {
    runValidators: true,
  });
  if (req.file) {
    const avatar = await uploadToStorage("avatarImages", req.file);
    await User.findByIdAndUpdate(
      req.user._id,
      {
        avatar,
      },
      {
        runValidators: true,
      }
    );
    await deleteFromStorage(req.body.avatarFullPath);
  }
  res.status(200).json({
    success: true,
  });
});

// api/me/updatePassword
export const updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id).select("+password");
  const match = await user.comparePassword(currentPassword);
  if (!match)
    return next(new ErrorHandler("Current password is not correct!", 400));
  user.password = newPassword;
  await user.save({});
  res.status(200).json({
    success: true,
  });
});

// reset password api/password/reset
export const resetPassword = catchAsync(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.body.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user)
    return next(
      new ErrorHandler(
        "Password reset token is invalid or has been expired",
        400
      )
    );
  const { newPassword } = req.body;
  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  res.status(200).json({
    success: true,
  });
});

// forgot password api/password/forgot

export const forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return next(new ErrorHandler("No user found with this email!", 400));

  // get reset token
  const resetToken = user.getPasswordResetToken();
  await user.save();

  // get url
  const { origin } = absoluteUrl(req);
  const resetUrl = `${origin}/password/reset/${resetToken}`;
  const message = `Your password reset URL: \n\n ${resetUrl} \n\n If you have not requested this email, please ignore it!`;
  try {
    await sendEmail({
      email: user.email,
      subject: "BookIT reset password link",
      message,
      html: templateString.replace("{{RESETPASSWORDLINK}}", resetUrl),
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email}`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    return next(
      new ErrorHandler(
        "Cant send email right now, please Check your email again or Try again later!",
        400
      )
    );
  }
});
