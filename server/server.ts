import express from "express";
import cors from "cors";
import helmet from "helmet";
import router from "./routes/getCommitRoute";
import voicerouter from "./routes/voiceRoute";
import messageRouter from "./routes/messageRoute";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
    res.status(200).send("OK");
});

app.use('/', router);
app.use('/', voicerouter);
app.use('/', messageRouter);

app.listen(5000, '0.0.0.0', () => {
    console.log("Server running on port 5000");
});
