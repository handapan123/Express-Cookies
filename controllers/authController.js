import User from "../models/User.js";

const handleError = (error) => {
  console.log(error.message, error.code);
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
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    handleError(err);
    res.status(400).send("User not created");
  }
};

export const login_post = (req, res) => {
  res.render("login");
};
