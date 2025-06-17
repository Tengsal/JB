import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <motion.main 
        className="flex-grow pt-20 md:pt-24" // Added responsive padding-top
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  );
};

export default MainLayout;