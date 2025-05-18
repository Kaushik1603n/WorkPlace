import User from "../models/User.js";
import ClientProfile from "../models/ClientProfile.js";
import ProjectModule from "../models/Job.js";
import ProposalModule from "../models/Proposal.js";

export const getAllJobs = async (req, res) => {
  try {
    const search = req.query.search?.toLowerCase();

    const jobs = await ProjectModule.find({
      $or: [
        { title: { $regex: search, $options: "i" } }, // Case-insensitive search in title
        { description: { $regex: search, $options: "i" } }, // Search in description
      ],
    })
      .populate({
        path: "clientId",
      })
      .populate("proposals")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    // If no jobs found (empty collection)
    if (!jobs || jobs.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No jobs found",
        data: [],
        count: 0,
      });
    }

    // Successful response
    return res.status(200).json({
      success: true,
      message: "Jobs retrieved successfully",
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
export const getJobDetails = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    const jobDetails = await ProjectModule.findById(jobId)
      .populate({
        path: "clientId",
      })
      .lean();

    if (!jobDetails) {
      return res.status(404).json({ success: false, error: "Job not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Job details get successfully",
      jobDetails,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};
