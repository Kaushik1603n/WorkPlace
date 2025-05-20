import express from "express";
import {
  hireRequest,
  getAllFreelancerProposals,getContractDetails,
} from "../controllers/proposalController.js";
import authenticate from "../middleware/authMiddleware.js";

const router = express.Router();

router.put("/hire-request/:proposalId", authenticate, hireRequest);

// freelacer
router.get("/get-freelacer-proposal", authenticate, getAllFreelancerProposals);
router.get("/get-contract-details/:id", authenticate, getContractDetails);

export default router;
