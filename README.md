# Hotel Booking Management System

A full-stack Hotel Booking Management System akin to MakeMyTrip, featuring User Authentication, Hotel/Room Management, Search & Filter, and a Booking System.

## Project Structure
- `hotel_project/`: Django Backend (REST API using DRF)
- `frontend/`: React Frontend (Vite + Tailwind CSS)

## Tech Stack
- **Backend:** Python, Django, Django REST Framework, MySQL
- **Frontend:** React.js, Tailwind CSS, Vite

---

## 🚀 Setup Instructions

### 1. Database Setup (MySQL)
Ensure you have MySQL installed and running. Create a database for the project:
```sql
CREATE DATABASE hotel_db;
```
If your MySQL root user has a password, update `DATABASES['default']['PASSWORD']` in `hotel_project/hotel_project/settings.py`.

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd hotel_project
   ```
2. Activate your virtual environment and install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run migrations to create the database schema:
   ```bash
   python manage.py makemigrations accounts hotels bookings
   python manage.py migrate
   ```
4. Create a superuser to access the admin panel:
   ```bash
   python manage.py createsuperuser
   ```
5. Start the Django development server:
   ```bash
   python manage.py runserver
   ```
   *The API will be available at `http://localhost:8000/api/`*

### 3. Frontend Setup
Make sure you have [Node.js](https://nodejs.org/) installed.
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The React app will be available at `http://localhost:5173`*

---

## Features Implemented
- **JWT Authentication:** Login, Signup, and Token Refresh endpoints.
- **Hotel Management API:** CRUD for Hotels, RoomTypes, and Rooms.
- **Booking Flow:** API specifically designed to prevent double-booking using a `clean()` validation method.
- **React Frontend:** A responsive UI featuring a Navbar, SearchBar, interactive HotelCards, and a cohesive Booking confirmation page.
