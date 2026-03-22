# StayEase: Premium Hotel Booking & Management System

StayEase is a world-class, full-stack hospitality platform designed for seamless travel experiences. It features a high-performance React frontend and a robust Django/DRF backend, integrated with a secure, custom administration engine.

## 🚀 Key Features
- **Curated Property Gallery**: Explore luxury stays with high-quality, person-less imagery.
- **Advanced Reservation Flow**: Real-time booking with status tracking and history.
- **Staff-Only Admin Panel**: A dedicated, high-security dashboard for system-wide management.
- **Secure Authentication**: JWT-based session management with role-based access control.

---

## 🛠️ Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion, Lucide Icons
- **Backend**: Python 3.x, Django 5.x, Django REST Framework (DRF)
- **Database**: SQLite (Development) / MySQL (Production Ready)
- **Security**: JWT (SimpleJWT), CORS Headers, Staff-only Permissions

---

## 📁 Project Structure

### Backend (`/hotel_project`)
- `accounts/`: User management, OTP verification, and profile handling.
- `hotels/`: Property listings, room details, and review systems.
- `bookings/`: Core reservation logic and payment processing.
- `custom_admin/`: Exclusive API endpoints for administrative operations.
- `media/`: Locally served high-definition property and profile assets.

### Frontend (`/frontend`)
- `src/admin/`: **Custom Admin Panel** (Layout, Dashboard, Management Pages).
- `src/pages/`: Public marketplace views (Home, Gallery, Details).
- `src/components/`: Reusable UI modules and site navigation.
- `src/services/`: Centralized API interaction layers.

---

## ⚙️ Setup & Installation

### 1. Requirements
- Python 3.10+
- Node.js 18+
- Virtual Environment (venv)

### 2. Backend (Django)
```bash
cd hotel_project
# Activate venv: venv\Scripts\activate (Windows) or source venv/bin/activate (Unix)
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 3. Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Admin Panel Guide

### Access Requirements
Only users with `is_staff=True` can access the management suite. 
- **URL**: `http://localhost:5173/admin`
- **Dashboard**: Real-time analytics (Users, Revenue, Bookings).
- **Users**: Audit and manage all global traveler accounts.
- **Hotels**: Full CRUD (Add/Edit/Delete) with localized image uploads.
- **Bookings**: Process check-ins and update reservation statuses.
- **Contacts**: Review and manage community inquiries.

### Core Admin Endpoints
- `GET /api/admin/stats/` - Dashboard data
- `GET /api/admin/users/` - User list
- `GET /api/admin/hotels/` - Property management
- `GET /api/admin/bookings/` - Reservation control
- `GET /api/admin/contacts/` - Messaging system

---

## 🌍 Environment Setup (.env)
Create a `.env` file in the `hotel_project` root:
```env
DEBUG=True
SECRET_KEY=your_secure_django_key
DB_NAME=hotel_db
DB_USER=root
DB_PASSWORD=your_password
EMAIL_HOST_USER=your_gmail@gmail.com
EMAIL_HOST_PASSWORD=your_app_password
```

---

## 💡 Common Troubleshooting
- **Images not visible**: Ensure the Django server is running and `MEDIA_URL` is correctly mapped in `urls.py`.
- **Admin Access Denied**: Ensure your user account was created via `createsuperuser` or has the Staff status enabled in the database.
- **CORS Errors**: Verify that `http://localhost:5173` is listed in `CORS_ALLOWED_ORIGINS` within `settings.py`.

---
© 2026 StayEase Hospitality Systems. Built for Excellence.
