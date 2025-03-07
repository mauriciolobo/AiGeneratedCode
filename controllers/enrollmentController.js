const asyncHandler = require('express-async-handler');
const Enrollment = require('../models/Enrollment');
const Student = require('../models/Student');
const Course = require('../models/Course');

// @desc    Enroll a student in a course
// @route   POST /api/enrollments
// @access  Public
const createEnrollment = asyncHandler(async (req, res) => {
  const { student_id, course_id, enrollment_date } = req.body;

  // Check if student exists
  const studentExists = await Student.findById(student_id);
  if (!studentExists) {
    res.status(404);
    throw new Error('Student not found');
  }

  // Check if course exists
  const courseExists = await Course.findById(course_id);
  if (!courseExists) {
    res.status(404);
    throw new Error('Course not found');
  }

  // Check if enrollment already exists
  const enrollmentExists = await Enrollment.findOne({
    student: student_id,
    course: course_id
  });
  
  if (enrollmentExists) {
    res.status(400);
    throw new Error('Student is already enrolled in this course');
  }

  const enrollment = await Enrollment.create({
    student: student_id,
    course: course_id,
    enrollment_date: enrollment_date || new Date()
  });

  if (enrollment) {
    res.status(201).json(enrollment);
  } else {
    res.status(400);
    throw new Error('Invalid enrollment data');
  }
});

// @desc    Remove a student from a course
// @route   DELETE /api/enrollments/:id
// @access  Public
const deleteEnrollment = asyncHandler(async (req, res) => {
  const enrollment = await Enrollment.findById(req.params.id);

  if (!enrollment) {
    res.status(404);
    throw new Error('Enrollment not found');
  }

  await Enrollment.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: 'Enrollment removed' });
});

// @desc    List all enrollments for a student
// @route   GET /api/students/:id/enrollments
// @access  Public
const getStudentEnrollments = asyncHandler(async (req, res) => {
  const studentExists = await Student.findById(req.params.id);
  if (!studentExists) {
    res.status(404);
    throw new Error('Student not found');
  }

  const enrollments = await Enrollment.find({ student: req.params.id })
    .populate('course');

  res.status(200).json(enrollments);
});

// @desc    List all enrollments for a course
// @route   GET /api/courses/:id/enrollments
// @access  Public
const getCourseEnrollments = asyncHandler(async (req, res) => {
  const courseExists = await Course.findById(req.params.id);
  if (!courseExists) {
    res.status(404);
    throw new Error('Course not found');
  }

  const enrollments = await Enrollment.find({ course: req.params.id })
    .populate('student');

  res.status(200).json(enrollments);
});

module.exports = {
  createEnrollment,
  deleteEnrollment,
  getStudentEnrollments,
  getCourseEnrollments
};
