import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, Mail, Lock, LogIn } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const loginRequest = async (retries = 3) => {
    while (retries > 0) {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.email,
            password: formData.password
          }),
        });

        if (!response.ok) {
          let errMsg = 'Invalid email or password.';
          try {
            const errorData = await response.json();
            errMsg = errorData.detail || errorData.error || errMsg;
          } catch (e) {
            // Ignore if response is not JSON
          }
          throw new Error(errMsg);
        }

        return await response.json();
      } catch (err) {
        if (err.message === 'Failed to fetch' && retries > 1) {
          retries--;
          await new Promise(res => setTimeout(res, 1000));
        } else {
          throw err;
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await loginRequest();
      
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      
      // Force page reload to trigger root component / navbar state update
      window.location.href = '/';
    } catch (err) {
      if (err.message === 'Failed to fetch') {
        setError('Unable to reach the server. Please check your internet connection and ensure the backend is running.');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Right Side: Image/Branding (Flipped for Login for visual interest) */}
      <div className="hidden lg:block relative flex-1 w-0">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury Architectural Resort"
        />
        <div className="absolute inset-0 bg-blue-900 mix-blend-multiply opacity-30"></div>
        <div className="absolute inset-0 flex flex-col justify-center px-20 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h1 className="text-5xl font-extrabold tracking-tight">
              Welcome back to <br /> <span className="text-blue-500">StayEase</span>.
            </h1>
            <p className="mt-6 text-xl max-w-lg">
              Log in to access your bookings and discover personalized travel recommendations just for you.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Left Side: Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mx-auto w-full max-w-sm lg:w-96"
        >
          <div className="flex flex-col items-center lg:items-start">
            <motion.div variants={itemVariants} className="bg-blue-100 p-3 rounded-2xl mb-4">
              <LogIn className="h-8 w-8 text-blue-600" />
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-3xl font-extrabold text-gray-900">
              Log in to your account
            </motion.h2>
            <motion.p variants={itemVariants} className="mt-2 text-sm text-gray-600">
              Enter your details to pick up where you left off.
            </motion.p>
          </div>

          <div className="mt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700">Email address</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    onChange={handleChange}
                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-3 border transition-all"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="flex justify-between">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <Link to="#" className="text-xs font-bold text-blue-600 hover:text-blue-500">Forgot password?</Link>
                </div>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    onChange={handleChange}
                    className="block w-full pl-10 pr-10 sm:text-sm border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-3 border transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
              </motion.div>

              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div variants={itemVariants}>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 shadow-md shadow-blue-200"
                >
                  {loading ? (
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    <>
                      Log in
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </motion.div>
            </form>

            <motion.div variants={itemVariants} className="mt-6 text-center text-sm text-gray-600">
              Don't have an account? <Link to="/signup" className="font-bold text-blue-600 hover:text-blue-500 transition-colors">Sign up</Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
