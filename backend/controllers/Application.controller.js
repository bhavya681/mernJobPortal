import { Application } from "../models/Application.js";
import { Job } from "../models/Job.js";

export const applyJobs = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res
        .status(400)
        .json({ success: false, message: "Mentioning job is required" });
    }

    //check if already apply
    const jobStatus = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (jobStatus) {
      return res
        .status(400)
        .json({ success: false, message: "Already Applied to this job" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job Not Found" });
    }

    const newApplication = await Application({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newApplication._id);

    await job.save();
    await newApplication.save();
    return res
      .status(201)
      .json({ success: true, message: "Job Successfully Applied" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Sever Error" });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({ path: "job", options: { sort: { createdAt: -1 } } })
      .populate({ path: "company", options: { sort: { createdAt: -1 } } });
    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Application Not Found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Application found", application });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Sever Error" });
  }
};

//admin dekhe ga check karega kitne user applied or interested for job applied

export const getappliedApplicant = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId)
      .populate({
        path: "applications",
        populate:{ path: "applicant" },
        options: { sort: { createdAt: -1 } },
      })
      

    if (!job) {
      return res.status(401).json({ success: false, message: "Job Not Found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Successfully Fetched Data", job });
  } catch (error) {console.log(error)
    return res
      .status(500)
      .json({ success: false, message: "Internal Sever Error" });
  }
};


export const updateStatus = async (req, res) => {
    try {
      const { status } = req.body;
      const applicationId = req.params.id;
  
      if (!status) {
        return res
          .status(400)
          .json({ success: false, message: "Status is required" });
      }
  
      // Find the application by ID
      const application = await Application.findById(applicationId);
      if (!application) {
        return res
          .status(404)
          .json({ success: false, message: "Application Not Found" });
      }
  
      // Ensure the status is valid
      const validStatuses = ["pending", "accepted", "rejected"];
      if (!validStatuses.includes(status.toLowerCase())) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid status value" });
      }
  
      // Update status
      application.status = status.toLowerCase();
      await application.save();
  
      return res
        .status(200)
        .json({ success: true, message: "Status Updated Successfully" });
    } catch (error) {
      console.error("Error updating status:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };
  
  