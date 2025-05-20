import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';

const JobSearchBar: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/jobs?keyword=${encodeURIComponent(keyword)}&location=${encodeURIComponent(location)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
      <div className="flex-1 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Job title, keywords, or company"
          className="w-full pl-10 pr-4 py-3 rounded-md border-0 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
      
      <div className="flex-1 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MapPin className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City, state, or remote"
          className="w-full pl-10 pr-4 py-3 rounded-md border-0 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
      
      <button
        type="submit"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition-colors whitespace-nowrap"
      >
        Find Jobs
      </button>
    </form>
  );
};

export default JobSearchBar;