import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Check, X, ArrowRight, User, Mail, Lock, ShieldCheck } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const passwordMatch = formData.password === formData.confirmPassword && formData.password !== '';
  
  const hasMinLength = formData.password.length >= 8;
  const hasLetter = /[A-Za-z]/.test(formData.password);
  const hasDigit = /\d/.test(formData.password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(formData.password);
  
  const passwordValid = hasMinLength && hasLetter && hasDigit && hasSpecialChar;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordValid || !passwordMatch) return;

    setError(null);
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/auth/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.email,
          email: formData.email,
          password: formData.password,
          first_name: formData.name.split(' ')[0],
          last_name: formData.name.split(' ').slice(1).join(' '),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.username ? 'User with this email already exists.' : 'Signup failed. Please try again.');
      }

      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side: Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mx-auto w-full max-w-sm lg:w-96"
        >
          <div>
            <motion.h2 variants={itemVariants} className="mt-6 text-3xl font-extrabold text-gray-900">
              Create your account
            </motion.h2>
            <motion.p variants={itemVariants} className="mt-2 text-sm text-gray-600">
              Join thousands of travelers finding their perfect stay.
            </motion.p>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div variants={itemVariants}>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Ankit Tiwari"
                      onChange={handleChange}
                      className="block w-full pl-10 sm:text-sm border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-3 border transition-all"
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
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
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
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
                  {formData.password && (
                    <div className="mt-2 text-xs space-y-1">
                      <div className="flex items-center space-x-1">
                        {hasMinLength ? <Check className="h-4 w-4 text-green-500" /> : <X className="h-4 w-4 text-red-500" />}
                        <span className={hasMinLength ? 'text-green-600' : 'text-red-600'}>At least 8 characters</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {hasLetter && hasDigit ? <Check className="h-4 w-4 text-green-500" /> : <X className="h-4 w-4 text-red-500" />}
                        <span className={hasLetter && hasDigit ? 'text-green-600' : 'text-red-600'}>Alphanumeric (letters & numbers)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {hasSpecialChar ? <Check className="h-4 w-4 text-green-500" /> : <X className="h-4 w-4 text-red-500" />}
                        <span className={hasSpecialChar ? 'text-green-600' : 'text-red-600'}>Special character (e.g., !@#$%)</span>
                      </div>
                    </div>
                  )}
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <ShieldCheck className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      placeholder="••••••••"
                      onChange={handleChange}
                      className="block w-full pl-10 sm:text-sm border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-3 border transition-all"
                    />
                  </div>
                  <AnimatePresence>
                    {formData.confirmPassword && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 flex items-center space-x-1"
                      >
                        {passwordMatch ? <Check className="h-4 w-4 text-green-500" /> : <X className="h-4 w-4 text-red-500" />}
                        <span className={`text-xs ${passwordMatch ? 'text-green-600' : 'text-red-600'}`}>
                          {passwordMatch ? "Passwords match" : "Passwords do not match"}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <AnimatePresence>
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div variants={itemVariants}>
                  <button
                    type="submit"
                    disabled={loading || !passwordValid || !passwordMatch}
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
                  >
                    {loading ? (
                      <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <>
                        Sign up
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </button>
                </motion.div>
              </form>
            </div>

            <motion.div variants={itemVariants} className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-blue-600 hover:text-blue-500 transition-colors">
                Log in
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Right Side: Image/Branding */}
      <div className="hidden lg:block relative flex-1 w-0">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop"
          alt="Travel Nature"
        />
        <div className="absolute inset-0 bg-blue-600 mix-blend-multiply opacity-20"></div>
        <div className="absolute inset-0 flex flex-col justify-center px-20 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h1 className="text-5xl font-extrabold tracking-tight">
              Start your journey <br /> with <span className="text-blue-500">StayEase</span>.
            </h1>
            <p className="mt-6 text-xl max-w-lg">
              Unlock exclusive deals and discover hidden gems across the globe. Your next adventure starts here.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
