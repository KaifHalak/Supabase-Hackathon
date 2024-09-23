import express from "express";
import { getUserStats } from "../controllers/user.js";

const router = express.Router();

router.get("/stats", getUserStats);

export default router;
