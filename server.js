import express from "express";
// import cors from "cors";
import dotenv from "dotenv";
import coursesRouter from "./routes/courses.js";
import usersRouter from "./routes/users.js";
import sessionsRouter from "./routes/sessions.js";

// app.use(cors());

// load env variables from .env//
dotenv.config();

// create an express app//
const app = express();
const PORT = process.env.PORT || 3000;

// middleware---used to parse JSON and URL encoded data//
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// route handlers--mounting//
app.use("/api/users", usersRouter);
app.use("/api/courses", coursesRouter);
// may change this to /api/sessions//
app.use("/api", sessionsRouter);


app.listen(PORT,()=> console.log(`Server is listening on localhost:${PORT}`));