const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers && req.headers.authorization;
    if (!authHeader) {
      return res.status(403).json({ message: "Unauthorized!" });
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        throw new Error("Invalid token");
      }
    });
    req.user = { token };
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  authMiddleware,
};
