// routes/users.js//
import express from "express";
import User from "../models/User.js";
import { signToken, authMiddleware } from "../utils/auth.js";