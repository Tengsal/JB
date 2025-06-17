import { motion } from 'framer-motion';
import {
  Gift,
  Trophy,
  User,
  Star,
  BadgeCheck,
  Rocket
} from 'lucide-react';
import React from 'react';

type GamificationSectionProps = {
  darkMode: boolean;
};

const GamificationSection: React.FC<GamificationSectionProps> = ({ darkMode }) => {
  return (
    <section className={`py-16 ${darkMode ? 'bg-gradient-to-b from-gray-900 to-gray-800' : 'bg-gradient-to-b from-indigo-50 to-purple-50'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Level Up Your Career
          </motion.h2>
          <motion.p
            className="text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Earn rewards, unlock achievements, and accelerate your job search journey
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center mb-6">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Earn Rewards</h3>
            <p className="text-gray-500 mb-4">
              Get points for every action you take on your job search journey
            </p>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-medium">Exchange points for career resources</span>
            </div>
          </motion.div>

          <motion.div
            className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mb-6">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Unlock Achievements</h3>
            <p className="text-gray-500 mb-4">
              Complete milestones in your job search and showcase your progress
            </p>
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-5 h-5 text-green-500" />
              <span className="font-medium">Boost your profile visibility</span>
            </div>
          </motion.div>

          <motion.div
            className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center mb-6">
              <User className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3">Personalized Journey</h3>
            <p className="text-gray-500 mb-4">
              Get tailored job recommendations based on your skills and preferences
            </p>
            <div className="flex items-center gap-2">
              <Rocket className="w-5 h-5 text-blue-500" />
              <span className="font-medium">Accelerate your career growth</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GamificationSection;
