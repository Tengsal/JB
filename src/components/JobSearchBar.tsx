import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface JobSearchBarProps {
  darkMode?: boolean;
}

const JobSearchBar: React.FC<JobSearchBarProps> = ({ darkMode = false }) => {
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
      className={`flex flex-col md:flex-row gap-3 md:gap-2 w-full max-w-6xl mx-auto px-4 p-6 rounded-2xl shadow-lg border ${
        darkMode 
          ? 'bg-gray-800/30 backdrop-blur-md border-gray-700/30' 
          : 'bg-white/70 backdrop-blur-sm border-gray-100'
      }`}
    >
      {/* Keyword Input */}
      <div className="flex-1 relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <motion.div 
            className={`p-2 rounded-lg group-focus-within:bg-blue-50 transition-colors duration-300 ${
              darkMode ? 'bg-gray-700 group-focus-within:bg-blue-900/30' : 'bg-slate-100'
            }`}
            whileHover={{ scale: 1.03 }}
          >
            <Search className={`h-5 w-5 ${darkMode ? 'text-gray-300' : 'text-slate-600'}`} />
          </motion.div>
        </div>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Job title or keywords"
          className={`w-full pl-16 pr-6 py-4 rounded-xl focus:ring-2 outline-none shadow-sm hover:shadow-md transition-all placeholder:text-gray-500/90 text-[15px] tracking-tight font-medium
            ${
              darkMode
                ? 'bg-gray-700/50 border-gray-600 focus:border-blue-500 focus:ring-blue-900/50 hover:border-gray-500 text-gray-200 placeholder:text-gray-400'
                : 'bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-100 hover:border-gray-300 text-gray-700'
            }`}
        />
      </div>

      {/* Location Input */}
      <div className="flex-1 relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <motion.div 
            className={`p-2 rounded-lg group-focus-within:bg-blue-50 transition-colors duration-300 ${
              darkMode ? 'bg-gray-700 group-focus-within:bg-blue-900/30' : 'bg-slate-100'
            }`}
            whileHover={{ scale: 1.03 }}
          >
            <MapPin className={`h-5 w-5 ${darkMode ? 'text-gray-300' : 'text-slate-600'}`} />
          </motion.div>
        </div>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location or remote"
          className={`w-full pl-16 pr-6 py-4 rounded-xl focus:ring-2 outline-none shadow-sm hover:shadow-md transition-all placeholder:text-gray-500/90 text-[15px] tracking-tight font-medium
            ${
              darkMode
                ? 'bg-gray-700/50 border-gray-600 focus:border-blue-500 focus:ring-blue-900/50 hover:border-gray-500 text-gray-200 placeholder:text-gray-400'
                : 'bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-100 hover:border-gray-300 text-gray-700'
            }`}
        />
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        className={`px-8 py-4 font-semibold rounded-xl shadow-md hover:shadow-lg transition-all whitespace-nowrap relative overflow-hidden group text-[15px] tracking-tight
          ${
            darkMode
              ? 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:to-indigo-800'
              : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:to-blue-800'
          }`}
      >
        <div className={`absolute inset-0 bg-gradient-to-r ${
          darkMode ? 'from-white/10 via-white/0' : 'from-white/20 via-white/0'
        } to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
        <span className="relative z-10 flex items-center justify-center gap-2 text-white/95">
          <Search className="h-5 w-5" />
          Search Jobs
        </span>
      </motion.button>
    </motion.form>
  );
};

export default JobSearchBar;