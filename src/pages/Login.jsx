import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { VerificationCodeInput } from '../components/VerificationCodeInput';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/fest_fiti_name_logo_black.png';
import celebrateImg from '../assets/login/celebrate.png';
import watchImg from '../assets/login/look_at_a_watch.png';
import moneyImg from '../assets/login/holding_money.png';
import ecoImg from '../assets/login/eco_friendly.png';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState('email');
  const [verificationCode, setVerificationCode] = useState('');
  const [codeError, setCodeError] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const slideVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const slides = [
    {
      title: 'Streamline Your Events',
      description:
        'Manage multiple events, track budgets, and coordinate vendors all in one powerful platform.',
      image: celebrateImg,
    },
    {
      title: 'Smart Ticket Management',
      description:
        'Advanced fraud detection and real-time ticket validation to keep your events secure.',
      image: watchImg,
    },
    {
      title: 'Track Every Dollar',
      description:
        'Monitor expenses, manage budgets, and get AI-powered financial insights for your events.',
      image: moneyImg,
    },
    {
      title: 'Sustainable Events',
      description:
        'Make eco-friendly choices with sustainability tracking and vendor recommendations.',
      image: ecoImg,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleSendCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('code');
    }, 1000);
  };

  const handleVerifyCode = async (code) => {
    setIsLoading(true);
    setError('');
    setCodeError(false);

    // Simulate verification - for demo, accept "123456"
    setTimeout(() => {
      if (code === '123456') {
        // Successful login - redirect to dashboard
        navigate('/app/dashboard');
      } else {
        setError('Invalid verification code');
        setCodeError(true);
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleCodeChange = (code) => {
    setVerificationCode(code);
    setCodeError(false);
    setError('');
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setError('');

    // Simulate resend
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleGitHubSignIn = () => {
    setIsLoading(true);
    // For demo, just redirect to dashboard
    setTimeout(() => {
      navigate('/app/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans">
      <div className="md:bg-white md:shadow-xl overflow-hidden w-full flex flex-col md:flex-row md:h-screen">

        {/* LEFT SIDE: Visual/Marketing */}
        <div className="hidden md:flex w-1/2 bg-primary-600 relative flex-col items-center justify-center p-12 text-center text-white overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-500 to-primary-700 opacity-50 z-0"></div>
          <div className="absolute top-10 left-10 w-24 h-24 bg-primary-400 rounded-full blur-2xl opacity-30"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-primary-300 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10 flex flex-col items-start mx-auto w-3/4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                {/* Image */}
                <div className="w-full">
                  <div className="w-44 h-44 aspect-square bg-primary-700/10 rounded-full mb-8 flex items-center justify-center backdrop-blur-sm border-4 border-primary-50/30 md:shadow-inner overflow-hidden">
                    <img
                      src={slides[activeSlide].image}
                      alt={slides[activeSlide].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div>
                  <h2 className="text-5xl text-start font-bold mb-4">
                    {slides[activeSlide].title}
                  </h2>
                  <p className="text-primary-100 max-w-md text-lg leading-relaxed text-start">
                    {slides[activeSlide].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel dots */}
            <div className="flex gap-2 mt-8">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    activeSlide === index ? 'bg-white' : 'bg-gray-400/40'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Form */}
        <div className="w-full md:w-1/2 md:bg-white p-8 md:p-16 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">

            {/* Header */}
            <div className="text-start flex flex-col items-start -gap-2 mb-10">
              <img src={logo} className="h-12 -ml-1 object-contain" alt="FestFiti Logo" />
              <div>
                <p className="text-gray-500 text-sm">
                  {step === 'email' ? 'Sign in to your account' : 'Check your email for the code'}
                </p>
              </div>
            </div>

            {step === 'email' ? (
              <>
                <form onSubmit={handleSendCode} className="space-y-5">
                  <div className="space-y-1">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 ml-1">
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@work-email.com"
                      className="w-full px-5 py-3.5 bg-gray-50 border rounded-xl focus:bg-white ring-2 ring-primary-100 border-primary-500 outline-none transition-all placeholder:text-gray-400 text-gray-900"
                      disabled={isLoading}
                    />
                  </div>

                  {error && (
                    <div className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 px-4 rounded-xl md:shadow-lg md:shadow-primary-600/20 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                  >
                    {isLoading ? 'Sending...' : 'Continue'}
                  </button>
                </form>

                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-100"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase tracking-wider">
                    <span className="px-3 md:bg-white text-gray-400">or sign in with</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={handleGitHubSignIn}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-3 w-full bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all disabled:opacity-50"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    GitHub
                  </button>
                </div>

                <p className="mt-6 text-center text-sm text-gray-500">
                  Demo: Use any email, code is <span className="font-mono font-semibold text-primary-600">123456</span>
                </p>
              </>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 mb-1">We sent a code to</p>
                  <p className="font-semibold text-gray-900 text-lg">{email}</p>
                  <button
                    onClick={() => {
                      setStep('email');
                      setVerificationCode('');
                      setError('');
                      setCodeError(false);
                    }}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-2 hover:underline"
                  >
                    Change email address
                  </button>
                </div>

                <div className="py-2">
                  <VerificationCodeInput
                    onComplete={handleVerifyCode}
                    onChange={handleCodeChange}
                    disabled={isLoading}
                    error={codeError}
                  />
                </div>

                {error && (
                  <div className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg text-center">
                    {error}
                  </div>
                )}

                <button
                  onClick={() => {
                    if (verificationCode.length === 6) {
                      handleVerifyCode(verificationCode);
                    }
                  }}
                  disabled={isLoading || verificationCode.length !== 6}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 px-4 rounded-xl md:shadow-lg md:shadow-primary-600/20 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    'Verify Code'
                  )}
                </button>

                <div className="text-center space-y-1">
                  <button
                    onClick={handleResendCode}
                    disabled={isLoading}
                    className="text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    Resend verification code
                  </button>
                  <p className="text-xs text-gray-400">
                    Code expires in 10 minutes
                  </p>
                </div>

                <p className="text-center text-sm text-gray-500">
                  Demo code: <span className="font-mono font-semibold text-primary-600">123456</span>
                </p>
              </div>
            )}

            {/* Footer Terms */}
            <p className="mt-10 text-center text-xs text-gray-400 leading-relaxed">
              By signing in you agree to FestFiti's <br/>
              <a href="#" className="underline hover:text-gray-600">Terms of use</a> and <a href="#" className="underline hover:text-gray-600">Privacy policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
