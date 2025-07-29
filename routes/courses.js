// routes/courses.js//
// think I may be wanting to add more res.json (200, 201, 203) messages//
import express from "express";
import Course from "../models/Course.js";
import Session from "../models/Session.js";
import { authMiddleware } from "../utils/auth.js";

const router = express.Router();

// middleware//
router.use(authMiddleware);

// routes//
// CREATE a course --Method: POST --endpoint: /api/courses //
router.post("/", async (req, res)=> {
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

  // note---look at this one below--as not sure its correct method for results I want//
  // GET ALL COURSES of a User ---Method: GET --- endpoint: /api/courses //
 router.get("/", async(req, res)=> {

 try {
  const courses = await Course.find({ user: req.user._id })
   .populate("user", "username")
   .sort({ createdAt: -1});
   res.json(courses);

 } catch (error) {
  res.status(500).json(error);
 }
 });

//  GET a course by its ID -- method: GET -- endpoint /api/course/:id  //
router.get("/:id", async (req, res)=> {
  try {
    const course = await Course.findById(req.params.id)
    .populate("user", "username");

    if(!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if(course.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied -- not your course"});
    }

    res.json(course);

  } catch (error) {
    res.status(500).json(error);
    
  }
});


  // UPDATE a course - Method: PUT --endpoint: /api/courses/:id//
  router.put("/:id", async (req, res)=> {
    try{

      const courseToUpdate = await Course.findById(req.params.id);

      if(!courseToUpdate) {
        return res.status(404).json({message: "Course note found"});
      }

      if (courseToUpdate.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Access is denied as this is not your course"});
      }

      const course = await Course.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      ).populate("user","username");

      res.json(course);
    } catch (error) {
      res.status(500).json(error);
    }
  });
      

  // DELETE - Method: Delete --endpoint to test /api/courses/:id //
  router.delete("/:id", async (req, res)=> {
    try {
      
      const courseToDelete = await Course.findById(req.params.id);

      if(!courseToDelete) {
        return res.status(404).json({ message:"Course not found...can not delete unknown course"});
      }

      if (courseToDelete.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message : "Access denied -- you can not delete course that is not yours."});
      }

      // delete all sessions for this particular course//
      await Session.deleteMany({ course: req.params.id });

      // Delete the course//
      await Course.findByIdAndDelete(req.params.id);

      res.json({ message: "Success...course and all its sessions have been deleted." });
    } catch (error) {
      res.status(500).json(error);
    }
  });

  export default router;