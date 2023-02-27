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

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});
const Author = mongoose.model("Author", authorSchema);
const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    author: authorSchema,
  })
);
async function createCourse(name, author) {
  const course = new Course({
    name,
    author: {
      type: authorSchema,
      required: true,
    },
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

// createCourse("node course", new Author({name: "Elyas"}));

async function updateAuthor(courseId) {
  const course = await Course.updateOne(
    {_id: courseId},
    {
      $unset: {
        author: "",
      },
    }
  );
}
updateAuthor("63fc3923045787f7987483b5");
