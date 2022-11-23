import User from "../models/User.js";
import jwt from "jsonwebtoken";

const handleError = (error) => {
  console.log(error.message, error.code);
};

const MAX_AGE = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "secret", {
    expiresIn: MAX_AGE, // in seconds
  });
};

export const signup_get = (req, res) => {
  res.render("signup");
};
export const login_get = (req, res) => {
  res.render("login");
};

export const signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: MAX_AGE * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    console.log(err);
    handleError(err);
    res.status(400).send("User not created");
  }
};

export const login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: MAX_AGE * 1000 });
    res.status(200).json({ user: user._id });
  } catch (error) {
    console.log(error);
    res.status(400).json({});
  }
};
