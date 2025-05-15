import express from "express";
import { clientProfileEdit } from "../controllers/clientControllers.js";
const router = express.Router();

router.post("/edit-profile", clientProfileEdit);
export default router;
