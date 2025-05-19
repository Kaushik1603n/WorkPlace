import express from "express";
import { submitProposal } from "../controllers/proposalController.js";

const router = express.Router();

router.post("/new-proposal", submitProposal);

export default router;
