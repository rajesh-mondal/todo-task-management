# To-Do Task Management Application

A full-stack task management application built using **Laravel 12** (API backend) and **React + TailwindCSS** (frontend).  
Users can authenticate, create tasks, update tasks, delete tasks, and manage them with priority and status.

---

## 🚀 Features

### 🔐 Authentication
- User Registration  
- User Login  
- Logout  
- Protected Routes (Only authenticated users can access task pages)

### 📝 Task Management
- Create Tasks  
- View Tasks  
- Update Tasks  
- Delete Tasks  
- Priority Levels: High / Medium / Low  
- Status Levels: Pending / In-Progress / Completed  

### 🎨 Frontend (React)
- React 19 + Vite  
- TailwindCSS UI  
- Dark-themed modern layout  
- Header, Footer, Logout Component  
- Error + Validation Handling  
- Axios API integration  

### 🛠 Backend (Laravel 12)
- REST API with Sanctum Auth  
- Request Validation  
- Task CRUD  
- Each user can only access their own tasks  

---

## 🧰 Tech Stack

### Frontend
- React 19  
- React Router  
- Axios  
- TailwindCSS  
- Vite  

### Backend
- Laravel 12  
- Laravel Sanctum  
- MySQL  

---

## ⚙️ Setup Instructions

### 🛠 Backend Setup (Laravel)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```
### 🎨 Frontend Setup (React)
```bash
cd frontend
npm install
npm run dev
```

## 🚀 Project Running
- Backend (Laravel): http://localhost:8000
- Frontend (React): http://localhost:5173
