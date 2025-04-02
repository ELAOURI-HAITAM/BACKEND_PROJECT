const express = require("express");

const{verifyToken,checkRole}=require("../middlewares/auth");
const userController = require("../controllers/userController");
const app = express();

// AUTHENTIFICATION ROUTES
app.post("/register",userController.register);
app.post("/login",userController.login);

//  CRUD AND BLOCK ROUTES
app.get("/users",verifyToken, checkRole(["admin"]),userController.getUsers);
app.get("/users/:id",verifyToken, userController.getUser);
app.put("/users/:id",verifyToken,checkRole(["admin"]),userController.updateUser);
app.delete("/users/:id",verifyToken,checkRole(["admin"]),userController.deleteUser);
app.patch("/users/block/:id",verifyToken,checkRole(["admin"]),userController.BlockUser);
app.get("/users/search",verifyToken,checkRole(["admin"]),userController.search);

module.exports = app ;  