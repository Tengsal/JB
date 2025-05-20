import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Briefcase, Building2, Users, TrendingUp } from 'lucide-react';
import JobSearchBar from '../components/JobSearchBar';

const HomePage: React.FC = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const stats = [
    { icon: <Briefcase />, count: '10K+', label: 'Active Jobs' },
    { icon: <Building2 />, count: '2.5K+', label: 'Companies' },
    { icon: <Users />, count: '50K+', label: 'Job Seekers' },
    { icon: <TrendingUp />, count: '98%', label: 'Success Rate' }
  ];

  const categories = [
    'Technology', 'Marketing', 'Design', 'Finance', 
    'Healthcare', 'Education', 'Engineering', 'Customer Service'
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-indigo-800 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-10"></div>
        </div>
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Find Your <span className="text-blue-300">Dream Job</span> Today
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl mb-8 text-blue-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Connect with top employers, discover opportunities, and take the next step in your career journey.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-md p-5 rounded-xl shadow-lg"
            >
              <JobSearchBar />
            </motion.div>

            <motion.div 
              className="mt-8 flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link 
                to="/jobs" 
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition-all"
              >
                Browse All Jobs
              </Link>
              <Link 
                to="/register" 
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-md font-medium transition-all"
              >
                Sign Up
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                variants={fadeIn}
              >
                <div className="flex justify-center text-blue-600 mb-3">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-800">{stat.count}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl font-bold text-gray-900 mb-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              Featured Jobs
            </motion.h2>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              variants={fadeIn}
            >
              Discover opportunities from top employers looking for talented professionals like you
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all overflow-hidden border border-gray-100"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                variants={fadeIn}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-blue-600" />
                    </div>
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                      {['Full-time', 'Part-time', 'Remote', 'Contract'][index % 4]}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {[
                      'Senior Software Engineer', 
                      'UX/UI Designer', 
                      'Marketing Manager', 
                      'Product Manager',
                      'Data Scientist',
                      'Financial Analyst'
                    ][index % 6]}
                  </h3>
                  <div className="mb-4 text-gray-600">
                    <p>{['TechCorp', 'DesignHub', 'MarketGenius', 'ProductIQ', 'DataMinds', 'FinanceElite'][index % 6]}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {['San Francisco, CA', 'New York, NY', 'Remote', 'Chicago, IL', 'Boston, MA', 'Austin, TX'][index % 6]}
                    </p>
                  </div>
                  <div className="mb-4">
                    <p className="text-blue-600 font-semibold">
                      ${['120K', '95K', '85K', '110K', '130K', '90K'][index % 6]} - ${['150K', '120K', '100K', '130K', '160K', '110K'][index % 6]} / year
                    </p>
                  </div>
                  <div className="flex space-x-2 mb-4">
                    {['React', 'Node.js', 'TypeScript', 'Python', 'UI/UX', 'Marketing', 'Finance', 'Data'].slice(0, 3).map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/jobs/${index + 1}`}
                    className="block w-full text-center py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/jobs"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              <Search className="mr-2 h-5 w-5" />
              Browse All Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl font-bold text-gray-900 mb-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              Explore Job Categories
            </motion.h2>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              variants={fadeIn}
            >
              Browse opportunities by category and find the perfect role in your field
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md hover:bg-blue-50 transition-all cursor-pointer"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                variants={fadeIn}
                whileHover={{ scale: 1.03 }}
              >
                <h3 className="font-semibold text-gray-900">{category}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.h2 
              className="text-3xl font-bold mb-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              Ready to Take the Next Step in Your Career?
            </motion.h2>
            <motion.p 
              className="text-blue-100 mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              variants={fadeIn}
            >
              Join thousands of job seekers who have found their dream jobs through our platform.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              variants={fadeIn}
            >
              <Link
                to="/register"
                className="px-6 py-3 bg-white text-blue-600 hover:bg-blue-50 rounded-md font-medium transition-all"
              >
                Create Account
              </Link>
              <Link
                to="/jobs"
                className="px-6 py-3 bg-blue-500 hover:bg-blue-400 rounded-md font-medium transition-all"
              >
                Search Jobs
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;