const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// REGISTER NEW USER
const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // CHECKING IF USER ALREADY EXISTS
    const verify_user = await User.findOne({ email });
    if (verify_user) {
      return res.status(400).json({ message: "User already exists" });
    }
    // HASHED PASSWORD FOR SECURITY
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.insertOne({
      username,
      email,
      password: hashedPassword,
      role,
    });
    res.status(201).json({ message: "User create succes", user });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// LOGIN USER
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //CHECK USER EXISTS
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found");
    }
    //CHECK PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json("error in password or email");
    }
    //GENERATE TOKEN AND SAVE USER INFORMATIONS
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.SECRET
    );
    res.json({ message: "Login success", token, user: req.user });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
// CRUD
// GET ALL USERS
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ONE USER
const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const users = await User.findById(userId);
    if (!users) {
      return res.status(404).json({ message: "user not found " });
    }
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//UPDATE A SPECIFIC USER
const updateUser = async (req, res) => {
  try {
    const { username, email, role } = req.body;

    if (req.user.role !== "admin" && role) {
      return res.status(400).json({ message: "Block update" });
    }

    const update_user = await User.updateOne(
      { _id: req.params.id },
      { $set: { username, email, role } }
    );

    res.json(update_user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE A SPECIFIC USER
const deleteUser = async (req, res) => {
  try {
    const delete_user = await User.deleteOne({ _id: req.params.id });

    res.json({ message: "Delete success", delete_user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//BLOCK OR UNBLOCK USER
const BlockUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  user.blocked = !user.blocked;
  await user.save();
  res.json({ message: `User ${user.blocked ? "bloque" : "debloque"}` });
};

//SEARCHING BY USERNAME OR EMAIL OR ROLE
const search = async (req, res) => {
  try {
    const { keyword } = req.query;
    const users = await User.find({
      $or: [
        { username: { $regex: keyword } },
        { email: { $regex: keyword } },
        { role: { $regex: keyword } },
      ],
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//EXPORTS FUNCTIONS TO USE IT ON ROUTES
module.exports = {
  register,
  login,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  BlockUser,
  search,
};
