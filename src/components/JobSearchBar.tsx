import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const JobSearchBar: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/jobs?keyword=${encodeURIComponent(keyword)}&location=${encodeURIComponent(location)}`);
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="flex flex-col md:flex-row gap-4 md:gap-3 w-full max-w-5xl mx-auto"
    >
      {/* Keyword Input */}
      <div className="flex-1 relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <motion.div 
            className="p-2 bg-indigo-50 rounded-xl group-focus-within:bg-indigo-100 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            <Search className="h-5 w-5 text-indigo-600" />
          </motion.div>
        </div>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Job title, keywords, or company"
          className="w-full pl-16 pr-6 py-4 rounded-xl border border-gray-200/80 focus:border-indigo-300 shadow-lg focus:ring-2 focus:ring-indigo-100 outline-none bg-white/70 backdrop-blur-sm transition-all placeholder:text-gray-400/90 hover:border-gray-300 text-gray-700 font-medium"
        />
      </div>

      {/* Location Input */}
      <div className="flex-1 relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <motion.div 
            className="p-2 bg-indigo-50 rounded-xl group-focus-within:bg-indigo-100 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            <MapPin className="h-5 w-5 text-indigo-600" />
          </motion.div>
        </div>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City, state, or remote"
          className="w-full pl-16 pr-6 py-4 rounded-xl border border-gray-200/80 focus:border-indigo-300 shadow-lg focus:ring-2 focus:ring-indigo-100 outline-none bg-white/70 backdrop-blur-sm transition-all placeholder:text-gray-400/90 hover:border-gray-300 text-gray-700 font-medium"
        />
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="px-8 py-4 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 bg-size-200 hover:bg-pos-0 text-white font-semibold rounded-xl shadow-xl hover:shadow-indigo-200/40 transition-all whitespace-nowrap relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="relative z-10 flex items-center justify-center gap-2">
          <Search className="h-5 w-5 text-white/90" />
          Find Dream Jobs
        </span>
      </motion.button>
    </motion.form>
  );
};

export default JobSearchBar;