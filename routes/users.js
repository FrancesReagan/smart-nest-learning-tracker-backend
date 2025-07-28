// routes/users.js//
import express from "express";
import User from "../models/User.js";
import { signToken, authMiddleware } from "../utils/auth.js";

const router = express.Router();

// REGISTER NEW USER -- method: POST  endpoint: /api/users/register - Create a new user//
router.post("/register", async (req, res) => {

try {
  const user = await User.create(req.body);
  const token = signToken(user);
  res.status(201).json({
    token, 
    user: { _id: user._id, username: user.username, email: user.email } 
  });
} catch (error) {
  res.status(400).json(error);
}
});

// LOGIN USER - Method: POST  - endpoint: /api/users/login --authenticate a user and return a token//
router.post("/login", async (req,res) => {
try {

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json({ message: "Invalid password or email" });
  }

  const correctPw = await user.isCorrectPassword(req.body.password);

  if (!correctPw) {
  return res.status(401).json({ message: "Invalid password or email" });
}

const token = signToken(user);
res.json({ 
  token, 
  user: {_id: user._id, username: user.username, email: user.email }
});
} catch (error) {
  res.status(500).json ({ message: "Server error during login attempt" });
}
});

// ME route -- Method: GET -- endpoint: /api/users/me - endpoint for frontend//
router.get("/me", authMiddleware, async (req,res) => {
try {
  const user = await User.findById(req.user._id).select("-password");
  res.json(user);
} catch (error) {
  res.status(500).json(error);
}
});


export default router;










