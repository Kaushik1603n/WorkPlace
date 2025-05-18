import express from "express";
import authenticate from "../middleware/authMiddleware.js";
import { getAllJobs, getJobDetails } from "../controllers/marketPlaceController.js";
const router = express.Router();

router.get("/get-jobs",getAllJobs)
router.get("/job-details/:jobId",getJobDetails)


export default router;