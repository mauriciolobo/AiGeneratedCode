const express = require('express');
const router = express.Router();
const { 
  createCourse, 
  getCourseById, 
  updateCourse, 
  deleteCourse, 
  getCourses 
} = require('../controllers/courseController');
const { getCourseEnrollments } = require('../controllers/enrollmentController');

// Course routes
router.route('/')
  .get(getCourses)
  .post(createCourse);

router.route('/:id')
  .get(getCourseById)
  .put(updateCourse)
  .delete(deleteCourse);

router.route('/:id/enrollments')
  .get(getCourseEnrollments);

module.exports = router;
