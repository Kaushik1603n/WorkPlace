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
  console.log(req.body);

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
    const newJob = await ProjectModule.findOneAndUpdate(
      { clientId: userId },
      {
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
        clientId: userId, // Ensure clientId is set
      },
      {
        new: true,
        upsert: true,
        runValidators: true, // Ensure validations are run
      }
    );
    console.log("success");

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
