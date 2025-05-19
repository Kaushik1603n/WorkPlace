import Proposal from "../models/Proposal.js";

export const submitProposal = async (req, res) => {
  try {
    const {
      coverLetter,
      bidType,
      bidAmount,
      timeline,
      workSamples,
      milestones,
      agreeVideoCall,
      agreeNDA,
      jobId,
    } = req.body;

    console.log(req.body);

    const { userId } = req.user;
    if (!coverLetter || !bidType || !bidAmount) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const newProposal = await Proposal.create({
      freelancerId: userId,
      jobId,
      coverLetter: coverLetter,
      budgetType: bidType,
      bidAmount: bidAmount,
      estimatedTime: timeline,
      workSamples,
      milestones,
      agreeVideoCall,
      agreeNDA,
    });

    return res.status(201).json({
      success: true,
      message: "Proposal submitted successfully",
    });
  } catch (error) {
    console.error("Proposal submit error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
