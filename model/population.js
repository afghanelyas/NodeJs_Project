const mongoose = require("mongoose");

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

const Author = mongoose.model(
  "Author",
  new mongoose.Schema({
    name: String,
    bio: String,
    website: String,
  })
);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
  })
);

async function cerateAuthor(name, bio, website) {
  const author = new Author({name, bio, website});
  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });
  const result = await course.save();
  console.log(result);
}

async function listCourse() {
  const courses = await Course.find().select("name  author").populate("author");
  console.log(courses);
}

// cerateAuthor("Elyas" , "Follow your dearm" , "elyasafghan.me")
createCourse("php", "63faff70e8b453489d6d1829");
