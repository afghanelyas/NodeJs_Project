const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", true);

exports.connect = () => {
  // Connect to the database
  mongoose
    .connect(
      `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
    )
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      process.exit(1);
    });
};
