import { Job } from "../models/Job.js";

//student

  export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experienceLevel,
      position,
      companyId,
    } = req.body;

    const userId = req.id;

    // Check if all required fields are provided
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experienceLevel ||
      !position ||
      !companyId
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const job = new Job({
      title,
      description,
      requirements: requirements.split(","),
      salary: parseFloat(salary), // Ensure salary is a number
      experienceLevel,
      location,
      jobType,
      position: parseInt(position, 10), // Ensure position is an integer
      company: companyId,
      created_by: userId,
    });
    await job.save();
    return res
      .status(201)
      .json({ success: true, message: "Job successfully posted", job });
  } catch (error) {
    console.error("Error while creating job:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};




//student
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(400).json({ success: false, mesage: "Job not Found" });
    }

    return res
      .status(200)
      .json({ success: true, jobs, message: "Successfully Fetched All Jobs" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

//student
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId)
      .populate("company")
      .populate({
        path: "applications",
        populate: { path: "applicant", model: "User" },
      })
      .sort({ createdAt: -1 });

    if (!job) {
      return res.status(400).json({ success: false, mesage: "Job not Found" });
    }
    return res
      .status(200)
      .json({ success: true, job, message: "Successfully Fetched All Jobs" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

//recruiter
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId })
      .populate({ path: "company" })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Successfully fetched data", jobs });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};


export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experienceLevel,
      position,
    } = req.body;

    // Ensure all fields are provided
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experienceLevel ||
      !position
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Fields can't be empty" });
    }

    // Update job
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      {
        title,
        description,
        requirements: Array.isArray(requirements)
          ? requirements
          : requirements.split(",").map((req) => req.trim()), // Ensure it's an array
        salary: Number(salary),
        location,
        jobType,
        experienceLevel,
        position,
      },
      { new: true } // Return updated document
    );

    if (!updatedJob) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Job successfully updated",
      job: updatedJob,
    });
  } catch (error) {
    console.error("Error updating job:", error); // Log the error for debugging
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

