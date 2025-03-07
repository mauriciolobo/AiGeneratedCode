# Student Information System API

A RESTful API for managing student information, courses, and enrollments.

## Features

- Student management (create, read, update, delete)
- Course management (create, read, update, delete)
- Enrollment management (enroll students in courses, remove enrollments)
- View student enrollments
- View course enrollments

## Technology Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Libraries**: Mongoose for MongoDB object modeling

## API Endpoints

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get a specific student
- `POST /api/students` - Create a new student
- `PUT /api/students/:id` - Update a student
- `DELETE /api/students/:id` - Delete a student
- `GET /api/students/:id/enrollments` - Get all enrollments for a student

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get a specific course
- `POST /api/courses` - Create a new course
- `PUT /api/courses/:id` - Update a course
- `DELETE /api/courses/:id` - Delete a course
- `GET /api/courses/:id/enrollments` - Get all enrollments for a course

### Enrollments
- `POST /api/enrollments` - Create a new enrollment
- `DELETE /api/enrollments/:id` - Delete an enrollment

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. run mongo container: `docker run -p 27017:27017 -d mongo`
3. Configure your MongoDB connection in `.env`
4. Run the server: `npm run dev`
5. The API will be available at `http://localhost:5000`
