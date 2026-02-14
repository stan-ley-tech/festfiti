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

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Plans', path: '/plans' },
    { name: 'Updates', path: '/updates' }
  ];

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
              <button
                key={link.name}
                onClick={() => navigate(link.path)}
                className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated() ? (
              /* Logged In - Just show avatar */
              <button
                onClick={() => navigate(isAdmin() ? '/app/dashboard' : '/user/dashboard')}
                className="flex items-center space-x-2 hover:opacity-80 transition-all"
              >
                <img 
                  src={getUserAvatar(user?.email)} 
                  alt={user?.name}
                  className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-primary-500 transition-all shadow-sm hover:shadow-md"
                />
              </button>
            ) : (
              /* Logged Out - Show all buttons */
              <>
                <button
                  onClick={() => navigate('/events')}
                  className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
                >
                  Browse Events
                </button>
                
                <button
                  onClick={() => navigate('/login')}
                  className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
                >
                  Sign In
                </button>
                
                <button
                  onClick={() => navigate('/events')}
                  className="bg-gray-900 hover:bg-black text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all hover:scale-105 shadow-lg shadow-gray-200"
                >
                  Find Events
                </button>
              </>
            )}
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
                <button
                  key={link.name}
                  onClick={() => {
                    navigate(link.path);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  {link.name}
                </button>
              ))}
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-3 space-y-3 flex-col">
                  {isAuthenticated() ? (
                    /* Logged In Mobile - Just avatar and dashboard link */
                    <button
                      onClick={() => {
                        navigate(isAdmin() ? '/app/dashboard' : '/user/dashboard');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-center space-x-3 px-3 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <img 
                        src={getUserAvatar(user?.email)} 
                        alt={user?.name}
                        className="w-10 h-10 rounded-full border-2 border-gray-200"
                      />
                      <div className="flex-1 text-left">
                        <p className="text-sm font-semibold text-gray-900">{user?.name || 'User'}</p>
                        <p className="text-xs text-gray-500">Go to Dashboard</p>
                      </div>
                      <LayoutDashboard className="w-5 h-5 text-gray-400" />
                    </button>
                  ) : (
                    /* Logged Out Mobile - Show all options */
                    <>
                      <button
                        onClick={() => {
                          navigate('/events');
                          setMobileMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      >
                        Browse Events
                      </button>
                      
                      <button
                        onClick={() => {
                          navigate('/login');
                          setMobileMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      >
                        Sign In
                      </button>
                      
                      <button
                        onClick={() => {
                          navigate('/events');
                          setMobileMenuOpen(false);
                        }}
                        className="w-full bg-gray-900 hover:bg-black text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all"
                      >
                        Find Events
                      </button>
                    </>
                  )}
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
