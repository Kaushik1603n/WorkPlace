import FreelancerProfile from "../models/FreelancerProfile.js";
import Proposal from "../models/Proposal.js";
import Contract from "../models/Contract.js";
import Job from "../models/Job.js";

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

    const freelancerDetails = await FreelancerProfile.findOne({
      userId: proposalDetails.freelancerId._id,
    });

    const proposal = {
      proposal_id: proposalDetails._id,
      status: proposalDetails.status,
      timeline: proposalDetails.estimatedTime,
      bidAmount: proposalDetails.bidAmount,
      bidType: proposalDetails.budgetType,
      coverLetter: proposalDetails.coverLetter,
      status: proposalDetails?.status,
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

export const hireRequest = async (req, res) => {
  try {
    const { proposalId } = req.params;
    const clientId = req.user.userId;

    // const proposal = await Proposal.findById(proposalId)
    //   .populate("jobId", "clientId title budgetType")
    //   .populate("freelancerId", "name email");

    const getProposal = await Proposal.findById(proposalId)
      .populate({
        path: "freelancerId",
        select: "-password -refreshToken",
      })
      .populate({
        path: "jobId",
      });

    if (!getProposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    if (getProposal.jobId.clientId.toString() !== clientId.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to hire for this job" });
    }

    //check again
    if (getProposal.status !== "submitted" && getProposal.status !== "interviewing") {
      return res.status(400).json({
        message: "Proposal cannot be hired in its current state",
      });
    }

    const contract = await Contract.create({
      jobId: getProposal.jobId._id,
      proposalId: getProposal._id,
      clientId: clientId,
      freelancerId: getProposal.freelancerId._id,
      terms: generateDefaultContractTerms(getProposal),
      title: getProposal.jobId.title,
      startDate: new Date(),
      totalAmount: getProposal.bidAmount,
      paymentSchedule:
        getProposal.milestones.length > 0 ? "milestone" : "completion",
    });

    getProposal.status = "accepted";
    getProposal.contractId = contract._id;
    await getProposal.save();

    // const job = await Job.findByIdAndUpdate(
    //   proposal.jobId._id,
    //   {
    //     status: "in-progress",
    //     hiredFreelancer: proposal.freelancerId._id,
    //     contractId: contract._id,
    //   },
    //   { new: true }
    // );


    const freelancerDetails = await FreelancerProfile.findOne({
      userId: getProposal.freelancerId._id,
    });

     const proposal = {
      proposal_id: getProposal._id,
      status: getProposal.status,
      timeline: getProposal.estimatedTime,
      bidAmount: getProposal.bidAmount,
      bidType: getProposal.budgetType,
      coverLetter: getProposal.coverLetter,
      status: getProposal?.status,
      milestones: getProposal.milestones || [],
      freelancerName: getProposal.freelancerId?.fullName,
      freelancerEmail: getProposal.freelancerId?.email,
      jobTitle: getProposal.jobId?.title,
      submittedAt: new Date(getProposal.createdAt).toLocaleString(),
      profile: freelancerDetails?.profilePic || "",
      skills: freelancerDetails?.skills || [],
    };


    res.status(200).json({
      message: "Freelancer hired successfully",
      data: {
        proposal,
        contract,
      },
    });
  } catch (error) {
    console.error("Error hiring freelancer:", error);
    res.status(500).json({
      message: "Server error during hiring process",
      error: error.message,
    });
  }
};

const generateDefaultContractTerms = (proposal) => {
  const terms = [
    `The freelancer will complete the work as described in proposal ${proposal._id}`,
    `The total contract amount is ${proposal.bidAmount} ${
      proposal.budgetType === "hourly" ? "per hour" : ""
    }`,
    "All work will be completed to professional standards",
    "Any disputes will be resolved through the platform mediation process",
  ];

  if (proposal.milestones.length > 0) {
    terms.push("Payment will be released upon completion of each milestone:");
    proposal.milestones.forEach((milestone, index) => {
      terms.push(`${index + 1}. ${milestone.title} - ${milestone.amount}`);
    });
  }

  return terms.join("\n\n");
};

export const getAllFreelancerProposals = async (req, res) => {
  const { userId } = req.user;

  try {
    const proposals = await Proposal.find({ freelancerId: userId })
      .populate({
        path: "jobId",
        select: "title budgetType budget status",
      })
      .sort({ createdAt: -1 });

    if (!proposals || proposals.length === 0) {
      return res.status(404).json({ message: "No proposals found" });
    }

    res.status(200).json({
      message: "Proposals fetched successfully",
      count: proposals.length,
      data: proposals,
    });
  } catch (error) {
    console.error("Error fetching freelancer proposals:", error);
    res.status(500).json({
      message: "Server error while fetching proposals",
      error: error.message,
    });
  }
};
export const getContractDetails = async (req, res) => {
  const { userId } = req.user;
  const contractId = req.params.id;
  try {
    const contractDetails = await Contract.findById(contractId);

    if (contractDetails.freelancerId.toString() !== userId.toString()) {
      return res.status(404).json({ message: "No access" });
    }

    res.status(200).json({
      message: "Constract fetched successfully",
      data: contractDetails,
    });
  } catch (error) {
    console.error("Error contract freelancer :", error);
    res.status(500).json({
      message: "Server error while fetching contract",
      error: error.message,
    });
  }
};
