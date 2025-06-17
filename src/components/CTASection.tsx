import { motion } from 'framer-motion';
import { Rocket, Search } from 'lucide-react';
import React from 'react';

const CTASection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-indigo-900 to-purple-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center" />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Ready for Career Transformation?
          </motion.h2>
          <motion.p
            className="text-blue-200 text-lg mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Join our community of professionals and unlock your potential with personalized career solutions
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-indigo-600 hover:bg-indigo-50 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
            >
              <Rocket className="w-5 h-5" />
              Start Free Trial
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              Browse Jobs
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
