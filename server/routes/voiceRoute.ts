import express from "express";
import sendVoiceNote, { uploadMiddleware } from "../controller/voiceController";
const router = express.Router();
router.post('/sendNote', uploadMiddleware, sendVoiceNote);
export default router;