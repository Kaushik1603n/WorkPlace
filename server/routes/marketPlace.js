import express from "express";
import authenticate from "../middleware/authMiddleware.js";
import { getAllJobs } from "../controllers/marketPlaceController.js";
const router = express.Router();

router.get("/get-jobs",getAllJobs)


export default router;