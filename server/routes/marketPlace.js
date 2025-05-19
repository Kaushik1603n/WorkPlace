import express from "express";
import authenticate from "../middleware/authMiddleware.js";
import { getAllJobs, getJobDetails } from "../controllers/marketPlaceController.js";
import { submitProposal,getAllProposal } from "../controllers/proposalController.js";
const router = express.Router();

router.get("/get-jobs",getAllJobs)
router.get("/job-details/:jobId",getJobDetails)

//freelancer
router.post("/new-proposal",authenticate, submitProposal);
router.get("/all-proposal/:jobId",authenticate, getAllProposal);



export default router;