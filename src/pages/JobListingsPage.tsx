import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Briefcase,
  X,
  CalendarDays,
  DollarSign,
  Building2,
  Clock
} from 'lucide-react';
import JobCard from '../components/JobCard';
import JobSearchBar from '../components/JobSearchBar';

// Dummy job data
const dummyJobs = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: ['Senior Software Engineer', 'UX Designer', 'Product Manager', 'Marketing Specialist', 'Data Scientist'][i % 5],
  company: ['TechCorp', 'DesignHub', 'InnovateCo', 'MarketGenius', 'DataMinds'][i % 5],
  location: ['San Francisco, CA', 'New York, NY', 'Chicago, IL', 'Remote', 'Boston, MA'][i % 5],
  type: ['Full-time', 'Part-time', 'Contract', 'Remote', 'Freelance'][i % 5],
  salary: ['$110K - $140K', '$90K - $120K', '$100K - $130K', '$80K - $100K', '$120K - $150K'][i % 5],
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  posted: ['1 day ago', '2 days ago', '3 days ago', '1 week ago', 'Just now'][i % 5],
  logo: `https://ui-avatars.com/api/?name=${['TC', 'DH', 'IC', 'MG', 'DM'][i % 5]}&background=random`,
  skills: [
    ['React', 'Node.js', 'TypeScript'],
    ['Figma', 'UI/UX', 'Adobe XD'],
    ['Product Management', 'Agile', 'JIRA'],
    ['SEO', 'Content Marketing', 'Social Media'],
    ['Python', 'Machine Learning', 'SQL']
  ][i % 5],
}));

const JobListingsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    keyword: searchParams.get('keyword') || '',
    location: searchParams.get('location') || '',
    jobType: '',
    datePosted: '',
    salary: '',
    experience: '',
  });
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState(dummyJobs);

  // Update filters when search params change
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      keyword: searchParams.get('keyword') || '',
      location: searchParams.get('location') || ''
    }));
  }, [searchParams]);

  // Update active filters array for display
  useEffect(() => {
    const active: string[] = [];
    if (filters.jobType) active.push(`Type: ${filters.jobType}`);
    if (filters.datePosted) active.push(`Posted: ${filters.datePosted}`);
    if (filters.salary) active.push(`Salary: ${filters.salary}`);
    if (filters.experience) active.push(`Experience: ${filters.experience}`);
    setActiveFilters(active);
  }, [filters]);

  // Filter jobs based on criteria
  useEffect(() => {
    let results = [...dummyJobs];

    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      results = results.filter(job =>
        job.title.toLowerCase().includes(keyword) ||
        job.company.toLowerCase().includes(keyword) ||
        job.description.toLowerCase().includes(keyword)
      );
    }

    if (filters.location) {
      const location = filters.location.toLowerCase();
      results = results.filter(job =>
        job.location.toLowerCase().includes(location)
      );
    }

    if (filters.jobType) {
      results = results.filter(job =>
        job.type === filters.jobType
      );
    }

    setFilteredJobs(results);
  }, [filters]);

  const removeFilter = (filter: string) => {
    const type = filter.split(': ')[0];
    switch (type) {
      case 'Type':
        setFilters({ ...filters, jobType: '' });
        break;
      case 'Posted':
        setFilters({ ...filters, datePosted: '' });
        break;
      case 'Salary':
        setFilters({ ...filters, salary: '' });
        break;
      case 'Experience':
        setFilters({ ...filters, experience: '' });
        break;
      default:
        break;
    }
  };

  const clearAllFilters = () => {
    setFilters({
      ...filters,
      jobType: '',
      datePosted: '',
      salary: '',
      experience: ''
    });
  };

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Remote', 'Freelance'];
  const datePostedOptions = ['Today', 'Last 3 days', 'Last week', 'Last month'];
  const salaryRanges = ['$0 - $50K', '$50K - $100K', '$100K - $150K', '$150K+'];
  const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Director', 'Executive'];

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="py-8 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Find Your Perfect Job</h1>
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-xl shadow-lg">
              <JobSearchBar />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters - Desktop */}
          <motion.div
            className="hidden lg:block w-64 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-lg shadow-sm p-5">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </h3>

              {/* Job Type */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Job Type
                </h4>
                <div className="space-y-2">
                  {jobTypes.map(type => (
                    <label key={type} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="jobType"
                        checked={filters.jobType === type}
                        onChange={() => setFilters({ ...filters, jobType: type })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-600">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date Posted */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                  <CalendarDays className="h-4 w-4 mr-2" />
                  Date Posted
                </h4>
                <div className="space-y-2">
                  {datePostedOptions.map(option => (
                    <label key={option} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="datePosted"
                        checked={filters.datePosted === option}
                        onChange={() => setFilters({ ...filters, datePosted: option })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-600">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Salary Range */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Salary Range
                </h4>
                <div className="space-y-2">
                  {salaryRanges.map(range => (
                    <label key={range} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="salary"
                        checked={filters.salary === range}
                        onChange={() => setFilters({ ...filters, salary: range })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-600">{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Experience Level */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                  <Building2 className="h-4 w-4 mr-2" />
                  Experience Level
                </h4>
                <div className="space-y-2">
                  {experienceLevels.map(level => (
                    <label key={level} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="experience"
                        checked={filters.experience === level}
                        onChange={() => setFilters({ ...filters, experience: level })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-600">{level}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white rounded-lg shadow-sm text-gray-700 hover:bg-gray-50"
            >
              <Filter className="h-5 w-5" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <motion.div
              className="lg:hidden bg-white rounded-lg shadow-sm p-5 mb-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-2 gap-4">
                {/* Job Type */}
                <div className="mb-6 col-span-2 md:col-span-1">
                  <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Job Type
                  </h4>
                  <div className="space-y-2">
                    {jobTypes.map(type => (
                      <label key={type} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="jobType"
                          checked={filters.jobType === type}
                          onChange={() => setFilters({ ...filters, jobType: type })}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-gray-600">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Date Posted */}
                <div className="mb-6 col-span-2 md:col-span-1">
                  <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                    <CalendarDays className="h-4 w-4 mr-2" />
                    Date Posted
                  </h4>
                  <div className="space-y-2">
                    {datePostedOptions.map(option => (
                      <label key={option} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="datePosted"
                          checked={filters.datePosted === option}
                          onChange={() => setFilters({ ...filters, datePosted: option })}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-gray-600">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Salary Range */}
                <div className="mb-6 col-span-2 md:col-span-1">
                  <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Salary Range
                  </h4>
                  <div className="space-y-2">
                    {salaryRanges.map(range => (
                      <label key={range} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="salary"
                          checked={filters.salary === range}
                          onChange={() => setFilters({ ...filters, salary: range })}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-gray-600">{range}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Experience Level */}
                <div className="col-span-2 md:col-span-1">
                  <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                    <Building2 className="h-4 w-4 mr-2" />
                    Experience Level
                  </h4>
                  <div className="space-y-2">
                    {experienceLevels.map(level => (
                      <label key={level} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="experience"
                          checked={filters.experience === level}
                          onChange={() => setFilters({ ...filters, experience: level })}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-gray-600">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-700">Active Filters:</h3>
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {activeFilters.map((filter, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      {filter}
                      <button
                        onClick={() => removeFilter(filter)}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Results Count */}
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-700">
                <span className="font-semibold">{filteredJobs.length}</span> jobs found
              </p>
              <div className="flex items-center text-gray-700">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm">Last updated 5 minutes ago</span>
              </div>
            </div>

            {/* Job Listings */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <div className="flex justify-center mb-4">
                    <Search className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">No jobs found</h3>
                  <p className="text-gray-500">
                    Try adjusting your search filters or try a different search term.
                  </p>
                </div>
              )}
            </motion.div>

            {/* Pagination */}
            {filteredJobs.length > 0 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded-md">1</button>
                  <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">2</button>
                  <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">3</button>
                  <span className="px-3 py-1 text-gray-500">…</span>
                  <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">10</button>
                  <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50">
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListingsPage;
