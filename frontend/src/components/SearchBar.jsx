import React, { useState } from 'react';

const SearchBar = () => {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", { location, checkIn, checkOut, guests });
    // In a real app, this would navigate to search results or fetch from API
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-4 max-w-4xl mx-auto transform -translate-y-1/2">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full text-left">
          <label className="block text-sm font-medium text-gray-700 mb-1">CITY / PROPERTY</label>
          <input 
            type="text" 
            placeholder="Where are you going?"
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 block sm:text-lg border p-3 text-black"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        
        <div className="flex-1 w-full text-left">
          <label className="block text-sm font-medium text-gray-700 mb-1">CHECK-IN</label>
          <input 
            type="date" 
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 block sm:text-lg border p-3 text-black"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            required
          />
        </div>

        <div className="flex-1 w-full text-left">
          <label className="block text-sm font-medium text-gray-700 mb-1">CHECK-OUT</label>
          <input 
            type="date" 
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 block sm:text-lg border p-3 text-black"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            required
          />
        </div>

        <div className="w-full md:w-32 text-left">
          <label className="block text-sm font-medium text-gray-700 mb-1">GUESTS</label>
          <input 
            type="number" 
            min="1"
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 block sm:text-lg border p-3 text-black"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
        </div>

        <div className="w-full md:w-auto">
          <button 
            type="submit"
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-8 rounded-md text-lg h-[54px]"
          >
            SEARCH
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
