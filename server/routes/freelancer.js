import express from "express";
import {
  freelancerProfileEdit,
  getFreelancerDetails,
} from "../controllers/freelancerController.js";
import authenticate from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/edit-profile", authenticate, freelancerProfileEdit);
router.get("/get-profile", authenticate, getFreelancerDetails);
export default router;
