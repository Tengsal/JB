import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import React from 'react';

type Job = {
  id: string | number;
  title: string;
  company: string;
  location: string;
  salary: string;
  tags: string[];
  isNew?: boolean;
  isHot?: boolean;
};

type JobListingsProps = {
  darkMode: boolean;
  jobListings: Job[];
  applyForJob: () => void;
};

const JobListings: React.FC<JobListingsProps> = ({ darkMode, jobListings, applyForJob }) => {
  return (
    <motion.div
      key="jobs"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {jobListings.map((job, index) => (
        <motion.div
          key={job.id}
          className={`rounded-2xl overflow-hidden group ${
            darkMode 
              ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' 
              : 'bg-white border border-gray-200'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          whileHover={{ y: -10 }}
        >
          <div className="p-6">
            <div className="flex justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
                <div>
                  <h3 className="font-bold text-lg">{job.title}</h3>
                  <p className="text-gray-500">{job.company}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {job.isNew && (
                  <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                    New
                  </span>
                )}
                {job.isHot && (
                  <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                    Hot
                  </span>
                )}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-500 flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4" /> {job.location}
              </p>
              <p className="font-bold text-indigo-500">{job.salary}</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {job.tags.map((tag, i) => (
                <span 
                  key={i} 
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <button 
                className="text-indigo-500 font-medium"
                onClick={applyForJob}
              >
                Apply Now
              </button>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default JobListings;
