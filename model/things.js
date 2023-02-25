const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  name: {type: String, required: true, minlength: 5, maxlength: 255},
  category: {
    type: String,
    required: true,
    eunm: ["web", "mobile", "network"],
    lowercase: true,
    uppercase: true,
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: function (v) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const result = v && v.length > 0;
            resolve(result);
          }, 1000);
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
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
  },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Python Course",
    category: "WEb",
    author: "Elyas Afghan",
    tags: ["php", "javascript"],
    isPublished: true,
    price: 15.6,
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
