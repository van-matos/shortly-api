import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import usersRouter from "./routes/usersRouter.js" 

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(usersRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));