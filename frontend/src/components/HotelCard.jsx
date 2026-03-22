import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, ArrowRight } from 'lucide-react';

const HotelCard = ({ hotel }) => {
  return (
    <div className="bg-white rounded-[32px] overflow-hidden shadow-2xl shadow-gray-200/50 hover:shadow-blue-200/40 transition-all duration-700 group flex flex-col border border-gray-100 hover:-translate-y-2 relative h-full">
      <Link to={`/hotel/${hotel.id}`} className="relative aspect-[16/11] overflow-hidden block">
        <img 
          src={hotel.imageUrl} 
          alt={hotel.name} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center shadow-lg border border-white/20">
          <Star className="w-3.5 h-3.5 text-yellow-500 fill-current" />
          <span className="ml-1.5 text-xs font-black text-gray-900">{hotel.starRating}</span>
        </div>
      </Link>
      
      <div className="p-7 flex flex-col flex-1">
        <div className="flex items-center text-[10px] font-black text-gray-300 mb-3 uppercase tracking-widest leading-none">
          <MapPin className="w-3.5 h-3.5 mr-1.5 text-blue-500" strokeWidth={2.5} />
          {hotel.location}
        </div>
        <Link to={`/hotel/${hotel.id}`}>
          <h3 className="text-xl font-extrabold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1 leading-tight tracking-tight uppercase">{hotel.name}</h3>
        </Link>
        <p className="text-gray-400 text-xs font-bold mb-6">{hotel.reviews_count || 0} Professional Reviews</p>
        
        <div className="mt-auto pt-6 flex items-center justify-between border-t border-gray-50">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1">Starting from</span>
            <div className="text-2xl font-black text-gray-900 tracking-tighter">
              ₹{hotel.price} <span className="text-[10px] font-bold text-gray-400 tracking-normal ml-0.5">/ night</span>
            </div>
          </div>
          <Link 
            to={`/book/${hotel.id}`}
            className="w-11 h-11 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 hover:scale-110 active:scale-95 transition-all transform group-hover:rotate-[360deg] duration-700"
          >
            <ArrowRight size={20} strokeWidth={3} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
