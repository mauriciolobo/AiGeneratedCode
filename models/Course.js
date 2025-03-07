const mongoose = require('mongoose');

const courseSchema = mongoose.Schema(
  {
    course_name: {
      type: String,
      required: [true, 'Course name is required']
    },
    course_code: {
      type: String,
      required: [true, 'Course code is required'],
      unique: true
    },
    description: {
      type: String
    },
    credits: {
      type: Number,
      required: [true, 'Credits are required']
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Course', courseSchema);
