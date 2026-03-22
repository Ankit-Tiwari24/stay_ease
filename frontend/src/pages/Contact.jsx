import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = React.useState({ name: '', email: '', message: '' });
  const [status, setStatus] = React.useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Message Sent Successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send message.');
      }
    } catch (error) {
      setStatus('An error occurred.');
    }
  };

  return (
    <div className="pt-24 pb-16 bg-gray-50 flex-grow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">Contact Us</h2>
          <p className="mt-4 text-lg text-gray-600">We'd love to hear from you. Get in touch with our team.</p>
        </div>
        
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Contact Info */}
            <div className="bg-blue-600 p-10 text-white">
              <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
              <div className="space-y-8">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-blue-200 mr-4 mt-1 flex-shrink-0" />
                  <span className="leading-relaxed">123 Booking Avenue, Suite 400<br/>San Francisco, CA 94107</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-blue-200 mr-4 flex-shrink-0" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-blue-200 mr-4 flex-shrink-0" />
                  <span>support@stayease.com</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {status && (
                  <div className={`p-4 rounded-lg text-white font-bold ${status.includes('Successfully') ? 'bg-green-500' : status.includes('Sending') ? 'bg-blue-500' : 'bg-red-500'}`}>
                    {status}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Your Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Your Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea rows="4" name="message" value={formData.message} onChange={handleChange} required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors" placeholder="How can we help?"></textarea>
                </div>
                <button type="submit" disabled={status === 'Sending...'} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 disabled:opacity-50">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
