import express from "express";
import cors from "cors";
import helmet from "helmet";
import { Request, Response } from "express";
import router from "./routes/getCommitRoute";
import voicerouter from "./routes/voiceRoute";
import messageRouter from "./routes/messageRoute"
const app = express();

app.use(helmet());

app.use(helmet.contentSecurityPolicy({
    directives: {
        upgradeInsecureRequests: [],
    },
}));

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
    res.status(200).send("Hello World");
});
app.use('/', router)
app.use('/', voicerouter);
app.use('/', messageRouter);
app.listen(5000, '0.0.0.0', () => {
    console.log("Server is running on port 5000");
});