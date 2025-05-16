import express from "express";
import { clientProfileEdit, getClientDetails } from "../controllers/clientControllers.js";
import authenticate from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/edit-profile",authenticate, clientProfileEdit);
router.get("/get-profile",authenticate, getClientDetails);
export default router;
