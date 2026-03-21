import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';

const dummyListings = [
  {
    id: 1,
    title: "Oceanview Villa Retreat",
    location: "Maldives",
    price: "₹450 / night",
    rating: 4.9,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Alpine Mountain Chalet",
    location: "Swiss Alps",
    price: "₹320 / night",
    rating: 4.8,
    reviews: 95,
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Luxury City Penthouse",
    location: "New York City",
    price: "₹600 / night",
    rating: 4.9,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Eco Jungle Treehouse",
    location: "Costa Rica",
    price: "₹210 / night",
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2070&auto=format&fit=crop"
  }
];

const FeaturedListings = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Featured Destinations</h2>
            <p className="text-lg text-gray-600 max-w-2xl">Discover some of the most beautiful and highly-rated places manually picked for your perfect getaway.</p>
          </div>
          <Link to="/booking" className="hidden sm:block text-blue-600 font-semibold hover:text-blue-800 transition-colors group">
            View all properties 
            <span className="inline-block transform transition-transform group-hover:translate-x-1 ml-1">&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {dummyListings.map(listing => (
            <div key={listing.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100 flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={listing.image} 
                  alt={listing.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center shadow-sm">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="ml-1 text-sm font-bold text-gray-900">{listing.rating}</span>
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <MapPin className="w-4 h-4 mr-1 text-blue-500" />
                  {listing.location}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">{listing.title}</h3>
                
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100">
                  <div className="font-bold text-lg text-gray-900">
                    {listing.price.split(' ')[0]} <span className="text-sm font-normal text-gray-500">/ night</span>
                  </div>
                  <Link to={`/book/${listing.id}`} className="bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
