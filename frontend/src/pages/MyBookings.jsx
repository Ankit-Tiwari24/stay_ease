import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock } from 'lucide-react';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem('my_bookings') || '[]');
    setBookings(savedBookings.reverse()); // Show newest first
  }, []);

  return (
    <div className="pt-24 pb-16 bg-gray-50 min-h-screen flex-grow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center md:text-left mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">My Bookings</h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 md:mx-0 mx-auto">Manage your upcoming and past reservations.</p>
        </div>

        {bookings.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {bookings.map((booking) => (
              <motion.div 
                key={booking.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row gap-6 hover:shadow-md transition-shadow"
              >
                <div className="w-full sm:w-48 h-32 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 relative">
                  <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop" alt="Property" className="w-full h-full object-cover opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 flex items-center text-white backdrop-blur-md bg-white/10 px-2 py-1 rounded-md text-xs font-bold border border-white/20">
                    Confirmed
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{booking.hotelName}</h3>
                  <div className="mt-2 text-sm text-gray-500 flex items-center">
                    <MapPin className="w-4 h-4 mr-1 text-blue-500" /> StayEase Selected Location
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4 border-t border-gray-50 pt-4">
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Check-in</p>
                      <p className="font-bold text-gray-800 flex items-center">
                        <Calendar className="w-4 h-4 mr-1.5 text-blue-600" /> {booking.checkIn}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Check-out</p>
                      <p className="font-bold text-gray-800 flex items-center">
                        <Calendar className="w-4 h-4 mr-1.5 text-blue-600" /> {booking.checkOut}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-xs text-gray-400">
                    <Clock className="w-3 h-3 mr-1" />
                    Booked on {new Date(booking.dateBooked).toLocaleDateString()}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No bookings yet</h3>
            <p className="text-gray-500 mb-6">You haven't made any reservations. Discover amazing properties to stay at!</p>
            <a href="/booking" className="inline-block bg-blue-600 text-white font-bold px-6 py-3 rounded-full hover:bg-blue-700 transition">Explore Properties</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
