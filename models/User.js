import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "min length should be 6 chars"],
  },
});

//fire function after saving
userSchema.post("save", (doc, next) => {
  console.log("new user was created", doc);
  next();
});

//fire function before saving
userSchema.pre("save", async function (next) {
  console.log("user aboput to be created", this);
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("user", userSchema);
export default User;
