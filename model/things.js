const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  name: {type: String, required: true, minlength: 5, maxlength: 255},
  category: {type: String, required: true, eunm: ["web", "mobile", "network"]},
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: function (v) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const result = v && v.length > 0;
            resolve(result);
          }, 4000);
        });
      },
      message: "A course should have at least one tag.",
    },
  },
  date: {type: Date, default: Date.now()},
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 100,
  },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Python Course",
    category:" ",
    author: "Elyas Afghan",
    tags: [],
    isPublished: true,
    price: 15,
  });
  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    for (field in ex.errors) console.log(ex.errors[field].message);
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
  // console.log(courses);
}
// updateCourse("5a68fdc3615eda645bc6bdec");

// how to remove the document

async function removeCourse(id) {
  // const result = await Course.deleteOne({_id: id});
  const course = await Course.findByIdAndRemove(id);
  // console.log(course);
}
// removeCourse("5a68fdc3615eda645bc6bdec");
