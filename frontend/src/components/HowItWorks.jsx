import React from 'react';
import { Search, MapPin, CalendarCheck, Map } from 'lucide-react';

const steps = [
  {
    icon: <Search className="w-8 h-8 text-blue-600" />,
    title: "1. Search Properties",
    description: "Enter your destination and dates to find the perfect stay."
  },
  {
    icon: <MapPin className="w-8 h-8 text-blue-600" />,
    title: "2. Choose Location",
    description: "Compare prices, read reviews, and select your favorite spot."
  },
  {
    icon: <CalendarCheck className="w-8 h-8 text-blue-600" />,
    title: "3. Book & Pay",
    description: "Secure your reservation with our fast and safe payment system."
  },
  {
    icon: <Map className="w-8 h-8 text-blue-600" />,
    title: "4. Enjoy Your Trip",
    description: "Pack your bags and get ready for an unforgettable experience."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">How It Works</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-16">Booking your next vacation is easier than ever. Follow these simple steps and you'll be on your way.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-blue-100 z-0"></div>

          {steps.map((step, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 shadow-sm border-4 border-white group hover:scale-110 hover:bg-blue-100 transition-all duration-300">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed max-w-xs">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
