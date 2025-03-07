const asyncHandler = require('express-async-handler');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

// @desc    Create a course
// @route   POST /api/courses
// @access  Public
const createCourse = asyncHandler(async (req, res) => {
  const { course_name, course_code, description, credits } = req.body;

  // Check if course with this code already exists
  const courseExists = await Course.findOne({ course_code });
  if (courseExists) {
    res.status(400);
    throw new Error('Course with this code already exists');
  }

  const course = await Course.create({
    course_name,
    course_code,
    description,
    credits
  });

  if (course) {
    res.status(201).json(course);
  } else {
    res.status(400);
    throw new Error('Invalid course data');
  }
});

// @desc    Get course details with enrolled students
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  
  if (!course) {
    res.status(404);
    throw new Error('Course not found');
  }

  // Get course enrollments with student details
  const enrollments = await Enrollment.find({ course: req.params.id }).populate('student');
  
  res.status(200).json({
    ...course._doc,
    enrollments
  });
});

// @desc    Update course information
// @route   PUT /api/courses/:id
// @access  Public
const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    res.status(404);
    throw new Error('Course not found');
  }

  const { course_name, course_code, description, credits } = req.body;
  
  // Check if another course with this code exists
  if (course_code && course_code !== course.course_code) {
    const codeExists = await Course.findOne({ course_code });
    if (codeExists) {
      res.status(400);
      throw new Error('Course code already in use by another course');
    }
  }

  const updatedCourse = await Course.findByIdAndUpdate(
    req.params.id,
    { course_name, course_code, description, credits },
    { new: true }
  );

  res.status(200).json(updatedCourse);
});

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Public
const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    res.status(404);
    throw new Error('Course not found');
  }

  // Delete course enrollments
  await Enrollment.deleteMany({ course: req.params.id });
  
  // Delete the course
  await Course.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: 'Course and related enrollments removed' });
});

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getCourses = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const courses = await Course.find().skip(skip).limit(limit);
  const totalCourses = await Course.countDocuments();

  res.status(200).json({
    courses,
    page,
    pages: Math.ceil(totalCourses / limit),
    total: totalCourses
  });
});

module.exports = {
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
  getCourses
};
