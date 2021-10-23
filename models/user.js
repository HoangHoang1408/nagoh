import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";
//
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name!"],
    maxLength: [50, "Your name can't not exceed 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email!"],
    unique: [true, "This email has already been registered!"],
    validate: [(e) => validator.isEmail(e), "Your email is not valid!"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password!"],
    minlength: [8, "Your password must have at least 8 character"],
    select: false,
  },
  avatar: {
    avatarUrl: {
      type: String,
      required: true,
    },
    fullPath: {
      type: String,
      required: true,
    },
  },

  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// compare user password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.getPasswordResetToken = function () {
  const token = crypto.randomBytes(15).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
  return token;
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 11);
  next();
});
export default mongoose.models.User || mongoose.model("User", userSchema);
