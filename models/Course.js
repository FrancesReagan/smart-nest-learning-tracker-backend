import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,

  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    enum: ["Programming", "Design", "Business", "Data Science", "Investing","Other"],
    default: "Other",
  },
  url: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ["On the horizon","Working it", "BAM did it"],
    default: "On the horizon",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref:"User",
    required: true,
  }
});