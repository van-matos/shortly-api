import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import userRouter from "./routes/userRouter.js";
import urlRouter from "./routes/urlRouter.js"

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use(urlRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));