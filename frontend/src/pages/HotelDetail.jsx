import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Calendar, ShieldCheck, ArrowLeft, Loader2, MessageSquare, Send } from 'lucide-react';

const HotelDetail = () => {
    const { id } = useParams();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reviewComment, setReviewComment] = useState('');
    const [reviewRating, setReviewRating] = useState(5);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchHotel = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/hotels/${id}/`);
                const data = await response.json();
                setHotel(data);
            } catch (error) {
                console.error('Error fetching hotel details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchHotel();
    }, [id]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access_token');
        if (!token) {
            alert('Please login to leave a review');
            return;
        }

        setSubmitting(true);
        try {
            const response = await fetch('http://127.0.0.1:8000/api/reviews/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    hotel: id,
                    rating: reviewRating,
                    comment: reviewComment
                })
            });

            if (response.ok) {
                setReviewComment('');
                setReviewRating(5);
                // Refresh hotel data to show new review
                const updated = await fetch(`http://127.0.0.1:8000/api/hotels/${id}/`).then(res => res.json());
                setHotel(updated);
            }
        } catch (error) {
            console.error('Error submitting review:', error);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-white">
            <Loader2 className="h-12 w-12 text-blue-600 animate-spin" strokeWidth={1.5} />
            <p className="text-gray-400 font-extrabold uppercase tracking-[0.3em] text-[10px]">Preparing Luxury Experience...</p>
        </div>
    );

    if (!hotel) return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-gray-500 font-bold uppercase tracking-widest">Hotel Not Found</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-white pb-32">
            {/* Elegant Hero / Photo Header */}
            <div className="relative h-[65vh] w-full overflow-hidden">
                <img 
                    src={hotel.image ? (hotel.image.startsWith('http') ? hotel.image : `http://127.0.0.1:8000${hotel.image}`) : "/default-hotel.jpg"} 
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
                
                {/* Float Action: Back Button */}
                <Link to="/booking" className="absolute top-10 left-10 p-4 bg-white/20 backdrop-blur-xl rounded-2xl hover:bg-white/40 transition-all border border-white/30 text-white shadow-2xl">
                    <ArrowLeft size={24} strokeWidth={3} />
                </Link>
            </div>

            {/* Content Container */}
            <div className="max-w-6xl mx-auto px-6 -mt-32 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* Left Column: Info & Reviews */}
                    <div className="lg:col-span-8 space-y-12">
                        <div className="bg-white/80 backdrop-blur-3xl p-10 rounded-[48px] shadow-2xl shadow-gray-200/50 border border-white">
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                <div className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
                                   Premium Property
                                </div>
                                <div className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-2">
                                   <ShieldCheck size={14} /> Verified Listing
                                </div>
                            </div>

                            <h1 className="text-5xl font-black text-gray-900 tracking-tighter leading-none mb-4 uppercase">{hotel.name}</h1>
                            
                            <div className="flex items-center text-gray-400 font-bold gap-6 mb-8 uppercase tracking-widest text-xs">
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} className="text-blue-500" strokeWidth={3} />
                                    {hotel.location}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star size={16} className="text-yellow-500 fill-current" />
                                    {hotel.star_rating} Rating
                                </div>
                            </div>

                            <p className="text-gray-500 text-lg leading-relaxed font-medium">
                                {hotel.description || "Indulge in unparalleled luxury at this world-class property. Designed for the discerning traveler, it offers a seamless blend of modern sophistication and timeless elegance, ensuring every moment of your stay is nothing short of extraordinary."}
                            </p>
                        </div>

                        {/* Reviews Section */}
                        <div className="space-y-8 px-4">
                            <h3 className="text-2xl font-black text-gray-900 flex items-center gap-4">
                                <div className="w-2 h-10 bg-blue-600 rounded-full" />
                                Guest Experiences ({hotel.reviews_count})
                            </h3>

                            {/* Add Review Form */}
                            <form onSubmit={handleReviewSubmit} className="bg-gray-50 p-8 rounded-[32px] border border-gray-100 space-y-6">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-bold text-gray-900 uppercase tracking-widest text-xs">Write your perspective</h4>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map(num => (
                                            <button 
                                                key={num}
                                                type="button"
                                                onClick={() => setReviewRating(num)}
                                                className={`p-1 transition-all ${num <= reviewRating ? 'text-yellow-500' : 'text-gray-300'}`}
                                            >
                                                <Star className={num <= reviewRating ? 'fill-current' : ''} size={20} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="relative">
                                    <textarea 
                                        value={reviewComment}
                                        onChange={(e) => setReviewComment(e.target.value)}
                                        placeholder="Share your thoughts about your stay..."
                                        className="w-full bg-white border-none rounded-2xl p-6 text-gray-900 placeholder-gray-300 focus:ring-4 focus:ring-blue-100 min-h-[120px] shadow-inner font-medium outline-none"
                                        required
                                    />
                                    <button 
                                        disabled={submitting}
                                        className="absolute bottom-4 right-4 bg-blue-600 text-white p-3 rounded-xl shadow-lg hover:bg-blue-700 transition-all disabled:opacity-50"
                                    >
                                        {submitting ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                                    </button>
                                </div>
                            </form>

                            {/* Review List */}
                            <div className="space-y-6">
                                {hotel.reviews?.map((review) => (
                                    <div key={review.id} className="bg-white p-8 rounded-[32px] shadow-xl shadow-gray-200/40 border border-gray-50">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-black text-xs uppercase">
                                                    {review.username[0]}
                                                </div>
                                                <div>
                                                    <p className="font-black text-gray-900 text-sm leading-none mb-1">{review.username}</p>
                                                    <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">Verified Traveler</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-yellow-500">
                                                <Star size={14} className="fill-current" />
                                                <span className="font-black text-xs text-gray-900 mt-0.5">{review.rating}.0</span>
                                            </div>
                                        </div>
                                        <p className="text-gray-500 font-medium leading-relaxed italic">"{review.comment}"</p>
                                        <p className="mt-4 text-[10px] text-gray-300 font-black uppercase tracking-widest">{new Date(review.created_at).toLocaleDateString()}</p>
                                    </div>
                                ))}
                                {hotel.reviews_count === 0 && (
                                    <div className="text-center py-20 bg-gray-50/50 rounded-[40px] border border-dashed border-gray-200">
                                        <MessageSquare size={40} className="mx-auto text-gray-200 mb-4" />
                                        <p className="text-gray-300 font-black uppercase tracking-[0.2em] text-[10px]">Be the first to leave a review</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Pricing & Booking Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-32 bg-gray-900 p-10 rounded-[48px] shadow-2xl text-white space-y-8 overflow-hidden">
                            <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-blue-600 rounded-full blur-[80px] opacity-20" />
                            
                            <div className="relative">
                                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">Exclusively starting at</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-black tracking-tighter">₹{hotel.price}</span>
                                    <span className="text-sm font-bold text-gray-400 tracking-normal inline-block mb-1">/ night</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="p-5 bg-white/5 rounded-[24px] border border-white/10 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="text-blue-500" size={20} strokeWidth={2.5} />
                                        <div>
                                            <p className="text-[10px] font-black text-gray-500 uppercase leading-none mb-1">Check-in Availability</p>
                                            <p className="text-xs font-bold text-white uppercase tracking-widest">Select Dates</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5 bg-white/5 rounded-[24px] border border-white/10 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <ShieldCheck className="text-emerald-500" size={20} strokeWidth={2.5} />
                                        <div>
                                            <p className="text-[10px] font-black text-gray-500 uppercase leading-none mb-1">Cancellation Policy</p>
                                            <p className="text-xs font-bold text-white uppercase tracking-widest">Flexible</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Link 
                                to={`/book/${hotel.id}`}
                                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-black py-6 rounded-[24px] shadow-xl shadow-blue-500/20 transition-all active:scale-95 uppercase tracking-widest text-sm"
                            >
                                Secure Your Stay
                            </Link>
                            
                            <p className="text-center text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                Best Price Guaranteed • Safe & Secure
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HotelDetail;
