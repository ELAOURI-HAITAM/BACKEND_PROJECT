require("dotenv").config();
require("./db/connexion");
const express = require("express");
const app = express();
const Router = require("./route/project");



// middlewares

app.use(express.json());
app.use("/api/v1/project", Router);


app.listen(4000, (err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log(`Server is running on port : ${process.env.PORT}`);
});


