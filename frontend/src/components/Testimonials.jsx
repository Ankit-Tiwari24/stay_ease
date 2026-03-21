import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Travel Blogger",
    image: "https://images.unsplash.com/photo-1615813967515-e1838c1c5116?q=80&w=1974&auto=format&fit=crop",
    text: "The booking process was incredibly smooth. I found the perfect villa in Bali within minutes. Highly recommend this platform for any avid traveler!",
    rating: 5
  },
  {
    id: 2,
    name: "Rahul Patel",
    role: "Business Traveler",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
    text: "As someone who travels for work constantly, I appreciate the clean interface and fast checkout. The rewards program is just the cherry on top.",
    rating: 5
  },
  {
    id: 3,
    name: "Vikram Singh",
    role: "Family Vacationer",
    image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=2070&auto=format&fit=crop",
    text: "We booked our family trip to Goa through here. The search filters helped us find exactly what we needed: kid-friendly, pool, and near the beach.",
    rating: 4
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">What Our Users Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Don't just take our word for it. Here are stories from our community of travelers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow relative">
              <Quote className="absolute top-6 right-6 w-8 h-8 text-blue-100" />
              
              <div className="flex text-yellow-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'fill-current' : 'text-gray-300'}`} />
                ))}
              </div>
              
              <p className="text-gray-700 italic mb-6 relative z-10 leading-relaxed">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center mt-auto">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
