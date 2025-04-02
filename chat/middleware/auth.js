const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.SECRET;
const VerifyToken = (request, response, next) => {
  const token = request.header("Authorization");
  if (!token) {
    return response.status(400).json({ message: "token is necessary !" });
  }
  try {
    const verify = jwt.verify(token.split(" ")[1], SECRET);
    request.user = {...verify, token};
    next();
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
};

module.exports = VerifyToken
