// routes/sessions.js//
import express from "express";
import Session from "../models/Session.js";
import Course from "../models/Course.js";
import { authMiddleware } from "../utils/auth.js"; 

const router = express.Router();

// authmiddleware for all routes//
router.use(authMiddleware);

// POST create a session - Method -POST -- endpoint: /api/courses/:coursesId/sessions//
router.post("/courses/:courseId/sessions", async (req, res)=> {

  try {
    const { courseId } = req.params;

    // find course and then auth check if it does belong to logged in user//
    const course = await Course.findById(courseId);

    if(!course) {
      return res.status(404).json({ message: "Course could not be found" });
    }
    if(course.user.toString() !== req.user._id.toString()) {
     return res.status(403).json({ message : "Access Denied---you can not access this..." });
    }
    //  to create a session//
    const session = await Session.create({
      ...req.body,
      course: courseId,
    });
    res.status(201).json(session);
    } catch (error) {
      res.status(400).json(error);
    }
    });


// GET all sessions for a particular COURSE//
router.get("/courses/:courseId/sessions", async (req, res)=>{

  try {
    const { courseId } = req.params;
    // find and then authenicate user//
    const course = await Course.findById(courseId);
    if(!course) {
      return res.status(404).json({ message: "Course not found" });
    }
// authenication check --- see if the user owns the course//
if (course.user.toString() !== req.user._id.toString()) {
  return res.status(403).json({ message: "Access denied "});
}

// retrieve or get all sessions for this particular course//
const sessions = await Session.find({ course: courseId });
  res.json(sessions);

  } catch (error) {
    res.status(500).json(error);
  }
});

// GET a single session by id//
router.get("/sessions/:sessionId", async (req, res)=>{

  try {
    const { sessionId } = req.params;

    // find the session and populate the associated course//
    const session = await Session.findById(sessionId).populate("course");

    if(!session) {
      return res.status(404).json({ message : "session not found" });
    }

    // authorization or auth check --- see if user in question owns the parent course of the session in question.//
    if (session.course.user.toString() !== req.user._id.toString()){
      return res.status(403).json({ message: "Access is denied-- you don't own this session's course"});
    }
    res.json(session);

  } catch (error) {
    res.status(500).json(error);
    
  }
});

// PUT --method: put ---endpoint to test --- /api/sessions/:id  --- update session with authorization check//
router.put("/sessions/:sessionId", async (req, res)=>{
  try {
    const { sessionId } = req.params;

    // find the session and populate the course //
    const session = await Session.findById(sessionId).populate("course");
    if (!session) {
      return res.status(404).json({ message: "Session is not found...."});
    }
    
    // authorization check -- see if user owns the parent course of this session//
    if(session.course.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Sorry you don't have the rights to access..."})
    }

    // to update the session//
    const updatedSession = await Session.findByIdAndUpdate(sessionId, req.body, { new: true });
    res.json( updatedSession );
  } catch (error) {
    res.status(500).json(error);
    
  }
});

//? DELETE --method: delete ---endpoint: /api/sessions/:sessionId  -- a session by id?  --not sure about this--as putting the logic and method and function to delete sessions in courses/
router.delete("/sessions/:sessionId", async (req, res)=>{

  try {
    const { sessionId } = req.params;
    // find the session and populate the course//
    const session = await Session.findById(sessionId).populate("course");
    if(!session) {
      return res.status(404).json({ messaege: "Session not found in the course" });
    }
     await Session.findByIdAndDelete(sessionId);
     res.json({ messaege: "Session deleted successfully" });

  } catch (error) {
    res.status(500).json(error);
  }
});




