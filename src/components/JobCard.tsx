import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, DollarSign, Bookmark, Share2 } from 'lucide-react';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  posted: string;
  logo: string;
  skills: string[];
}

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all"
      whileHover={{ y: -3 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          {/* Logo */}
          <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <img 
              src={job.logo} 
              alt={`${job.company} logo`} 
              className="h-full w-full object-cover rounded-lg"
            />
          </div>
          
          {/* Info */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
            <p className="text-gray-600 mb-2">{job.company}</p>
            
            <div className="flex flex-wrap gap-y-2 items-center text-gray-500 text-sm">
              <div className="flex items-center mr-4">
                <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                {job.location}
              </div>
              <div className="flex items-center mr-4">
                <Clock className="h-4 w-4 mr-1 text-gray-400" />
                {job.posted}
              </div>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
                {job.salary}
              </div>
            </div>
            
            <div className="mt-3 flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          {/* Type and Actions */}
          <div className="flex flex-col items-end gap-3 mt-2 md:mt-0">
            <span className={`px-3 py-1 rounded-full text-sm font-medium 
              ${job.type === 'Full-time' ? 'bg-green-50 text-green-700' : 
                job.type === 'Part-time' ? 'bg-blue-50 text-blue-700' : 
                job.type === 'Contract' ? 'bg-purple-50 text-purple-700' :
                job.type === 'Remote' ? 'bg-teal-50 text-teal-700' : 
                'bg-orange-50 text-orange-700'}`}
            >
              {job.type}
            </span>
            
            <div className="flex space-x-2">
              <button 
                className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-gray-100"
                title="Save job"
              >
                <Bookmark className="h-5 w-5" />
              </button>
              <button 
                className="p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-gray-100"
                title="Share job"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-gray-600 line-clamp-2">{job.description}</p>
        </div>
        
        <div className="mt-4 flex justify-end">
          <Link
            to={`/jobs/${job.id}`}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default JobCard;