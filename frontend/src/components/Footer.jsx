import React from 'react';
import { Plane, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Info */}
          <div className="flex flex-col space-y-4">
            <Link to="/" className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity mb-2">
              <Plane className="h-8 w-8 text-blue-500" />
              <span className="font-bold text-2xl tracking-tighter">Stay<span className="text-blue-500">Ease</span></span>
            </Link>
            <p className="text-gray-400 leading-relaxed text-sm">
              Your ultimate platform for discovering and booking the world's most spectacular accommodations and experiences.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors text-white">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-400 transition-colors text-white">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition-colors text-white">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-700 transition-colors text-white">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wider uppercase text-sm">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-blue-500 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-blue-500 transition-colors">About Us</Link></li>
              <li><Link to="/destinations" className="hover:text-blue-500 transition-colors">Popular Destinations</Link></li>
              <li><Link to="/blog" className="hover:text-blue-500 transition-colors">Travel Blog</Link></li>
              <li><Link to="/contact" className="hover:text-blue-500 transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wider uppercase text-sm">Legal & Support</h4>
            <ul className="space-y-3">
              <li><Link to="/faq" className="hover:text-blue-500 transition-colors">FAQ</Link></li>
              <li><Link to="/terms" className="hover:text-blue-500 transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-blue-500 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/refund" className="hover:text-blue-500 transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wider uppercase text-sm">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-sm">123 Booking Avenue, Suite 400<br/>San Francisco, CA 94107</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                <span className="text-sm">support@stayease.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} StayEase Interactive. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
            <span className="text-gray-500 hover:text-white cursor-pointer transition-colors">English (US)</span>
            <span className="text-gray-500 hover:text-white cursor-pointer transition-colors">INR (₹)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
