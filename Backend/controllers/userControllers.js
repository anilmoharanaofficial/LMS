import User from "../models/userModels.js";
import emailValidate from "email-validator";
import AppError from "../utils/errorUtil.js";
import cloudinary from "cloudinary";
import fs from "fs";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
import bcrypt from "bcrypt";

//CookieOption
const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000, //7 Days
  httpOnly: true,
  secure: true,
};

//////////////////////////
////REGISTER
const register = async (req, res, next) => {
  const { fullName, email, password } = req.body;

  //Validator
  if (!fullName || !email || !password) {
    return next(new AppError("All Fields Are Required", 400));
  }

  //Email Validator
  const validEmail = emailValidate.validate(email);
  if (!validEmail) {
    return next(new AppError("Please enter a valid email address", 400));
  }

  //User Validator
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    return next(new AppError("User already exists", 400));
  }

  try {
    //Create User
    const user = await User.create({
      fullName,
      email,
      password,
      avatar: {
        public_id: email,
        secure_url:
          "https://res.cloudinary.com/drx2gahpl/image/upload/v1702365794/Avtar/noutnhcawlo04hdnb6ga.png",
      },
    });

    if (!user) {
      return next(new AppError("User registration failed", 400));
    }

    //Upload Avatar File

    if (req.file) {
      console.log(req.file);
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "LMS",
          width: 250,
          height: 250,
          gravity: "faces",
          crop: "fill",
        });

        if (result) {
          user.avatar.public_id = result.public_id;
          user.avatar.secure_url = result.secure_url;

          // Remove file from local server
          if (fs.existsSync(`uploads/${req.file.filename}`)) {
            fs.rmSync(`uploads/${req.file.filename}`);
          }
        } else {
          throw new AppError("File upload to Cloudinary failed", 400);
        }
      } catch (error) {
        // return next(new AppError("File not uploaded, please try again", 400));
        throw new AppError(error || "File not uploaded, please try again", 400);
      }
    }

    //Save the user
    await user.save();
    user.password = undefined;

    //Autometic login after registration
    const token = await User.generateJWTToken();

    //Set Cookies
    res.cookie("token", token, cookieOptions);

    //Success Message
    return res.status(200).json({
      success: "Ture",
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error, `Failed..........`);
  }
};

/////////////////////
/////////LOGIN
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //Validation
    if (!email || !password) {
      return next(new AppError("All fields are required", 400));
    }

    //User Validation
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new AppError("Email and password dose not match", 400));
    }

    const token = await User.generateJWTToken();
    user.password = undefined;

    res.cookie("token", token, cookieOptions);

    //Success Message
    return res.status(200).json({
      success: "Ture",
      message: "User loggedin successfully",
      user,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

///////////////////
///////LOGOUT
const logout = (req, res, next) => {
  res.cookie("token", null, {
    secure: true,
    maxAge: 0,
    httpOnly: true,
  });

  //Success Message
  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};

/////////////////
//////PROFILE
const getProfile = (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = User.findById(userId);

    //Success Message
    res.status(200).json({
      success: true,
      message: "User Details",
      user,
    });
  } catch (error) {
    return next(new AppError("Failed to fetch profile details"));
  }
};

///////////////////////
///FORGOT PASSWORD
const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  //Validator
  if (!email) {
    return next(new AppError("Email is requried", 400));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("Email not registered", 400));
  }

  const resetToken = await User.generatePasswordResetToken();
  await user.save();

  const resetPasswordURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  console.log(resetPasswordURL);
  const subject = "Reset Password";
  const message = `You can reset your password by clicking by <a href=${resetPasswordURL}`;
  //Send Email
  try {
    await sendEmail(email, subject, message);

    //Success Message
    res.status(200).json({
      success: true,
      message: `Reset password token has benn sent to ${email} successfuly`,
    });
  } catch (error) {
    user.forgotPasswordExpiry = undefined;
    user.forgotPasswordToken = undefined;

    await user.save();
    return next(new AppError(error.message, 400));
  }
};

///////////////////////
///RESET PASSWORD
const resetPassword = async (req, res, next) => {
  const { resetToken } = req.params;
  const { password } = req.body;

  const forgotPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //Validator
  const user = await User.findOne({
    forgotPasswordToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new AppError("Token is invalid or exoired, please try again", 400)
    );
  }

  user.password = password;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;

  user.save();

  //Success Message
  res.status(200).json({
    success: true,
    message: "You have reset your password successfully",
  });
};

////////////////////////
///CHANGE PASSWORD
const changePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const { id } = req.user;

  //Validator
  if (!oldPassword || !newPassword) {
    return next(new AppError("All Fields Are Required", 400));
  }

  const user = await User.findById(id).select("+password");

  if (!user) {
    return next(new AppError("User Dose Not Exists", 400));
  }

  const isPasswordValid = await user.comparePassword(oldPassword);
  if (!isPasswordValid) {
    return next(new AppError("Invalid Old Password", 400));
  }

  user.password = newPassword;
  await user.save();

  user.password = undefined;

  //Success Message
  res.status(200).json({
    success: true,
    message: "Password Chnaged Successfully",
  });
};

/////////////////////////
////UPDATE USER
const updateUser = async (req, res) => {
  const { fullName } = req.body;
  const { id } = req.user.id;

  //Validator
  const user = await User.findById(id);

  if (!user) {
    return next(new AppError("User Dose Not Exists", 400));
  }

  if (req.fullName) {
    user.fullName = fullName;
  }

  if (req.file) {
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "LMS",
        width: 250,
        height: 250,
        gravity: "faces",
        crop: "fill",
      });

      if (result) {
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;

        // Remove file from local server
        if (fs.existsSync(`uploads/${req.file.filename}`)) {
          fs.rmSync(`uploads/${req.file.filename}`);
        }
      } else {
        throw new AppError("File upload to Cloudinary failed", 400);
      }
    } catch (error) {
      // return next(new AppError("File not uploaded, please try again", 400));
      throw new AppError(error || "File not uploaded, please try again", 400);
    }
  }

  await user.save();

  //Success Message
  res.status(200).json({
    success: true,
    message: "User Details Updated Successfully",
  });
};

//Exproting..............
export {
  register,
  login,
  logout,
  getProfile,
  forgotPassword,
  resetPassword,
  changePassword,
  updateUser,
};
