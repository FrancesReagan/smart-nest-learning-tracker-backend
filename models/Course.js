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
})