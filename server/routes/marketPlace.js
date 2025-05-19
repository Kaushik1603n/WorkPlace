import express from "express";
import authenticate from "../middleware/authMiddleware.js";
import { getAllJobs, getJobDetails } from "../controllers/marketPlaceController.js";
import { submitProposal,getAllProposal,getProposalDetails } from "../controllers/proposalController.js";
const router = express.Router();

router.get("/get-jobs",getAllJobs)
router.get("/job-details/:jobId",getJobDetails)

//freelancer
router.post("/new-proposal",authenticate, submitProposal);

// client 
router.get("/all-proposal/:jobId",authenticate, getAllProposal);
router.get("/get-proposal-details/:proposalId",authenticate, getProposalDetails);



export default router;