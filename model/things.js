const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  name: {type: String, required: true},
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    // name: "Python Course",
    author: "Elyas Afghan",
    tags: ["Python", "backend"],
    isPublished: true,
    price: 15,
  });
  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    console.log(ex.message);
  }
}
createCourse();

// how to update the document
async function updateCourse(id) {
  const courses = await Course.findByIdAndUpdate(id, {
    $set: {
      author: "Elyas Afghan",
      isPublished: false,
    },
  });
  console.log(courses);
}
// updateCourse("5a68fdc3615eda645bc6bdec");

// how to remove the document

async function removeCourse(id) {
  // const result = await Course.deleteOne({_id: id});
  const course = await Course.findByIdAndRemove(id);
  console.log(course);
}
// removeCourse("5a68fdc3615eda645bc6bdec");
