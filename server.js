const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.cookie("newUser", false, { maxAge: 60 * 60 * 1000, httpOnly: true });
  res.send("You got the cookie");
});

app.get("/home", (req, res) => {
  console.log(req.cookies);
  res.json(req.cookies);
});

app.listen(3000, () => {
  console.log("server started on port 3000");
});
