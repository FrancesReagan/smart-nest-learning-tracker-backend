import mongoose, { Schema } from "mongoose";

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
  // will add later for stretch option//
  // duration: {
  //   // in minutes//
  //   type: Number, 
  //   required: true,
  //   min: 1
  // },

  notes: {
    type: String,
    trim: true,
  },

  // will add later for stretch option//
  // progressPercent: {
  //   type: Number,
  //   min:0,
  //   max: 100,
  //   default: 0
  // },

  topicsLearned: [{
    type: String,
    trim: true
  }],

  createdAt: {
    type: Date,
    default: Date.now,
  }

});

const Session = mongoose.model("Session", sessionSchema);
export default Session;