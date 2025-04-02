const mongoose = require("mongoose");

const connect = async () => {
  await mongoose.connect(process.env.DB_URI);
};

connect()
  .then(() => {
    console.log("db connected!");
  })
  .catch((err) => {
    console.log(err.message);
  });
