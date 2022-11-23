import jwt from "jsonwebtoken";

const requrieAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  //check json web token exit and verify
  if (token) {
    jwt.verify(token, "secret", (error, decodedToken) => {
      if (error) {
        console.log(error.message);
        res.send("Login error");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.send("Not logged in");
  }
};
export default requrieAuth;
