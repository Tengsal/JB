import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Rocket, Menu, X, User, LogIn, UserPlus  // Updated icon import
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/jobs', label: 'Find Jobs' },
    { path: '/text-generator', label: 'Resume Builder' },
  ];

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm py-3' : 'bg-transparent py-5'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          {/* Updated Logo with Rocket Icon */}
          <Link 
            to="/" 
            className="flex items-center group relative"
          >
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-2"
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-indigo-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <Rocket className="h-8 w-8 text-indigo-600 relative z-10 transform transition-all group-hover:-rotate-12" />
              </div>
              
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-800 to-indigo-600 bg-clip-text text-transparent tracking-tight">
                  Zyora
                </span>
                <motion.span
                  className="text-[10px] font-medium text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity -mt-1 tracking-wide"
                  initial={{ y: -5 }}
                  animate={{ y: 0 }}
                >
                  CAREER ACCELERATOR
                </motion.span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 rounded-lg text-gray-600 hover:text-indigo-600 transition-colors ${
                  location.pathname === link.path ? 'text-indigo-600 font-medium' : ''
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-600"
                    layoutId="nav-underline"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  to={`/dashboard/${user.role}`}
                  className="flex items-center px-4 py-2 rounded-lg transition-all hover:bg-gray-100 group"
                >
                  <User className="h-5 w-5 text-gray-600 group-hover:text-indigo-600 mr-2" />
                  <span className="text-gray-700 group-hover:text-indigo-600">Dashboard</span>
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="flex items-center px-4 py-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-gray-50 transition-all"
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all shadow-sm hover:shadow-indigo-200"
                >
                  <UserPlus className="h-5 w-5 mr-2 text-white/90" />
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-4 bg-white rounded-xl shadow-lg border border-gray-100"
            >
              <div className="flex flex-col p-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-3 rounded-lg ${
                      location.pathname === link.path 
                        ? 'bg-indigo-50 text-indigo-600 font-medium' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                
                <div className="border-t border-gray-100 mt-2 pt-2">
                  {user ? (
                    <>
                      <Link
                        to={`/dashboard/${user.role}`}
                        className="flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50"
                      >
                        <User className="h-5 w-5 mr-3" />
                        Dashboard
                      </Link>
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50"
                      >
                        <LogIn className="h-5 w-5 mr-3" />
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="flex items-center px-4 py-3 mt-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700"
                      >
                        <UserPlus className="h-5 w-5 mr-3 text-white/90" />
                        Get Started
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;