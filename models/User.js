import mongoose, { Schema } from "mongoose";
// import bcrypt from "bcrypt";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must use a valid email address"],
  },
  password: {
    type: String,
    minlength: 5,
    required: true
  }
});

// hash user password before saving//
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified ("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// method to see if the password is correct for the login//
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
