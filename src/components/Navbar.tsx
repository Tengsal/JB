import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, Menu, X, User, LogIn, UserPlus 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/jobs', label: 'Find Jobs' },
    { path: '/text-generator', label: 'Resume Builder' },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Briefcase className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">JobPortal</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all ${
                  location.pathname === link.path ? 'text-blue-600 bg-blue-50 font-medium' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons or User Menu */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center">
                <Link
                  to={`/dashboard/${user.role}`}
                  className="px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
                >
                  <User className="inline-block mr-1 h-5 w-5" />
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-2 ml-2 text-gray-700 rounded-md hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-all"
                >
                  <LogIn className="mr-1 h-5 w-5" />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
                >
                  <UserPlus className="mr-1 h-5 w-5" />
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-900" />
            ) : (
              <Menu className="h-6 w-6 text-gray-900" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-white shadow-xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 pt-2 pb-4 flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 rounded-md ${
                    location.pathname === link.path
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="border-t border-gray-200 my-2 pt-2">
                {user ? (
                  <>
                    <Link
                      to={`/dashboard/${user.role}`}
                      className="block px-4 py-3 text-gray-700 rounded-md hover:bg-gray-100"
                    >
                      <User className="inline-block mr-2 h-5 w-5" />
                      Dashboard
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-3 text-red-600 rounded-md hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-3 text-gray-700 rounded-md hover:bg-gray-100"
                    >
                      <LogIn className="inline-block mr-2 h-5 w-5" />
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all mt-2"
                    >
                      <UserPlus className="inline-block mr-2 h-5 w-5" />
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;