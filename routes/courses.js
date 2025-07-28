// routes/courses.js//
import express from "express";
import Course from "../models/Course.js";
import Session from "../models/Sesion.js";
import { authMiddleware } from "../utils/auth.js";

const router = express.Router();

// middleware//
router.use(authMiddleware);

// routes//
// CREATE a course --Method: POST --endpoint: /api/courses //
router.post("/", (req, res)=> {
  try {
    const course = await Course.create({
      ...req.body,
      user:req.user._id,
    });

    const newCourse = await course.populate("user", "username");
    res.status(201).json(newCourse);
  } catch (error) {

    res.status(400).json(error);
  }
  });

  

}