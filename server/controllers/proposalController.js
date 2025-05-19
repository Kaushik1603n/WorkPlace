import FreelancerProfile from "../models/FreelancerProfile.js";
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
        select: "fullName email",
      })
      .populate({
        path: "jobId",
        select: "title stack",
      })
      .lean();

    const formattedProposals = allProposal.map((proposal) => ({
      proposal_id: proposal._id,
      freelancerName: proposal.freelancerId?.fullName,
      freelancerEmail: proposal.freelancerId?.email,
      jobTitle: proposal.jobId?.title,
      status: proposal.status,
      bidAmount: proposal.bidAmount,
      submittedAt: new Date(proposal.createdAt).toLocaleString(),
    }));

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
export const getProposalDetails = async (req, res) => {
  try {
    const proposalId = req.params.proposalId;
    const { userId } = req.user;

    if (!proposalId) {
      return res
        .status(400)
        .json({ success: false, message: "Proposal ID is required" });
    }

    const proposalDetails = await Proposal.findById(proposalId)
      .populate({
        path: "freelancerId",
        select: "-password -refreshToken",
      })
      .populate({
        path: "jobId",
      })
      .lean();

    if (!proposalDetails) {
      return res
        .status(404)
        .json({ success: false, message: "Proposal not found" });
    }

    if (proposalDetails?.jobId?.clientId?.toString() !== userId) {
      return res
        .status(403)
        .json({ success: false, message: "You Can not access this page" });
    }

    const freelancerDetails= await FreelancerProfile.findOne({userId:proposalDetails.freelancerId._id})
    
    
    const proposal = {
      proposal_id: proposalDetails._id,
      status: proposalDetails.status,
      timeline: proposalDetails.estimatedTime,
      bidAmount: proposalDetails.bidAmount,
      bidType: proposalDetails.budgetType,
      coverLetter: proposalDetails.coverLetter,
      milestones: proposalDetails.milestones || [],
      freelancerName: proposalDetails.freelancerId?.fullName,
      freelancerEmail: proposalDetails.freelancerId?.email,
      jobTitle: proposalDetails.jobId?.title,
      submittedAt: new Date(proposalDetails.createdAt).toLocaleString(),
      profile: freelancerDetails?.profilePic || "",
      skills: freelancerDetails?.skills || [],
    };

    return res.status(200).json({
      success: true,
      message: "Proposal details get successfully",
      data: proposal,
    });
  } catch (error) {
    console.error("Proposal submit error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
