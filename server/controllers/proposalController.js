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
export const getAllProposal = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    const allProposal = await Proposal.find({ jobId })
      .populate({
        path: "freelancerId",
        select: "fullName email"
      })
      .populate({
        path: "jobId",
         select: "title stack"
      })
      .lean();

    const formattedProposals = allProposal.map((proposal) => ({
      freelancer_id:proposal._id,
      freelancerName: proposal.freelancerId?.fullName,
      freelancerEmail: proposal.freelancerId?.email,
      jobTitle: proposal.jobId?.title,
      status: proposal.status,
      bidAmount: proposal.bidAmount,
      submittedAt: new Date(proposal.createdAt).toLocaleString(),
    }));

    console.log(formattedProposals);
    return res.status(201).json({
      success: true,
      message: "Proposal get successfully",
      allProposal: formattedProposals || [],
    });
  } catch (error) {
    console.error("Proposal submit error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
