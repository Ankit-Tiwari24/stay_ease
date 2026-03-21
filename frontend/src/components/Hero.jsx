import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-[90vh] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542314831-c6a4d27ece50?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury hotel exterior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl text-white">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-sm font-semibold tracking-wider mb-6 animate-fade-in-up">
            DISCOVER THE EXTRAORDINARY
          </span>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight drop-shadow-lg">
            Book Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Perfect</span> Experience
          </h1>
          <p className="text-xl lg:text-2xl text-gray-200 mb-10 max-w-xl leading-relaxed drop-shadow-md">
            Find and book the best hotels, resorts, and vacation rentals around the world with exclusive deals and seamless booking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/booking" className="text-center bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transform hover:-translate-y-1">
              Start Booking
            </Link>
            <Link to="/booking" className="text-center bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg transition-all">
              Explore Destinations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
