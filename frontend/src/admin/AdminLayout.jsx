import React from 'react';
import useAdmin from '../hooks/useAdmin';
import AdminSidebar from './components/AdminSidebar';
import { Outlet } from 'react-router-dom';
import { Loader2, LogIn, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLayout = () => {
  const { isAdmin, loading } = useAdmin();


  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white gap-4">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        >
          <Loader2 className="h-10 w-10 text-blue-500" />
        </motion.div>
        <p className="text-gray-400 font-medium animate-pulse">Authenticating Admin Session...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
        <motion.div
           initial={{ scale: 0.9, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="bg-white p-12 rounded-3xl shadow-2xl border border-gray-100 max-w-md w-full ring-1 ring-gray-900/5 group"
        >
          <div className="w-20 h-20 bg-red-100/50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-red-600 transition-transform group-hover:scale-110">
            <ShieldAlert size={40} strokeWidth={2.5} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            This high-security portal is exclusive to StayEase staff. Your account does not have the necessary privileges.
          </p>
          <div className="space-y-3">
            <a 
              href="/login" 
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all transform active:scale-95"
            >
              <LogIn size={20} />
              Switch to Staff Account
            </a>
            <a 
              href="/" 
              className="w-full flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold py-4 rounded-2xl transition-all"
            >
              Back to Marketplace
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar - Fixed Width */}
      <AdminSidebar />
      
      {/* Main Content Area - Push right by sidebar width */}
      <main className="flex-1 ml-64 min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
