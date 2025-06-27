# 🎓 Campus Hub – Backend API

A modular, secure backend system for managing a campus portal where users can have roles like **Student**, **Faculty**, and **Admin**. Built with **Express.js**, **JWT Authentication**, **API Key Protection**, and **Role-Based Access Control (RBAC)**.

---

## 🚀 Features

- 🔐 JWT-based Authentication
- 🔑 API Key generation & validation
- 👥 Role-Based Access Control (RBAC)
- 📰 Announcements (Faculty/Admin)
- 🧾 Results (Admin only)
- 📚 Course & Materials Management
- 🛠️ Admin Panel to manage users
- 🔌 Postman Collection to simulate role flows

---

## 👥 User Roles

| Role    | Capabilities |
|---------|--------------|
| **Student** | View announcements, results, and course materials |
| **Faculty** | Post announcements, upload materials |
| **Admin**   | Manage users, publish results, full access |

---

## 📊 Database Tables

- `users` – name, email, password, role (STUDENT / FACULTY / ADMIN)
- `api_keys` – userId, key
- `announcements` – title, message, postedBy
- `results` – userId, totalMarks, percentage
- `exams` – resultId, subName, marks, status
- `courses` – courseName, description
- `materials` – courseId, fileLink, uploadedBy

---

## 🧾 API Routes

### 🔐 Auth

| Method | Route               | Description                          | Role |
|--------|---------------------|--------------------------------------|------|
| POST   | `/auth/register`    | Register a new user (default: student) | Public |
| POST   | `/auth/login`       | Login and receive JWT                | Public |
| GET    | `/auth/me`          | Get current user info                | Authenticated |
| POST   | `/auth/api-key`     | Generate API key                     | Authenticated |
| POST   | `/auth/logout`      | Logout user                          | Authenticated |

---

### 📢 Announcements

| Method | Route                     | Description           | Role             |
|--------|---------------------------|-----------------------|------------------|
| POST   | `/announcements/create`   | Create announcement   | Admin / Faculty  |
| GET    | `/announcements/get-all`  | Get all announcements | All roles        |

---

### 🎓 Results

| Method | Route                    | Description                         | Role               |
|--------|--------------------------|-------------------------------------|--------------------|
| POST   | `/results/`              | Publish a result                    | Admin              |
| GET    | `/results/:studentId`    | Get result by student ID            | Student (self) / Admin / Faculty |

---

### 📚 Courses & Materials

| Method | Route                                   | Description                 | Role               |
|--------|------------------------------------------|-----------------------------|--------------------|
| POST   | `/courses/add`                           | Add a new course            | Admin              |
| GET    | `/courses/get-all`                       | List all courses            | All roles          |
| POST   | `/courses/:courseId/material`            | Upload material to course   | Faculty            |
| GET    | `/courses/:courseId/materials`           | Get materials for a course  | Student / Faculty  |

---

### ⚙️ Admin Panel

| Method | Route                      | Description             | Role  |
|--------|----------------------------|-------------------------|-------|
| GET    | `/admin/users`             | List all users          | Admin |
| PUT    | `/admin/users/:id/role`    | Update user's role      | Admin |

---

## 🛡️ Middleware Flow

All protected routes use:

- `authMiddleware` – Verifies JWT and API key
- `authroizedRoles([...])` – Restricts access by user role

---

## 🧪 Postman Collection

[Campus Hub Collection](https://www.postman.com/mdsaleh24/workspace/mohammed-saleh-masterji-assignment/folder/31971271-77513f88-2045-4a07-9638-351aea9a485b?action=share&creator=31971271&ctx=documentation)

---

## 📦 Technologies

- **Node.js + Express**
- **Prisma ORM**
- **JWT Auth**
- **API Key Security**
- **Zod Validation**
- **Postman Collection**
- **RBAC Middleware**
