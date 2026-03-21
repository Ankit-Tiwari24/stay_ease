import React from 'react';
import { Link } from 'react-router-dom';

const HotelCard = ({ hotel }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl flex flex-col">
      <img 
        className="h-48 w-full object-cover" 
        src={hotel.imageUrl} 
        alt={hotel.name} 
      />
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{hotel.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{hotel.location}</p>
          </div>
          <div className="flex items-center bg-blue-100 px-2 py-1 rounded text-blue-700 text-sm font-bold">
            {hotel.starRating} ★
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">₹{hotel.price}</span>
            <span className="text-sm text-gray-500"> / night</span>
          </div>
          <Link 
            to={`/book/${hotel.id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
