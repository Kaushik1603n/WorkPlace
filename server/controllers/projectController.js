import User from "../models/User.js";
import ClientProfile from "../models/ClientProfile.js";
import ProjectModule from "../models/Job.js";
export const createNewProject = async (req, res) => {
  const {
    jobTitle,
    description,
    requiredFeatures,
    stack,
    skills,
    time,
    budgetType,
    budget,
    experienceLevel,
    reference,
  } = req.body;

  const { userId } = req.user;

  try {
    // Validate required fields
    if (
      !jobTitle ||
      !description ||
      !requiredFeatures ||
      !stack ||
      !skills ||
      !time ||
      !budgetType ||
      !budget ||
      !experienceLevel ||
      !reference
    ) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }

    // Check if user exists
    const client = await User.findById(userId);
    if (!client) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // Create or update project
    const newJob = await ProjectModule.create({
      clientId: userId,
      title: jobTitle,
      description: description,
      requiredFeatures: requiredFeatures,
      stack: stack,
      skills: skills,
      time: time,
      budgetType: budgetType,
      budget: budget,
      experienceLevel: experienceLevel,
      reference: reference,
    });

    return res.status(201).json({
      success: true,
      message: "Project created/updated successfully",
      data: newJob,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const getClientProject = async (req, res) => {
  const { userId } = req.user;

  try {
    if (!userId) {
      return res.status(400).json({
        success: false,
        error: "User not Access",
      });
    }

    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    const projects = await ProjectModule.find({ clientId: userId })
      .sort({ createdAt: -1 })
      .lean();

    // if (!projects || projects.length === 0) {
    //   return res.status(200).json({
    //     success: true,
    //     message: "No projects found for this client",
    //     data: [],
    //   });
    // }
    //   const userWithProfile = await ProjectModule.findOne({ clientId: userId })
    // .populate("clientId")
    // .exec();

    // const userWithJobs = await User.findById(userId)
    //   .populate("jobs")
    //   .populate("profile")
    //   .exec();

    // console.log(userWithJobs);

    return res.status(200).json({
      success: true,
      message: "Projects retrieved successfully",
      count: projects.length,
      projects: projects || [],
    });
  } catch (error) {
    console.error("Error fetching client projects:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
