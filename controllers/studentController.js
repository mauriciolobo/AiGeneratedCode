const asyncHandler = require('express-async-handler');
const Student = require('../models/Student');
const Enrollment = require('../models/Enrollment');

// @desc    Create a student
// @route   POST /api/students
// @access  Public
const createStudent = asyncHandler(async (req, res) => {
  const { first_name, last_name, date_of_birth, email, phone_number } = req.body;

  // Check if student with this email already exists
  const studentExists = await Student.findOne({ email });
  if (studentExists) {
    res.status(400);
    throw new Error('Student with this email already exists');
  }

  const student = await Student.create({
    first_name,
    last_name,
    date_of_birth,
    email,
    phone_number
  });

  if (student) {
    res.status(201).json(student);
  } else {
    res.status(400);
    throw new Error('Invalid student data');
  }
});

// @desc    Get student details with enrollments
// @route   GET /api/students/:id
// @access  Public
const getStudentById = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  
  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }

  // Get student enrollments
  const enrollments = await Enrollment.find({ student: req.params.id }).populate('course');
  
  res.status(200).json({
    ...student._doc,
    enrollments
  });
});

// @desc    Update student information
// @route   PUT /api/students/:id
// @access  Public
const updateStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }

  const { first_name, last_name, date_of_birth, email, phone_number } = req.body;
  
  // Check if another student with this email exists
  if (email && email !== student.email) {
    const emailExists = await Student.findOne({ email });
    if (emailExists) {
      res.status(400);
      throw new Error('Email already in use by another student');
    }
  }

  const updatedStudent = await Student.findByIdAndUpdate(
    req.params.id,
    { first_name, last_name, date_of_birth, email, phone_number },
    { new: true }
  );

  res.status(200).json(updatedStudent);
});

// @desc    Delete a student
// @route   DELETE /api/students/:id
// @access  Public
const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }

  // Delete student's enrollments
  await Enrollment.deleteMany({ student: req.params.id });
  
  // Delete the student
  await Student.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: 'Student and related enrollments removed' });
});

// @desc    Get all students
// @route   GET /api/students
// @access  Public
const getStudents = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const students = await Student.find().skip(skip).limit(limit);
  const totalStudents = await Student.countDocuments();

  res.status(200).json({
    students,
    page,
    pages: Math.ceil(totalStudents / limit),
    total: totalStudents
  });
});

module.exports = {
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
  getStudents
};
