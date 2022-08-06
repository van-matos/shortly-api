import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import usersRouter from "./routes/usersRouter.js";
import urlsRouter from "./routes/urlsRouter.js"

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(usersRouter);
app.use(urlsRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));