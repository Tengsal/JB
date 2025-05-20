import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, AlertCircle } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div 
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <AlertCircle className="h-24 w-24 text-blue-600" />
          </motion.div>
        </div>
        
        <h1 className="mt-6 text-5xl font-bold text-gray-900">404</h1>
        <h2 className="mt-2 text-3xl font-semibold text-gray-800">Page Not Found</h2>
        
        <p className="mt-4 text-gray-600">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Home className="mr-2 h-5 w-5" />
            Back to Home
          </Link>
          <Link
            to="/jobs"
            className="inline-flex items-center justify-center px-5 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Search className="mr-2 h-5 w-5" />
            Search Jobs
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;