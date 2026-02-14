import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, ArrowLeft, Home, RefreshCw, Zap } from 'lucide-react';
import logo from '../assets/fest_fiti_name_logo_black.png';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const [coffeeLevel, setCoffeeLevel] = useState(0);

  const slideVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const coffeeMessages = [
    {
      title: 'We Need More Coffee!',
      description: 'Our developers are currently refueling with premium Ethiopian beans to craft this page.',
      icon: Coffee,
      color: 'text-blue-600'
    },
    {
      title: 'Page Under Construction',
      description: 'Great things take time, just like a perfect espresso shot. We\'re brewing something amazing.',
      icon: Zap,
      color: 'text-blue-600'
    },
    {
      title: 'Lost in the Code',
      description: 'Even the best navigators need a coffee break. Let us guide you back to familiar territory.',
      icon: RefreshCw,
      color: 'text-blue-600'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % coffeeMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [coffeeMessages.length]);

  useEffect(() => {
    // Coffee filling animation
    const fillCoffee = setInterval(() => {
      setCoffeeLevel(prev => {
        if (prev >= 100) {
          return 0; // Reset and refill
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(fillCoffee);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans">
      <div className="md:bg-white md:shadow-xl overflow-hidden w-full flex flex-col md:flex-row md:h-screen">

        {/* LEFT SIDE: Coffee Animation */}
        <div className="hidden md:flex w-1/2 bg-blue-600 relative flex-col items-center justify-center p-12 text-center text-white overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 opacity-50 z-0"></div>
          <div className="absolute top-10 left-10 w-24 h-24 bg-blue-400 rounded-full blur-2xl opacity-30"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-300 rounded-full blur-3xl opacity-20"></div>

          {/* Coffee steam animation */}
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-8 bg-white/20 rounded-full"
                style={{ left: `${i * 8 - 16}px` }}
                animate={{
                  y: [-20, -60],
                  opacity: [0, 1, 0],
                  scale: [1, 1.2, 0.8]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          <div className="relative z-10 flex flex-col items-center mx-auto w-3/4">
            {/* Animated Coffee Cup */}
            <div className="mb-8">
              <div className="relative w-32 h-40 mx-auto">
                {/* Coffee cup */}
                <div className="absolute bottom-0 w-full h-32 bg-blue-800/20 rounded-b-3xl border-4 border-blue-50/30 backdrop-blur-sm">
                  {/* Coffee liquid with filling animation */}
                  <div
                    className="absolute bottom-2 left-2 right-2 bg-gradient-to-t rounded-t-xl from-blue-900 overflow-hidden to-blue-700 rounded-b-2xl transition-all duration-300 ease-out"
                    style={{ height: `${Math.min(coffeeLevel, 85)}%` }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-3 bg-blue-600 opacity-60"></div>
                  </div>
                </div>
                {/* Cup handle */}
                <div className="absolute -right-6 top-8 w-6 h-12 border-4 border-blue-50/30 rounded-r-xl"></div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="flex items-center justify-center mb-4">
                  {React.createElement(coffeeMessages[activeSlide].icon, {
                    className: `w-8 h-8 mr-3 ${coffeeMessages[activeSlide].color}`
                  })}
                  <h2 className="text-4xl font-bold">
                    {coffeeMessages[activeSlide].title}
                  </h2>
                </div>
                <p className="text-blue-100 max-w-md text-lg leading-relaxed">
                  {coffeeMessages[activeSlide].description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Carousel dots */}
            <div className="flex gap-2 mt-8">
              {coffeeMessages.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 cursor-pointer ${
                    activeSlide === index ? 'bg-white' : 'bg-gray-400/40'
                  }`}
                  onClick={() => setActiveSlide(index)}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: 404 Content */}
        <div className="w-full md:w-1/2 md:bg-white p-8 md:p-16 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full text-center">

            {/* Header */}
            <div className="flex flex-col items-center mb-10">
              <img src={logo} className="h-12 object-contain mb-6" alt="FestFiti Logo" />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
              >
                <div className="text-8xl font-bold text-blue-600 mb-4">404</div>
              </motion.div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Page Not Found</h1>
              <p className="text-gray-500 text-lg mb-8">
                Looks like our developers need another espresso shot to brew this page!
              </p>
            </div>

            {/* Coffee Status */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-center mb-4">
                <Coffee className="w-6 h-6 text-blue-600 mr-2" />
                <span className="font-semibold text-blue-800">Coffee Meter</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-3 mb-2">
                <motion.div
                  className="bg-blue-600 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${coffeeLevel}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <p className="text-sm text-blue-700 flex items-center justify-center gap-1">
                {coffeeLevel < 30 ? (
                  <>Need more coffee <Coffee className="w-4 h-4" /></>
                ) : coffeeLevel < 70 ? (
                  <>Getting there... <Coffee className="w-4 h-4" /><Coffee className="w-4 h-4" /></>
                ) : (
                  <>Almost ready! <Coffee className="w-4 h-4" /><Coffee className="w-4 h-4" /><Coffee className="w-4 h-4" /></>
                )}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <motion.button
                onClick={() => navigate('/')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-blue-600/20 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <Home className="w-5 h-5" />
                Take Me Home
              </motion.button>

              <div className="flex gap-3">
                <motion.button
                  onClick={() => navigate(-1)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
                  whileHover={{ y: -1 }}
                  whileTap={{ y: 0 }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Go Back
                </motion.button>

                <motion.button
                  onClick={() => window.location.reload()}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
                  whileHover={{ y: -1 }}
                  whileTap={{ y: 0 }}
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </motion.button>
              </div>
            </div>

            {/* Help Links */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">Need help? Try these:</p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <button
                  onClick={() => navigate('/events')}
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                >
                  Browse Events
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/app/dashboard')}
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                >
                  Dashboard
                </button>
              </div>
            </div>

            {/* Footer */}
            <p className="mt-8 text-center text-xs text-gray-400 leading-relaxed flex items-center justify-center gap-1">
              While you wait, grab a coffee <Coffee className="w-3 h-3" />
              We'll have this page ready soon!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
