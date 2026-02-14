import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getUserAvatar } from '../utils/avatars';
import logo from '../assets/fest_fiti_name_logo_black.png';

const PublicNavbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = ['Home', 'Features', 'Plans', 'Updates'];

  return (
    <>
      {/* Navigation - Minimalist & Centered */}
      <nav className="fixed w-full z-50 top-0 transition-all duration-300 backdrop-blur-sm bg-white/70 border-b border-gray-100/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <img src={logo} alt="FestFiti" className="h-8 md:h-10 opacity-90 hover:opacity-100 transition-opacity" />
          </div>

          {/* Desktop Links - Centered like reference */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link} href="#" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
                {link}
              </a>
            ))}
          </div>

          {/* Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => navigate('/events')}
              className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
            >
              Browse Events
            </button>
            
            {isAuthenticated() ? (
              <button
                onClick={() => navigate(isAdmin() ? '/app/dashboard' : '/user/dashboard')}
                className="flex items-center space-x-2 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
              >
                <img 
                  src={getUserAvatar(user?.email)} 
                  alt={user?.name}
                  className="w-8 h-8 rounded-full border border-gray-200"
                />
                <span className="flex items-center space-x-1">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </span>
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
              >
                Sign In
              </button>
            )}
            
            <button
              onClick={() => navigate('/events')}
              className="bg-gray-900 hover:bg-black text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all hover:scale-105 shadow-lg shadow-gray-200"
            >
              Find Events
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-900">
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  {link}
                </a>
              ))}
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-3 space-y-3 flex-col">
                  <button
                    onClick={() => navigate('/events')}
                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  >
                    Browse Events
                  </button>
                  
                  {isAuthenticated() ? (
                    <button
                      onClick={() => navigate(isAdmin() ? '/app/dashboard' : '/user/dashboard')}
                      className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    >
                      <img 
                        src={getUserAvatar(user?.email)} 
                        alt={user?.name}
                        className="w-8 h-8 rounded-full border border-gray-200"
                      />
                      <span className="flex items-center space-x-1">
                        <LayoutDashboard className="w-4 h-4" />
                        <span>Dashboard</span>
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate('/login')}
                      className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    >
                      Sign In
                    </button>
                  )}
                  
                  <button
                    onClick={() => navigate('/events')}
                    className="w-full bg-gray-900 hover:bg-black text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all"
                  >
                    Find Events
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default PublicNavbar;
