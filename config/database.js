const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

exports.connect = () => {
  // Connect to the database
  mongoose
    .connect(
      `mongodb://127.0.0.1:27017/Ali`
    )
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      process.exit(1);
    });
};
