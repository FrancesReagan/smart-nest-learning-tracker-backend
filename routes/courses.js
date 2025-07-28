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

  // UPDATE a course - Method: PUT --endpoint: /api/courses/:id//
  router.put("/:id", (req, res)=> {
    try{

      const courseToUpdate = await Course.findById(req.params);

      if(!courseToUpdate) {
        return res.status(404).json({message: "Course note found"});
      }

      if (courseToUpdate.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Access is denied as this is not your course"});
      }

    }
  } )

}