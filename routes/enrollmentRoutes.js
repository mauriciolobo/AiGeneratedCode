const express = require('express');
const router = express.Router();
const { 
  createEnrollment, 
  deleteEnrollment 
} = require('../controllers/enrollmentController');

// Enrollment routes
router.route('/')
  .post(createEnrollment);

router.route('/:id')
  .delete(deleteEnrollment);

module.exports = router;
