import { Company } from "../models/Company.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!companyName) {
      return res
        .status(400)
        .json({ message: "Company name is required", success: false });
    }

    let company = await Company.findOne({ name: companyName });

    if (company) {
      return res.status(400).json({
        success: false,
        message:
          "Company already exists,you can't register forsame company again",
      });
    }

    company = await Company({
      name: companyName,
      userId: req.id,
    });

    await company.save();

    return res.status(201).json({
      success: true,
      message: "Company register Successfully",
      company,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getCompany = async (req, res) => {
  try {
    const { userId } = req.id;
    const companies = await Company.find(userId);
    if (!companies) {
      return res    
        .status(200)
        .json({ success: false, message: "Company Not Found" });
    }
    return res
      .status(400)
      .json({ success: true, message: "Successfully Fetched Data", companies });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getCompaniesById = async (req, res) => {
  try {
    const companyId = req.params.id;
    let company = await Company.findById(companyId);
    if (!company) {
      return res
        .status(400)
        .json({ success: false, message: "Company Not Found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Successfully Fetched Data", company });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const updateCompany = async (req, res) => {
  // try {
  //   const { name, description, website, location } = req.body;
  //   const file = req.file;
  //   //cloudinary
  //   const fileUri = getDataUri(file);
  //   const cloudResponse = await cloudinary.uploaderupload(fileUri.content);
  //   const logo = cloudResponse.secure_url;

  //   const updateData = { name, description, website, location, logo };
  //   const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
  //     new: true,
  //   });
  //   if (!company) {
  //     return res
  //       .status(200)
  //       .json({ success: false, message: "Error While Update Company Data" });
  //   }
  //   return res
  //     .status(200)
  //     .json({ success: true, message: "Company Info Update", company });
  // } catch (error) {
  //   return res
  //     .status(500)
  //     .json({ success: false, message: "Internal Server Error" });
  // }

  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    
  // Log the file to check if it's being received
  
    if (file) {
      const fileUri = getDataUri(file);
   
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
     
      const logo = cloudResponse.secure_url;
      const updateData = { name, description, website, location, logo };
      const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
        new: true,
      });
  
      if (!company) {
        return res
          .status(200)
          .json({ success: false, message: "Error While Update Company Data" });
      }
  
      return res
        .status(200)
        .json({ success: true, message: "Company Info Update", company });
    } else {
      // Handle case where no file is provided
      return res.status(400).json({ success: false, message: "No file provided" });
    }
  } catch (error) {
    console.error("Error during company update:", error); // Log the error for better debugging
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
  
};

export const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company Not Found" });
    }
    return res
      .status(201)
      .json({ success: true, message: "Company Successfully Removed" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
