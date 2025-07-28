// routes/sessions.js//
import express from "express";
import Session from "../models/Session.js";
import Course from "../models/Course.js";
import { authMiddleware } from "../utils/auth"; 

const router = express.Router();

// authmiddleware for all routes//
router.use(authMiddleware);

// POST create a session - Method -POST -- endpoint: /api/courses/:coursesId/sessions

// GET all sessions for a particular COURSE

// GET a single session by id//

// PUT --update session with authorization//

//? DELETE --a session by id?  --not sure about this--as putting the logic and method and function to delete sessions in courses/

// DELETE -- a course by id

