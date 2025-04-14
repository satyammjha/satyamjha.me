import express from "express";
import { fetchCommits } from "../controller/getCommits";

const router = express.Router();

router.get("/commits", fetchCommits );
export default router;