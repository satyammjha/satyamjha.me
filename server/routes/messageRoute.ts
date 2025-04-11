import express from "express";
import { sendMessage } from "../controller/messageController";

const router = express.Router();

router.post('/sendMsg', sendMessage);

export default router;