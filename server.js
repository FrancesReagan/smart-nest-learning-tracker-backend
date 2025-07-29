
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import coursesRouter from "./routes/courses.js";
import usersRouter from "./routes/users.js";
import sessionsRouter from "./routes/sessions.js";
import db from "./config/connection.js";



// load env variables from .env//
dotenv.config();

// create an express app//
const app = express();
const PORT = process.env.PORT || 3000;


// middleware---
app.use(cors());
// used to parse JSON and URL encoded data//
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// route handlers--mounting//
app.use("/api/users", usersRouter);
app.use("/api/courses", coursesRouter);
// may change this to /api/sessions//
app.use("/api", sessionsRouter);



// // event based--on mount --on open --database collection handler-//
db.once("open", () => {
  console.log("Connected to MongoDB");
app.listen(PORT, ()=> {
  console.log(`Server is listening on localhost:${PORT}`);
});
});

db.on("error", (error) => {
  console.error("MongoDB connection error:", error.message);
  process.exit(1);
})

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});




// // promise based mongoDB connection approach---not using config folder/connection.js file--no db//
// mongoose.connect(process.env.MONGO_URI)
// .then(() => {
//   console.log("Connected to MongoDB");
//   app.listen(PORT, () => {
//     console.log(`Server is running on localhost:${PORT}`);
//   });
// })

