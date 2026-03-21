import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Search } from 'lucide-react';

const SearchSection = () => {
  const [location, setLocation] = useState('');
  const [dates, setDates] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (location.trim()) {
      navigate(`/booking?location=${encodeURIComponent(location)}`);
    } else {
      navigate('/booking');
    }
  };

  return (
    <div className="relative -mt-16 z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <div className="bg-white rounded-3xl p-4 md:p-6 shadow-2xl shadow-blue-900/10 border border-gray-100 flex flex-col md:flex-row items-center gap-4">
        
        {/* Location Input */}
        <div className="flex-1 w-full relative">
          <div className="flex items-center border border-gray-200 rounded-2xl px-4 py-3 hover:border-blue-400 transition-colors focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
            <MapPin className="text-gray-400 h-5 w-5 mr-3 flex-shrink-0" />
            <div className="flex flex-col flex-1">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</span>
              <select 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full bg-transparent border-none p-0 text-gray-900 focus:ring-0 text-sm font-medium mt-1 outline-none cursor-pointer"
              >
                <option value="" disabled>Where are you going?</option>
                <option value="Maldives">Maldives</option>
                <option value="Swiss Alps">Swiss Alps</option>
                <option value="New York">New York</option>
                <option value="Costa Rica">Costa Rica</option>
                <option value="Greece">Greece</option>
                <option value="Kyoto">Kyoto, Japan</option>
                <option value="Mumbai">Mumbai, India</option>
                <option value="Paris">Paris, France</option>
                <option value="Dubai">Dubai, UAE</option>
                <option value="Sydney">Sydney, Australia</option>
                <option value="Bali">Bali, Indonesia</option>
                <option value="London">London, UK</option>
              </select>
            </div>
          </div>
        </div>

        {/* Date Input */}
        <div className="flex-1 w-full relative">
          <div className="flex items-center border border-gray-200 rounded-2xl px-4 py-3 hover:border-blue-400 transition-colors focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
            <Calendar className="text-gray-400 h-5 w-5 mr-3 flex-shrink-0" />
            <div className="flex flex-col flex-1">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Dates</span>
              <input 
                type="date"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                className="w-full bg-transparent border-none p-0 text-gray-900 placeholder-gray-400 focus:ring-0 text-sm font-medium mt-1 outline-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Category/Guests Input */}
        <div className="flex-1 w-full relative">
          <div className="flex items-center border border-gray-200 rounded-2xl px-4 py-3 hover:border-blue-400 transition-colors focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
            <Users className="text-gray-400 h-5 w-5 mr-3 flex-shrink-0" />
            <div className="flex flex-col flex-1">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Category / Guests</span>
              <select className="w-full bg-transparent border-none p-0 text-gray-900 focus:ring-0 text-sm font-medium mt-1 outline-none cursor-pointer">
                <option value="hotel">Hotels (2 Adults)</option>
                <option value="resort">Resorts</option>
                <option value="villa">Villas</option>
                <option value="apartment">Apartments</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <button 
          onClick={handleSearch}
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white p-4 h-full rounded-2xl flex items-center justify-center transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 mt-4 md:mt-0"
        >
          <Search className="h-6 w-6" />
          <span className="md:hidden ml-2 font-bold">Search</span>
        </button>

      </div>
    </div>
  );
};

export default SearchSection;
