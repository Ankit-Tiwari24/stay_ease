import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, RefreshCw, AlertCircle, Loader2 } from 'lucide-react';

const OTPModal = ({ isOpen, onClose, email, onVerify, onResend, loading, error }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    let interval;
    if (isOpen && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [isOpen, timer]);

  useEffect(() => {
    if (isOpen) {
      setOtp(['', '', '', '', '', '']);
      setTimer(60);
      setCanResend(false);
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [isOpen]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join('');
    if (otpCode.length === 6) {
      onVerify(otpCode);
    }
  };

  const handleResend = () => {
    if (canResend) {
      onResend();
      setTimer(60);
      setCanResend(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative"
          >
            {/* Header Decorations */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-600" />
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
                <ShieldCheck size={32} />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify your email</h2>
              <p className="text-gray-500 mb-8">
                We've sent a 6-digit verification code to <br />
                <span className="font-semibold text-gray-900">{email}</span>
              </p>

              <div className="flex justify-between gap-2 mb-8">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-14 text-center text-2xl font-bold bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all"
                  />
                ))}
              </div>

              {error && (
                <div className="flex items-center justify-center gap-2 text-red-600 text-sm mb-6 bg-red-50 p-3 rounded-xl animate-shake">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <button
                onClick={handleVerify}
                disabled={loading || otp.join('').length < 6}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Verify Account'}
              </button>

              <div className="mt-8 text-sm">
                <p className="text-gray-500">
                  Didn't receive the code?
                </p>
                <button
                  onClick={handleResend}
                  disabled={!canResend}
                  className={`mt-2 flex items-center justify-center gap-2 mx-auto font-bold transition-colors ${
                    canResend ? 'text-blue-600 hover:text-blue-700' : 'text-gray-300'
                  }`}
                >
                  <RefreshCw size={16} className={!canResend && 'animate-pulse'} />
                  {canResend ? 'Resend OTP' : `Resend in ${timer}s`}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default OTPModal;
