import React, { useState, useEffect, useCallback } from 'react';
import { 
  Users, Hotel, CalendarCheck, 
  MessageSquare, Banknote, 
  ArrowRight, Loader2, AlertCircle, RefreshCcw 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { adminService } from '../services/adminService';

const StatCard = ({ title, value, icon: Icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="bg-white p-7 rounded-3xl shadow-sm border border-gray-100 group hover:scale-[1.02] transition-all"
  >
    <div className="flex items-start justify-between">
      <div className="space-y-4 flex-1">
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest leading-none">{title}</p>
        <h3 className="text-4xl font-extrabold text-gray-900 leading-none">{value}</h3>
      </div>
      <div className={`p-4 rounded-2xl ${color} bg-opacity-10 ${color.replace('bg-', 'text-')}`}>
        <Icon size={30} strokeWidth={2.5} />
      </div>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    else setRefreshing(true);
    
    try {
      const data = await adminService.getStats();
      setStats(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
      <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Aggregating Statistics...</p>
    </div>
  );

  if (error) return (
    <div className="bg-red-50 border border-red-200 p-8 rounded-3xl text-center text-red-600 max-w-md mx-auto my-12 shadow-2xl">
      <AlertCircle className="mx-auto mb-4" size={48} />
      <h2 className="text-2xl font-extrabold mb-2">Analytics Error</h2>
      <p className="text-red-500 font-medium mb-6">{error}</p>
      <button onClick={() => fetchStats()} className="bg-red-600 text-white font-bold py-3 px-8 rounded-2xl">Retry</button>
    </div>
  );

  return (
    <div className="space-y-10 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Dashboard Overview</h2>
          <p className="text-gray-500 text-lg font-medium">Welcome to the StayEase control center.</p>
        </div>
        <button 
          onClick={() => fetchStats(true)}
          className={`p-3 bg-white rounded-2xl shadow-sm border border-gray-100 ${refreshing ? 'animate-spin' : ''}`}
        >
          <RefreshCcw size={22} className="text-blue-600" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <StatCard title="Total Users" value={stats.total_users} icon={Users} color="bg-blue-600" delay={0.1} />
        <StatCard title="Bookings" value={stats.total_bookings} icon={CalendarCheck} color="bg-indigo-600" delay={0.2} />
        <StatCard title="Hotels" value={stats.total_hotels} icon={Hotel} color="bg-violet-600" delay={0.3} />
        <StatCard title="Reviews" value={stats.total_reviews} icon={MessageSquare} color="bg-pink-600" delay={0.4} />
        <StatCard title="Revenue" value={`₹${stats.revenue}`} icon={Banknote} color="bg-emerald-600" delay={0.5} />
      </div>

      <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 flex items-center justify-between border-b border-gray-50">
           <h3 className="text-2xl font-extrabold text-gray-900">Recent Bookings</h3>
           <Link to="/admin/bookings" className="text-blue-600 font-extrabold flex items-center gap-2">
             View All <ArrowRight size={18} />
           </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-4 text-xs font-extrabold text-gray-400 uppercase">ID</th>
                <th className="px-8 py-4 text-xs font-extrabold text-gray-400 uppercase">HOTEL</th>
                <th className="px-8 py-4 text-xs font-extrabold text-gray-400 uppercase text-center">STATUS</th>
                <th className="px-8 py-4 text-xs font-extrabold text-gray-400 uppercase text-right">DATE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {stats.recent_activity.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-8 py-5 text-sm font-bold text-gray-900">#{booking.id}</td>
                  <td className="px-8 py-5 text-sm font-bold text-gray-900">{booking.hotel_details?.name}</td>
                  <td className="px-8 py-5 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-sm text-gray-400 text-right">
                    {new Date(booking.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
