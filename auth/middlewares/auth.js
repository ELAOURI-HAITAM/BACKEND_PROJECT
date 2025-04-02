const JWT_SECRET = process.env.SECRET;
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  
  if (!token) {
    return res
      .status(400)
      .json({ message: "Le Token est obligatoire pour l'authentification" });
  }

  
  try {
      const verify = jwt.verify(token.split(" ")[1], JWT_SECRET);
      req.user = verify; 
    next(); 
  } catch (err) {
    return res.status(401).json({ message: "Token invalide" });
  }
};

const checkRole = (roles)=>(req , res , next)=>{
  if(!roles.includes(req.user.role)){
    return res.status(400).json({message:"No entry"})
  }
  next();
}


module.exports = {verifyToken , checkRole};