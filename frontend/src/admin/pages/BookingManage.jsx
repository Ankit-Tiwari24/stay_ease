import React, { useState, useEffect } from 'react';
import { 
  CalendarCheck, Calendar, User, 
  ChevronDown, 
  Loader2, BadgeIndianRupee 
} from 'lucide-react';
import { adminService } from '../services/adminService';

const BookingManage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const data = await adminService.getBookings();
      setBookings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await adminService.updateBookingStatus(id, newStatus);
      setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
    } catch (err) {
      alert('Error updating status');
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
      <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-4">Synchronizing Booking Ledger...</p>
    </div>
  );

  return (
    <div className="space-y-10 pb-20">
      <div>
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight text-center md:text-left">Reservation Control</h2>
        <p className="text-gray-500 text-lg font-medium text-center md:text-left">Monitor and process global StayEase travel reservations.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {bookings.map((b) => (
          <div key={b.id} className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-10 hover:shadow-xl transition-all border-l-8 border-l-blue-600">
             
             {/* Left: Metadata */}
             <div className="flex-1 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 shrink-0">
                   <CalendarCheck size={40} />
                </div>
                <div className="space-y-3">
                   <p className="text-xs text-gray-400 font-black uppercase tracking-widest">Reservation #{b.id.toString().padStart(6, '0')}</p>
                   <h3 className="text-2xl font-black text-gray-900 tracking-tight">{b.hotel_details?.name}</h3>
                   <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                      <span className="flex items-center gap-1.5"><User size={14} className="text-blue-500" /> Guest: {b.user_details?.username} (#{b.user})</span>
                      <span className="flex items-center gap-1.5"><Calendar size={14} className="text-blue-500" /> {new Date(b.check_in).toLocaleDateString()} — {new Date(b.check_out).toLocaleDateString()}</span>
                   </div>
                </div>
             </div>

             {/* Right: Actions & Status */}
             <div className="flex items-center justify-center lg:justify-end gap-10 lg:pl-10 lg:border-l border-gray-100 min-w-80">
                <div className="text-center md:text-right space-y-2">
                   <p className="text-xs font-black uppercase tracking-widest text-gray-400">Total Settlement</p>
                   <div className="flex items-center justify-center md:justify-end gap-1 text-2xl font-black text-gray-900">
                      <BadgeIndianRupee size={24} className="text-blue-600" />
                      {b.total_price}
                   </div>
                </div>
                
                <div className="relative group">
                   <select 
                     value={b.status} 
                     onChange={(e) => handleStatusChange(b.id, e.target.value)}
                     className={`appearance-none font-black text-[10px] uppercase tracking-widest px-6 py-4 rounded-2xl cursor-pointer pr-12 transition-all outline-none border-2 ${
                       b.status === 'Confirmed' 
                       ? 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200' 
                       : 'bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200'
                     }`}
                   >
                     <option value="Pending">Pending Audit</option>
                     <option value="Confirmed">Mark Confirmed</option>
                     <option value="Cancelled">Cancel Reservation</option>
                   </select>
                   <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" size={16} />
                </div>
             </div>

          </div>
        ))}
        {bookings.length === 0 && (
           <div className="p-20 text-center space-y-6 bg-white rounded-[40px] border-2 border-dashed border-gray-200">
              <div className="w-24 h-24 bg-gray-50 mx-auto rounded-3xl flex items-center justify-center text-gray-200">
                 <CalendarCheck size={48} />
              </div>
              <p className="text-gray-400 font-black uppercase tracking-widest text-sm">No reservations found in database</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default BookingManage;
