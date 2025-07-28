import mongoose from "mongoose";

const sessionSchema = new Schema ({

  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now 
  },
  duration: {
    // in minutes//
    type: Number, 
    required: true,
    min: 1
  },
  
})