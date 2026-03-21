import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HotelCard from '../components/HotelCard';
import { Search, MapPin, DollarSign, Calendar } from 'lucide-react';

const allHotels = [
  { id: 1, name: "Oceanview Villa Retreat", location: "Maldives", price: 4500, starRating: 4.9, available: true, imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop" },
  { id: 2, name: "Alpine Mountain Chalet", location: "Swiss Alps", price: 3200, starRating: 4.8, available: true, imageUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop" },
  { id: 3, name: "Luxury City Penthouse", location: "New York, USA", price: 3600, starRating: 4.9, available: false, imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop" },
  { id: 4, name: "Eco Jungle Treehouse", location: "Costa Rica", price: 2100, starRating: 4.7, available: true, imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2070&auto=format&fit=crop" },
  { id: 5, name: "Santorini Cliff Suite", location: "Greece", price: 1550, starRating: 5.0, available: true, imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop" },
  { id: 6, name: "Kyoto Traditional Ryokan", location: "Kyoto, Japan", price: 3800, starRating: 4.9, available: false, imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop" },
  { id: 7, name: "Taj Mahal Palace View", location: "Mumbai, India", price: 2500, starRating: 4.8, available: true, imageUrl: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974&auto=format&fit=crop" },
  { id: 8, name: "Parisian Boutique Hotel", location: "Paris, France", price: 4200, starRating: 4.7, available: true, imageUrl: "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?q=80&w=2070&auto=format&fit=crop" },
  { id: 9, name: "Dubai Desert Resort", location: "Dubai, UAE", price: 2800, starRating: 5.0, available: true, imageUrl: "https://images.unsplash.com/photo-1580237072617-771c3ecc4a24?q=80&w=2069&auto=format&fit=crop" },
  { id: 10, name: "Sydney Harbour Suites", location: "Sydney, Australia", price: 3500, starRating: 4.6, available: true, imageUrl: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop" },
  { id: 11, name: "Bali Tropical Resort", location: "Bali, Indonesia", price: 1800, starRating: 4.5, available: false, imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop" },
  { id: 12, name: "London Historic Inn", location: "London, UK", price: 2900, starRating: 4.4, available: true, imageUrl: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2070&auto=format&fit=crop" }
];

const BookingsList = () => {
  const routerLocation = useLocation();
  const [locationFilter, setLocationFilter] = useState('');
  const [maxPrice, setMaxPrice] = useState(10000);
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(routerLocation.search);
    const initialLocation = searchParams.get('location');
    if (initialLocation) {
      setLocationFilter(initialLocation);
    }
  }, [routerLocation.search]);

  const pricePercentage = ((maxPrice - 1000) / 9000) * 100;

  const filteredHotels = allHotels.filter(hotel => {
    const matchesLocation = hotel.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesPrice = hotel.price <= maxPrice;
    const matchesAvailability = onlyAvailable ? hotel.available : true;
    return matchesLocation && matchesPrice && matchesAvailability;
  });

  return (
    <div className="pt-24 pb-16 bg-gray-50 flex-grow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">Available Properties</h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 md:mx-0 mx-auto">Discover and book from our hand-picked selection of premium stays across the world.</p>
        </div>

        {/* Filters Section */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-10 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center"><Search className="w-5 h-5 mr-2 text-blue-600"/> Filter Your Search</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center"><MapPin className="w-4 h-4 mr-1 text-gray-500"/> Location</label>
              <input 
                type="text" 
                list="city-recommendations"
                placeholder="Search country or city..." 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              />
              <datalist id="city-recommendations">
                <option value="New York" />
                <option value="Paris" />
                <option value="London" />
                <option value="Tokyo" />
                <option value="Dubai" />
                <option value="Sydney" />
                <option value="Mumbai" />
                <option value="Bali" />
                <option value="Rome" />
                <option value="Singapore" />
              </datalist>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center"><DollarSign className="w-4 h-4 mr-1 text-gray-500"/> Max Price: ₹{maxPrice}</label>
              <input 
                type="range" 
                min="1000" 
                max="10000" 
                step="500"
                className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-4"
                style={{ background: `linear-gradient(to right, #2563eb ${pricePercentage}%, #e5e7eb ${pricePercentage}%)` }}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>₹1000</span>
                <span>₹10000+</span>
              </div>
            </div>

            {/* Availability Filter */}
            <div className="flex flex-col justify-center">
              <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center"><Calendar className="w-4 h-4 mr-1 text-gray-500"/> Availability</label>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setOnlyAvailable(!onlyAvailable)}
                  className={`relative inline-flex items-center justify-center w-16 h-8 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${onlyAvailable ? 'bg-blue-600' : 'bg-gray-300'}`}
                >
                  <span className={`absolute left-2 text-[10px] tracking-wider font-bold text-white transition-opacity ${onlyAvailable ? 'opacity-100' : 'opacity-0'}`}>ON</span>
                  <span className={`absolute right-1.5 text-[10px] tracking-wider font-bold text-gray-600 transition-opacity ${onlyAvailable ? 'opacity-0' : 'opacity-100'}`}>OFF</span>
                  <span className={`absolute inline-block w-6 h-6 bg-white rounded-full transition-transform shadow-md transform ${onlyAvailable ? 'translate-x-3.5' : '-translate-x-4'}`} />
                </button>
                <span className="text-sm font-medium text-gray-700">Available Only</span>
              </div>
            </div>

          </div>
        </div>

        {/* Results */}
        <div className="mb-6 flex justify-between items-center text-sm text-gray-500">
          <span>Showing {filteredHotels.length} properties</span>
        </div>

        {filteredHotels.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHotels.map(hotel => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters to see more results.</p>
            <button 
              onClick={() => { setLocationFilter(''); setMaxPrice(10000); setOnlyAvailable(false); }}
              className="mt-2 text-blue-600 font-bold hover:text-blue-800 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsList;
