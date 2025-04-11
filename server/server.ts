import express from "express";
import cors from "cors";
import { Request, Response } from "express";
import router from "./routes/getCommitRoute";
import voicerouter from "./routes/voiceRoute";
const app = express();


app.get('/get', (req: Request, res: Response) => {
    res.status(200).send("Hello World");
})
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use('/', router)
app.use('/', voicerouter);

app.listen(5000, () => {
    console.log("Server is running on port 5000");
})