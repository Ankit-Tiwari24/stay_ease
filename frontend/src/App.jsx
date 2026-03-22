import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Contact from './pages/Contact';
import BookingsList from './pages/BookingsList';
import BookingPage from './pages/BookingPage';
import HotelDetail from './pages/HotelDetail';

import MyBookings from './pages/MyBookings';
import Profile from './pages/Profile';

// Custom Admin Panel (Staff Only)
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
import UserManage from './admin/pages/UserManage';
import HotelManage from './admin/pages/HotelManage';
import BookingManage from './admin/pages/BookingManage';
import ContactMessages from './admin/pages/ContactMessages';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans bg-gray-50 selection:bg-blue-200">
        <Routes>
          {/* Main Website Routes */}
          <Route path="/*" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/booking" element={<BookingsList />} />
                  <Route path="/hotel/:id" element={<HotelDetail />} />
                  <Route path="/book/:hotelId" element={<BookingPage />} />
                  <Route path="/payment" element={<BookingPage />} />
                  <Route path="/my-bookings" element={<MyBookings />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />

          {/* Custom Admin Panel Routes (is_staff=True required) */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<UserManage />} />
            <Route path="hotels" element={<HotelManage />} />
            <Route path="bookings" element={<BookingManage />} />
            <Route path="contacts" element={<ContactMessages />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
