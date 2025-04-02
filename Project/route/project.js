const express = require("express");
const Router = express.Router();
const {
  welcom,
  read_all,
  all_categ,
  create,
  update,
  supprimer,
  search,
  read_one,
  create_categ,
} = require("../controllers/Project_Management");

const VerifyToken = require('../middleware/auth')

// TO USE TOKEN ON ALL ROUTES 
Router.use(VerifyToken)

// WELCOM TO PROJECT ROUTE
Router.get("/", welcom);

// DISPLAY ALL PROJECTS
Router.get("/all", read_all);

// FIND ONE PROJECT BY ID
Router.get("/find/:id", read_one);

// ADD NEW PROJECT
Router.post("/add", create);

// UPDATE PROJECT BY ID
Router.put("/update/:id", update);

// DELETE PROJECT BY ID
Router.delete("/delete/:id", supprimer);

// ADD NEW CATEGORY
Router.post("/categ", create_categ);

// DISPLAY ALL GATEGORIES
Router.get('/categories' , all_categ)

// FILTER PROJECT BY NAME,DATES,STATUS
Router.get("/filter", search);

module.exports = Router;
