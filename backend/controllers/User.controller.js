import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

//register
export const register = async (req, res) => {
  const { fullname, email, phoneNumber, password, role, answers } = req.body;
  try {
    if (!fullname || !email || !password || !role || !phoneNumber || !answers) {
      return res
        .status(400)
        .json({ success: false, message: "Fields can't be empty" });
    }
    if (!email.includes("@")) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter valid email address" });
    }
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        success: false,
        message: "User Already Exists,Please Kindly Login",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User({
      fullname,
      email,
      phoneNumber,
      password: hashPassword,
      role,
      answers,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });
    await newUser.save();
    return res
      .status(201)
      .send({ success: true, message: "User Successfully Created", newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, mesage: "Internal Server Error" });
  }
};

//login
export const login = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Fields Can't be empty" });
    }
    if (!email.includes("@")) {
      return res
        .status(404)
        .json({ success: false, message: "Enter Valid Email Address" });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }
    const doMatch = await bcrypt.compare(password, user.password);
    if (!doMatch) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }
    if (role !== user.role) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }
    const tokenData = {
      userId: user.id,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        success: true,
        token,
        user,
        message: `Welcome Back ${user.fullname}`,
      }); //1d
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
};

//logout
export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ success: true, message: "Successfully Logout" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

//update profile

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    // Check for empty fields
    if (!fullname || !email || !phoneNumber || !bio || !skills) {
      return res
        .status(400)
        .json({ success: false, message: "Fields can't be empty" });
    }

    const userId = req.id; // Assuming the user ID is available through middleware

    // Find the current user
    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User Not Found" });
    }

    // Check if the email is used by another user
    const existingUserWithEmail = await User.findOne({ email });
    if (
      existingUserWithEmail &&
      existingUserWithEmail._id.toString() !== userId
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Email already in use by another account",
        });
    }

    // Cloudinary file upload (if file is provided)
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }

    // Update user fields
    user.fullname = fullname;
    user.email = email; // Safe to update since it's the current user's email
    user.phoneNumber = phoneNumber;
    user.profile.bio = bio;
    user.profile.skills = skills; // Assume skills is an array

    // Save updated user
    await user.save();

    // Respond with updated user data
    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        profile: user.profile,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error); // Log error for debugging
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// export const updateProfile = async (req, res) => {
//   try {
//     const { fullname, email, phoneNumber, bio, skills } = req.body;
//     const file = req.file;
//     //cloudinary
//     const fileUri = getDataUri(file);
//     const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

//     if (!fullname || !email || !phoneNumber || !bio || !skills) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Fields Can't be empty" });
//     }

//     // No need to split skills as it's already an array
//     const skillsArray = skills;
//     const userId = req.id; // middleware authentication
//     let user = await User.findById(userId);
//     if (!user) {
//       return res
//         .status(401)
//         .send({ success: false, message: "User Not Found" });
//     }

//     // Check if the email belongs to a different user
//     const existingUserWithEmail = await User.findOne({ email });
//     if (
//       existingUserWithEmail &&
//       existingUserWithEmail._id.toString() !== userId
//     ) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Email already exists" });
//     }

//     user.fullname = fullname;
//     user.email = email;
//     user.phoneNumber = phoneNumber;
//     user.profile.bio = bio;
//     user.profile.skills = skillsArray;

//     // If there is a file, handle Cloudinary stuff here

//     if (cloudResponse) {
//       user.profile.resume = cloudResponse.secure_url;
//       user.profile.resumeOriginalName = file.originalname;
//     }

//     await user.save();

//     user = {
//       _id: user._id,
//       fullname: user.fullname,
//       email: user.email,
//       phoneNumber: user.phoneNumber,
//       profile: user.profile,
//     };

//     return res
//       .status(200)
//       .json({ success: true, message: "Profile Updated Successfully", user });
//   } catch (error) {
//     console.error("Update profile error:", error); // Log the error for debugging
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal Server Error" });
//   }
// };

export const updatePicProfile = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    // Get the file data URI
    const fileUri = await getDataUri(file);

    // Upload file to Cloudinary (make sure to await the upload)
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
      folder: "user_profiles", // Optional: create a folder in Cloudinary
      resource_type: "image", // Ensure that you're uploading an image
    });

    // Fetch the user from the database
    const userId = req.id;
    let user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    // Update user's profile picture with Cloudinary's secure URL
    user.profile.profilePhoto = cloudResponse.secure_url;

    // Save updated user profile to the database
    await user.save();

    // Return the updated user profile
    return res.status(200).json({
      success: true,
      message: "Profile Picture Updated Successfully",
      user: { profile: user.profile },
    });
  } catch (error) {
    console.error("Error updating profile picture:", error); // Log the error
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

//Profile
export const profile = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found" });
    }
    return res
      .status(200)
      .send({ success: true, message: "Successfuly Fetched Data", user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

//Forgot-Password

export const forgotPassword = async (req, res) => {
  try {
    const { answers, email, password, npassword } = req.body;

    if (!email || !password || !answers || !npassword) {
      return res
        .status(400)
        .json({ success: false, message: "Fields can't be empty" });
    }
    if (!email.includes("@")) {
      return res
        .status(400)
        .json({ success: false, message: "Please Enter valid email address" });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User Not Found",
      });
    }
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }
    if (user.answers !== answers) {
      return res
        .status(401)
        .json({ success: false, message: "Answers do not match" });
    }
    const nupassword = await bcrypt.hash(npassword, 10);
    user.password = nupassword;
    await user.save();
    return res
      .status(201)
      .json({ success: true, message: "Successfully Changed Password", user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
