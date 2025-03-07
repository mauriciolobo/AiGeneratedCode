const express = require('express');
const router = express.Router();
const { 
  createStudent, 
  getStudentById, 
  updateStudent, 
  deleteStudent, 
  getStudents 
} = require('../controllers/studentController');
const { getStudentEnrollments } = require('../controllers/enrollmentController');

// Student routes
router.route('/')
  .get(getStudents)
  .post(createStudent);

router.route('/:id')
  .get(getStudentById)
  .put(updateStudent)
  .delete(deleteStudent);

router.route('/:id/enrollments')
  .get(getStudentEnrollments);

module.exports = router;
