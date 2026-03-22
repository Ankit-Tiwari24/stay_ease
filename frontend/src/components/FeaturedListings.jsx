import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Loader2, Compass } from 'lucide-react';

const FeaturedListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/hotels/')
      .then(res => res.json())
      .then(data => {
        // Sort by star_rating and take first 4
        const featured = data
          .sort((a, b) => (b.star_rating || 0) - (a.star_rating || 0))
          .slice(0, 4);
        setListings(featured);
      })
      .catch(err => console.error("Error fetching featured listings:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="py-24 flex flex-col items-center justify-center gap-6 bg-white border-y border-gray-50">
      <div className="relative">
        <Loader2 className="h-14 w-14 text-blue-600 animate-spin" strokeWidth={1.5} />
        <div className="absolute inset-0 flex items-center justify-center">
           <Compass className="h-6 w-6 text-blue-400 opacity-50" />
        </div>
      </div>
      <p className="text-gray-400 font-extrabold uppercase tracking-[0.2em] text-[10px]">Curating Exclusive Hideaways...</p>
    </div>
  );

  return (
    <section className="py-24 bg-gray-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-blue-100/50 shadow-sm">
                <Compass size={14} strokeWidth={2.5} /> Expert Recommendations
             </div>
             <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter leading-none">Featured Stays</h2>
             <p className="text-gray-500 text-lg font-medium max-w-xl leading-relaxed">Experience hospitality at its finest with our highest-rated properties, manually vetted for excellence.</p>
          </div>
          <Link to="/booking" className="text-gray-400 hover:text-blue-600 font-black text-xs uppercase tracking-[0.25em] transition-all flex items-center gap-3 group bg-white px-8 py-4 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/40">
            View Archive 
            <span className="transform transition-transform group-hover:translate-x-1.5 duration-300">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {listings.map(listing => (
            <Link to={`/book/${listing.id}`} key={listing.id} className="bg-white rounded-[40px] overflow-hidden shadow-2xl shadow-gray-200/60 hover:shadow-blue-200/50 transition-all duration-700 group flex flex-col border border-gray-50 hover:-translate-y-3 relative">
              <div className="absolute top-6 left-6 z-10">
                 <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center shadow-lg border border-white/40">
                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                    <span className="ml-2 text-xs font-black text-gray-900">{listing.star_rating}</span>
                 </div>
              </div>
              
              <div className="relative aspect-[16/11] overflow-hidden">
                <img 
                  src={listing.image ? (listing.image.startsWith('http') ? listing.image : `http://127.0.0.1:8000${listing.image}`) : "/default-hotel.jpg"} 
                  alt={listing.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
              
              <div className="p-8 flex flex-col flex-1 relative">
                <div className="flex items-center text-[10px] font-black text-gray-300 mb-4 uppercase tracking-[0.2em]">
                  <MapPin className="w-3.5 h-3.5 mr-2 text-blue-500" strokeWidth={2.5} />
                  {listing.location}
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-5 group-hover:text-blue-600 transition-colors line-clamp-1 leading-tight tracking-tight">{listing.name}</h3>
                
                <div className="mt-auto pt-8 flex items-center justify-between border-t border-gray-50">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.15em] leading-none mb-1">Starting from</span>
                    <div className="text-2xl font-black text-gray-900 tracking-tighter">
                      ₹{listing.price} <span className="text-[10px] font-bold text-gray-400 tracking-normal ml-0.5">/ night</span>
                    </div>
                  </div>
                   <div className="w-12 h-12 bg-gray-50 text-gray-900 rounded-[20px] flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:rotate-45 shadow-sm">
                      <span className="text-2xl font-bold leading-none mt-[-2px]">→</span>
                   </div>
                </div>
              </div>
            </Link>
          ))}
          
          {listings.length === 0 && !loading && (
             <div className="col-span-full py-24 text-center bg-white rounded-[50px] border border-dashed border-gray-200 flex flex-col items-center justify-center gap-3">
                <Compass className="h-10 w-10 text-gray-200" />
                <p className="text-gray-300 font-black uppercase tracking-[0.3em] text-[10px]">Discoveries coming soon</p>
             </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
