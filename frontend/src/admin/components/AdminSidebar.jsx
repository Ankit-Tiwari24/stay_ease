import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Hotel, 
  CalendarCheck, MessageSquare, 
  ArrowLeft, LogOut, Plane 
} from 'lucide-react';

const AdminSidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'Users', icon: Users, path: '/admin/users' },
    { name: 'Hotels', icon: Hotel, path: '/admin/hotels' },
    { name: 'Bookings', icon: CalendarCheck, path: '/admin/bookings' },
    { name: 'Contacts', icon: MessageSquare, path: '/admin/contacts' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login';
  };

  return (
    <div className="w-64 bg-gray-900 min-h-screen text-white flex flex-col fixed left-0 top-0 z-50">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-800 flex items-center gap-3">
        <Plane className="h-8 w-8 text-blue-500" />
        <span className="font-bold text-xl tracking-tighter text-white">StayEase <span className="text-blue-500 font-extrabold text-xs ml-1 px-2 py-0.5 bg-blue-500/10 rounded-full">ADMIN</span></span>
      </div>

      {/* Primary Navigation */}
      <nav className="flex-grow py-8 px-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
              ${isActive 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' 
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
            `}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-6 border-t border-gray-800 space-y-4">
        <Link 
          to="/" 
          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors group"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium">Log out</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
