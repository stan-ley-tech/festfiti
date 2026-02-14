import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Ticket, Bot,
  BarChart3, Shield, ArrowRight
} from 'lucide-react';
import PublicNavbar from '../components/PublicNavbar';
import logo from '../assets/fest_fiti_name_logo_black.png';

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: BarChart3,
      title: 'Real-Time Analytics',
      description: 'Track your event performance with comprehensive dashboards.'
    },
    {
      icon: Ticket,
      title: 'Smart Ticket Guard',
      description: 'Advanced fraud detection and ticket validation.'
    },
    {
      icon: Bot,
      title: 'AI Assistant',
      description: 'Get instant help with FestBuddy, your AI-powered assistant.'
    }
  ];

  const stats = [
    { value: '10K+', label: 'Events Managed' },
    { value: '500K+', label: 'Tickets Validated' },
    { value: '98%', label: 'Satisfaction' },
    { value: '24/7', label: 'Support' }
  ];

  return (
      // Main Container with "Spotlight" Gradient Effect (Light Mode version of Noir)
      <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden selection:bg-gray-900 selection:text-white">

        {/* Background Gradient - Simulates the light beam from top */}
        <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />

        <PublicNavbar />

        {/* Hero Section */}
        <section className="relative pt-32 md:pt-48 pb-20 px-6 max-w-[1400px] mx-auto flex flex-col items-center text-center z-10">

          {/* Main Headings - Big, Bold, Tight Tracking */}
          <div className="max-w-4xl mx-auto mb-10 space-y-2 fade-in-up">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-gray-900 leading-[1.1]">
              Manage Events. <br className="hidden md:block" />
              Explore deeper.
            </h1>
            <p className="text-3xl md:text-5xl lg:text-6xl font-medium text-gray-400 tracking-tight mt-4">
              Event Tech That Understands You
            </p>
          </div>

          {/* CTA Buttons - Pill Shaped */}
          <div className="flex items-center gap-4 mb-20 z-20">
            <button
                onClick={() => navigate('/events')}
                className="bg-white border border-gray-200 hover:border-primary-400 text-gray-900 pl-8 p-2 rounded-full font-semibold text-lg transition-all transform hover:-translate-y-1 shadow-sm flex items-center gap-2"
            >
              Find Events
              <span className="h-8 w-8 bg-gray-900 text-white rounded-full flex items-center justify-center">
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>
            <button
                onClick={() => navigate('/login')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-8 py-3 rounded-full font-semibold text-lg transition-all transform hover:-translate-y-1">
              Sign In
            </button>
          </div>

          {/* The "Three Phones" Layout Implementation */}
          <div className="relative w-full max-w-5xl mx-auto h-[600px] md:h-[700px] flex justify-center items-end perspective-1000">

            {/* Left Phone (Decorative) */}
            <div className="absolute left-1/2 -translate-x-[110%] bottom-[-0px] md:bottom-[-80px] w-[280px] md:w-[350px] h-[650px] bg-gray-50 border-4 border-gray-200 rounded-[3rem] transform -rotate-12 opacity-60 scale-90 z-0 overflow-hidden shadow-2xl hidden md:block">
              <div className="p-6">
                <div className="w-12 h-12 bg-gray-200 rounded-full mb-4"></div>
                <div className="w-3/4 h-4 bg-gray-200 rounded mb-2"></div>
                <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
              </div>
            </div>

            {/* Right Phone (Decorative) */}
            <div className="absolute right-1/2 translate-x-[110%] bottom-[-0px] md:bottom-[-80px] w-[280px] md:w-[350px] h-[650px] bg-gray-50 border-4 border-gray-200 rounded-[3rem] transform rotate-12 opacity-60 scale-90 z-0 overflow-hidden shadow-2xl hidden md:block">
              <div className="p-6">
                <div className="w-full h-32 bg-gray-200 rounded-2xl mb-4"></div>
                <div className="w-full h-8 bg-gray-200 rounded mb-2"></div>
              </div>
            </div>

            {/* Center Phone (Main Mockup) */}
            <div className="relative z-10 w-[300px] md:w-[380px] h-auto bottom-0 md:-bottom-10 transition-transform hover:-translate-y-4 duration-500">
              <div className="relative bg-black rounded-[4rem] p-2 shadow-2xl ring-1 ring-gray-900/5">
                {/* Dynamic Island / Notch */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 h-7 w-28 bg-black rounded-2xl z-20"></div>

                {/* Screen Content */}
                <div className="relative overflow-hidden rounded-[3.5rem] bg-white h-[600px] md:h-[700px] w-full border border-gray-800">
                  <img
                      src="/src/assets/fest_fiti_mockup.jpg"
                      alt="App Interface"
                      className="w-full h-full object-cover"
                  />

                  {/* Overlay Gradient at bottom for seamless fade if image is short */}
                  <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>

                  {/* Floating UI Element (Matches the circle in reference) */}
                  <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full px-6 text-center">
                    <div className="mx-auto w-20 h-20 rounded-full border border-gray-200 bg-white/10 backdrop-blur-md flex items-center justify-center animate-pulse">
                      <div className="w-12 h-12 rounded-full border border-white/50 bg-white/20"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*  gradient to top */}
          <div className="absolute inset-0 bg-gradient-to-t bottom-0 md:-bottom-10 from-white to-transparent pointer-events-none z-50"></div>
        </section>

        {/* Stats Section - Clean & Minimal */}
        <section className="bg-white border-t border-gray-100 py-16 relative z-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              {stats.map((stat, index) => (
                  <div key={index}>
                    <div className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-2">{stat.value}</div>
                    <div className="text-sm font-medium text-gray-500 uppercase tracking-widest">{stat.label}</div>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bento Grid Features - Keeping modern minimalist look */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
              Everything you need.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
                <div
                    key={index}
                    className="group p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-gray-300 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-white rounded-2xl border border-gray-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-gray-900" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{feature.description}</p>
                </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto bg-gray-900 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
            {/* Abstract Background shapes */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 rounded-full blur-[100px]"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
                Ready to transform your events?
              </h2>
              <button
                  onClick={() => navigate('/login')}
                  className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform"
              >
                Get Started Now
              </button>
            </div>
          </div>
        </section>

        {/* Footer - Minimal */}
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <img src={logo} alt="FestFiti" className="h-6 opacity-50" />
              <span className="text-gray-400 text-sm">© 2026 FestFiti</span>
            </div>
            <div className="flex gap-8 text-sm text-gray-500">
              <a href="#" className="hover:text-black">Privacy</a>
              <a href="#" className="hover:text-black">Terms</a>
              <a href="#" className="hover:text-black">Twitter</a>
            </div>
          </div>
        </footer>
      </div>
  );
}