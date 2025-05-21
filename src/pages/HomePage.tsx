import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Briefcase, Building2, Users, TrendingUp, Rocket, Award, Zap, MapPin  } from 'lucide-react';
import JobSearchBar from '../components/JobSearchBar';

const HomePage: React.FC = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stats = [
    { icon: <Briefcase className="w-6 h-6" />, count: '10K+', label: 'Active Jobs' },
    { icon: <Building2 className="w-6 h-6" />, count: '2.5K+', label: 'Companies' },
    { icon: <Users className="w-6 h-6" />, count: '50K+', label: 'Job Seekers' },
    { icon: <TrendingUp className="w-6 h-6" />, count: '98%', label: 'Success Rate' }
  ];

  const categories = [
    { name: 'Technology', icon: <Zap className="w-6 h-6" />, color: 'bg-purple-100' },
    { name: 'Marketing', icon: <Rocket className="w-6 h-6" />, color: 'bg-pink-100' },
    { name: 'Design', icon: <Award className="w-6 h-6" />, color: 'bg-blue-100' },
    { name: 'Finance', icon: <TrendingUp className="w-6 h-6" />, color: 'bg-green-100' },
    { name: 'Healthcare', icon: <Briefcase className="w-6 h-6" />, color: 'bg-red-100' },
    { name: 'Education', icon: <Users className="w-6 h-6" />, color: 'bg-yellow-100' },
    { name: 'Engineering', icon: <Building2 className="w-6 h-6" />, color: 'bg-indigo-100' },
    { name: 'Customer Service', icon: <Search className="w-6 h-6" />, color: 'bg-orange-100' }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="absolute inset-0 opacity-15 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center" />
        <div className="container mx-auto px-4 py-24 md:py-32 relative">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { staggerChildren: 0.2 }
              }
            }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              variants={fadeIn}
            >
              Launch Your <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">Career</span> Journey
            </motion.h1>
            <motion.p 
              className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed"
              variants={fadeIn}
            >
              Transform your career path with AI-powered job matching and personalized opportunities
            </motion.p>
            
            <motion.div
              variants={fadeIn}
              className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-2xl"
            >
              <JobSearchBar />
            </motion.div>

            <motion.div 
              className="mt-8 flex flex-wrap justify-center gap-4"
              variants={fadeIn}
            >
              <Link 
                to="/jobs" 
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-semibold transition-all shadow-lg hover:shadow-indigo-500/30 flex items-center gap-2"
              >
                <Briefcase className="w-5 h-5" />
                Explore Opportunities
              </Link>
              <Link 
                to="/register" 
                className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition-all shadow-lg hover:shadow-white/10 flex items-center gap-2"
              >
                <Rocket className="w-5 h-5" />
                Get Started Free
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-center text-indigo-600 mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">{stat.count}</h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl font-bold text-gray-900 mb-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              Featured Opportunities
            </motion.h2>
            <motion.p 
              className="text-gray-600 text-lg max-w-2xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              variants={fadeIn}
            >
              Discover hand-picked positions from innovative companies
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group border border-gray-100"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                variants={fadeIn}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3 rounded-xl ${['bg-purple-100', 'bg-blue-100', 'bg-pink-100'][index % 3]}`}>
                      <Briefcase className="w-6 h-6 text-indigo-600" />
                    </div>
                    <span className="px-4 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium">
                      {['Full-time', 'Remote', 'Hybrid', 'Contract'][index % 4]}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {[
                      'Senior Software Engineer', 
                      'UX/UI Designer', 
                      'Marketing Director', 
                      'Product Manager',
                      'Data Scientist',
                      'Financial Analyst'
                    ][index % 6]}
                  </h3>
                  <div className="mb-6">
                    <p className="text-gray-600 font-medium">
                      {['TechSphere', 'DesignHub', 'MarketGenius', 'ProductIQ', 'DataMinds', 'FinanceElite'][index % 6]}
                    </p>
                    <p className="text-sm text-gray-500 mt-2 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {['San Francisco', 'Remote', 'New York', 'London', 'Berlin', 'Tokyo'][index % 6]}
                    </p>
                  </div>
                  <div className="mb-6">
                    <p className="text-indigo-600 font-bold text-lg">
                      ${['120K', '95K', '85K', '110K', '130K', '90K'][index % 6]} - 
                      ${['150K', '120K', '100K', '130K', '160K', '110K'][index % 6]}
                      <span className="text-gray-500 text-sm font-normal"> / year</span>
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['React', 'Node.js', 'TypeScript', 'UI/UX', 'Marketing', 'Finance'].slice(0, 3).map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/jobs/${index + 1}`}
                    className="block w-full text-center py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors font-medium shadow-sm hover:shadow-indigo-500/30"
                  >
                    Explore Position
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="mt-12 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <Link
              to="/jobs"
              className="inline-flex items-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-indigo-500/30 transition-all"
            >
              <Search className="mr-2 w-5 h-5" />
              View All Opportunities
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl font-bold text-gray-900 mb-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              Explore Career Paths
            </motion.h2>
            <motion.p 
              className="text-gray-600 text-lg max-w-2xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              variants={fadeIn}
            >
              Discover opportunities across diverse industries and specialties
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer group border border-gray-100"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                <div className={`${category.color} p-3 rounded-xl w-max mb-4`}>
                  {category.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-lg group-hover:text-indigo-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  {['Tech', 'Creative', 'Business', 'Finance', 'Health', 'Education', 'Engineering', 'Service'][index]} Roles
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-indigo-900 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              className="text-3xl font-bold mb-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              Ready for Career Transformation?
            </motion.h2>
            <motion.p 
              className="text-blue-200 text-lg mb-8 leading-relaxed"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              variants={fadeIn}
            >
              Join our community of professionals and unlock your potential with personalized career solutions
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              variants={fadeIn}
            >
              <Link
                to="/register"
                className="px-8 py-4 bg-white text-indigo-600 hover:bg-indigo-50 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
              >
                <Rocket className="w-5 h-5" />
                Start Free Trial
              </Link>
              <Link
                to="/jobs"
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                Browse Jobs
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;