import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Plane, User, LogOut, Settings, ChevronDown, Briefcase } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const isLoggedIn = !!localStorage.getItem('access_token');

  useEffect(() => {
    if (isLoggedIn) {
      fetch('http://127.0.0.1:8000/api/auth/profile/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(() => setUser(null));
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/';
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Bookings', path: '/booking' },
    { name: 'Contact', path: '/contact' }
  ];

  const getLinkClass = (isActive) =>
    isActive
      ? "text-blue-600 font-bold transition-colors"
      : "text-gray-600 hover:text-blue-600 font-medium transition-colors";

  const getMobileLinkClass = (isActive) =>
    isActive
      ? "block px-3 py-2 text-base font-bold text-blue-600 bg-blue-50 rounded-md"
      : "block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md";

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-primary-600 hover:opacity-80 transition-opacity">
            <Plane className="h-8 w-8 text-blue-600" />
            <span className="font-bold text-2xl tracking-tighter text-gray-900">Stay<span className="text-blue-600">Ease</span></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => getLinkClass(isActive)}
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop Auth/User Area */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link to="/my-bookings" className="text-gray-500 hover:text-blue-600 transition-colors" title="My Bookings">
                  <Briefcase className="h-6 w-6 drop-shadow-sm" />
                </Link>
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-white overflow-hidden shadow-inner border border-white">
                    {user?.profile_picture ? (
                      <img src={`http://127.0.0.1:8000${user.profile_picture}`} alt="Profile" className="h-full w-full object-cover" />
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                  </div>
                  <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in duration-200">
                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                      <p className="text-xs text-gray-400 font-medium">Signed in as</p>
                      <p className="text-sm font-bold text-gray-900 truncate">{user?.username}</p>
                    </div>
                    <Link 
                      to="/profile" 
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <Settings className="h-4 w-4" />
                      View Profile
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors mt-1"
                    >
                      <LogOut className="h-4 w-4" />
                      Log Out
                    </button>
                  </div>
                )}
              </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-gray-900 font-medium hover:text-blue-600 transition-colors px-4 py-2">
                  Log In
                </Link>
                <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-md p-1"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full left-0">
          <div className="px-4 pt-4 pb-6 space-y-3">
            {isLoggedIn && (
              <div className="flex items-center gap-3 px-3 py-2 bg-blue-50 rounded-xl mb-4">
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white overflow-hidden">
                  {user?.profile_picture ? (
                    <img src={`http://127.0.0.1:8000${user.profile_picture}`} alt="Profile" className="h-full w-full object-cover" />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-blue-900">{user?.first_name || user?.username}</p>
                  <p className="text-xs text-blue-600">Traveler</p>
                </div>
              </div>
            )}
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => getMobileLinkClass(isActive)}
              >
                {item.name}
              </NavLink>
            ))}
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
              {isLoggedIn ? (
                <>
                  <Link 
                    to="/my-bookings" 
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center justify-center gap-2 bg-gray-50 text-gray-700 px-4 py-2 rounded-full font-medium mb-2"
                  >
                    <Briefcase className="h-4 w-4" />
                    My Bookings
                  </Link>
                  <Link 
                    to="/profile" 
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center justify-center gap-2 bg-gray-50 text-gray-700 px-4 py-2 rounded-full font-medium"
                  >
                    <User className="h-4 w-4" />
                    Profile Settings
                  </Link>
                  <button onClick={handleLogout} className="w-full text-center bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-full font-medium block transition-colors hover:bg-red-100">
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)} className="w-full text-center text-gray-900 font-medium border border-gray-200 px-4 py-2 rounded-full block">
                    Log In
                  </Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)} className="w-full text-center bg-blue-600 text-white px-4 py-2 rounded-full font-medium shadow-sm block">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
