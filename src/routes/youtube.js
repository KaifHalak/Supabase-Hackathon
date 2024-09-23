// routes/youtubeRoutes.js
import express from "express"
import { generateAnalysis } from "../controllers/youtube.js"

const router = express.Router()

router.post("/analysis/:videoId", generateAnalysis)

export default router
