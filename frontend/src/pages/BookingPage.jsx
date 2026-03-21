import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CreditCard, Lock, CheckCircle } from 'lucide-react';

const BookingPage = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState('booking'); // 'booking' | 'payment' | 'success'
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    checkIn: '',
    checkOut: '',
  });

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      alert("You must be logged in to make a booking.");
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/bookings/process_booking/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
          hotel_name: `Premium Property (ID: ${hotelId})`,
          check_in: formData.checkIn,
          check_out: formData.checkOut,
          email: formData.email
        })
      });

      if (!response.ok) {
        throw new Error('Payment processing failed. Please try again.');
      }

      // Save to local storage
      const newBooking = {
        id: Date.now(),
        hotelName: `Premium Property (ID: ${hotelId})`,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        email: formData.email,
        dateBooked: new Date().toISOString()
      };
      
      const existingBookings = JSON.parse(localStorage.getItem('my_bookings') || '[]');
      existingBookings.push(newBooking);
      localStorage.setItem('my_bookings', JSON.stringify(existingBookings));

      setStep('success');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Progress Bar */}
        <div className="mb-8 flex justify-center">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-white ${step === 'booking' || step === 'payment' || step === 'success' ? 'bg-blue-600' : 'bg-gray-300'}`}>1</div>
            <div className={`w-16 h-1 ${step === 'payment' || step === 'success' ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-white ${step === 'payment' || step === 'success' ? 'bg-blue-600' : 'bg-gray-300'}`}>2</div>
            <div className={`w-16 h-1 ${step === 'success' ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-white ${step === 'success' ? 'bg-blue-600' : 'bg-gray-300'}`}>3</div>
          </div>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
          
          {step === 'booking' && (
            <div className="px-8 py-10">
              <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
                Confirm Arrival Details
              </h2>
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" name="name" required className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3 border" value={formData.name} onChange={handleChange} />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input type="email" name="email" required className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3 border" value={formData.email} onChange={handleChange} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Check-in Date</label>
                    <input type="date" name="checkIn" required className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3 border cursor-pointer" value={formData.checkIn} onChange={handleChange} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Check-out Date</label>
                    <input type="date" name="checkOut" required className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3 border cursor-pointer" value={formData.checkOut} onChange={handleChange} />
                  </div>
                </div>

                <div className="pt-6">
                  <button type="submit" className="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                    Proceed to Payment
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 'payment' && (
            <div className="px-8 py-10">
              <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4 flex items-center justify-center">
                <CreditCard className="mr-3 text-blue-600 w-8 h-8" /> Secure Payment
              </h2>
              <p className="text-center text-gray-500 mb-8 max-w-md mx-auto">Please enter your payment details below. Your transaction is securely encrypted and processed directly by our banking partner.</p>
              
              <form onSubmit={handlePaymentSubmit} className="space-y-6 max-w-lg mx-auto bg-gray-50 p-8 rounded-xl border border-gray-200">
                <div>
                  <label className="block text-sm font-bold text-gray-700">Cardholder Name</label>
                  <input type="text" required placeholder="John Doe" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3 border" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700">Card Number</label>
                  <input type="text" required placeholder="0000 0000 0000 0000" maxLength="19" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3 border tracking-widest text-lg font-mono" />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700">Expiry Date</label>
                    <input type="text" required placeholder="MM/YY" maxLength="5" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3 border text-center" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700">CVC</label>
                    <input type="password" required placeholder="123" maxLength="3" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3 border text-center tracking-widest" />
                  </div>
                </div>

                <div className="pt-6">
                  <button type="submit" disabled={loading} className="w-full flex items-center justify-center py-4 px-4 border border-transparent rounded-lg shadow-lg text-sm font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors disabled:opacity-50">
                    {loading ? 'Processing...' : <><Lock className="w-4 h-4 mr-2" /> Pay and Confirm Booking</>}
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 'success' && (
            <div className="px-8 py-16 text-center">
              <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Payment Successful!</h2>
              <p className="text-xl text-gray-600 max-w-lg mx-auto mb-10">Your booking has been fully confirmed. We've instantly dispatched an email containing your hotel details and a complimentary welcome gift note!</p>
              <button onClick={() => navigate('/booking')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-md transition-all">
                Return to Bookings
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default BookingPage;
