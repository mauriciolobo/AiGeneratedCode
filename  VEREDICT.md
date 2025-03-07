# Prompt

Developed entirely in a browser using **GitHub Codespaces**, along with AI tools: **ChatGPT** and **GitHub Copilot**.

This was all my interactions:

## AI Rules
In the file ./github/copilot-instructions.md you can find AI rules.

## ChatGPT 4.5 prompt:
Create a spec for a Student Information System. This is for the back-office that will create student and enroll in a course. This will also allow create course. This spec should only convers the API endpoints and Database schema. Be the most specific as possible. Do not include code. Do not include authentication. Do not include non-functional details.

## Output:
Here's a precise, detailed spec for the API endpoints and Database schema for a back-office Student Information System focused on student and course management:

# Student Information System (SIS) Specification

## API Endpoints

### Students
- **Create a student**
  - `POST /api/students`
  - Request body:
    ```json
    {
      "first_name": "string",
      "last_name": "string",
      "date_of_birth": "YYYY-MM-DD",
      "email": "string",
      "phone_number": "string"
    }
    ```
  - Response: Created student object with assigned ID.

- **Get student details**
  - `GET /api/students/{student_id}`
  - Response: Student details including enrollments.

- **Update student information**
  - `PUT /api/students/{student_id}`
  - Request body:
    ```json
    {
      "first_name": "string",
      "last_name": "string",
      "date_of_birth": "YYYY-MM-DD",
      "email": "string",
      "phone_number": "string"
    }
    ```
  - Response: Updated student object.

- **Delete student**
  - `DELETE /api/students/{student_id}`
  - Response: Confirmation of deletion.

- **List all students**
  - `GET /api/students`
  - Response: List of students with pagination.

---

### Courses
- **Create a course**
  - `POST /api/courses`
  - Request body:
    ```json
    {
      "course_name": "string",
      "course_code": "string",
      "description": "string",
      "credits": integer
    }
    ```
  - Response: Created course object with assigned ID.

- **Get course details**
  - `GET /api/courses/{course_id}`
  - Response: Course details including enrolled students.

- **Update course information**
  - `PUT /api/courses/{course_id}`
  - Request body:
    ```json
    {
      "course_name": "string",
      "course_code": "string",
      "description": "string",
      "credits": integer
    }
    ```
  - Response: Updated course object.

- **Delete course**
  - `DELETE /api/courses/{course_id}`
  - Response: Confirmation of deletion.

- **List all courses**
  - `GET /api/courses`
  - Response: List of courses with pagination.

---

### Enrollments
- **Enroll a student in a course**
  - `POST /api/enrollments`
  - Request body:
    ```json
    {
      "student_id": integer,
      "course_id": integer,
      "enrollment_date": "YYYY-MM-DD"
    }
    ```
  - Response: Enrollment details with ID.

- **Remove a student from a course**
  - `DELETE /api/enrollments/{enrollment_id}`
  - Response: Confirmation of removal.

- **List all enrollments for a student**
  - `GET /api/students/{student_id}/enrollments`
  - Response: List of courses the student is enrolled in.

- **List all enrollments for a course**
  - `GET /api/courses/{course_id}/enrollments`
  - Response: List of students enrolled in the course.

---

## Database Schema

### Table: `students`
| Column           | Type           | Constraints                   | Description                    |
|------------------|----------------|-------------------------------|--------------------------------|
| id               | integer        | PRIMARY KEY, auto-increment   | Unique student identifier      |
| first_name       | varchar(50)    | NOT NULL                      | Student's first name           |
| last_name        | varchar(50)    | NOT NULL                      | Student's last name            |
| date_of_birth    | date           | NOT NULL                      | Student's birth date           |
| email            | varchar(100)   | UNIQUE, NOT NULL              | Email address                  |
| phone_number     | varchar(20)    |                               | Contact number                 |
| created_at       | timestamp      | DEFAULT current_timestamp     | Timestamp of creation          |
| updated_at       | timestamp      | DEFAULT current_timestamp     | Timestamp of last update       |

---

### Table: `courses`
| Column           | Type           | Constraints                   | Description                   |
|------------------|----------------|-------------------------------|-------------------------------|
| id               | integer        | PRIMARY KEY, auto-increment   | Unique course identifier      |
| course_name      | varchar(100)   | NOT NULL                      | Name of the course            |
| course_code      | varchar(20)    | UNIQUE, NOT NULL              | Code representing the course  |
| description      | text           |                               | Course description            |
| credits          | integer        | NOT NULL                      | Course credit value           |
| created_at       | timestamp      | DEFAULT current_timestamp     | Timestamp of creation         |
| updated_at       | timestamp      | DEFAULT current_timestamp     | Timestamp of last update      |

---

### Table: `enrollments`
| Column           | Type           | Constraints                                   | Description                     |
|------------------|----------------|-----------------------------------------------|---------------------------------|
| id               | integer        | PRIMARY KEY, auto-increment                   | Unique enrollment identifier    |
| student_id       | integer        | FOREIGN KEY to `students(id)`, NOT NULL       | ID of enrolled student          |
| course_id        | integer        | FOREIGN KEY to `courses(id)`, NOT NULL        | ID of course                    |
| enrollment_date  | date           | NOT NULL                                      | Date of enrollment              |
| created_at       | timestamp      | DEFAULT current_timestamp                     | Timestamp of creation           |

- Composite UNIQUE constraint on `(student_id, course_id)` to prevent duplicate enrollments.

---

This specification clearly outlines the necessary API endpoints and database schema to implement the core functionality of a back-office student information management system, focused exclusively on student and course management operations.



**--- THE END of ChatGPT spec doc. ---**

## Veredict
While AI can significantly aid in generating code and specifications, relying on it to create an entire application can be problematic. For instance, I had to manually read through the generated code, install necessary dependencies, set up Docker, and run a MongoDB container. These steps require a level of understanding and intervention that AI alone cannot provide. Additionally, AI-generated code may lack context-specific optimizations and best practices that a human developer would naturally incorporate.

Moreover, the AI rules file explicitly states not to include authentication, unit tests, and other critical components. This omission highlights the need for human oversight to ensure the application is secure, well-tested, and adheres to all functional and non-functional requirements. Trusting AI to build an entire application without thorough review and manual adjustments can lead to incomplete or insecure implementations.