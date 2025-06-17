// Achievements.tsx (remains unchanged, provided for completeness)
import { motion } from 'framer-motion';
import { Trophy, BadgeCheck, Star } from 'lucide-react';
import React from 'react';

type Achievement = {
  id: number;
  title: string;
  points: number;
  earned: boolean;
};

type AchievementsProps = {
  darkMode: boolean;
  achievements: Achievement[];
};

const Achievements: React.FC<AchievementsProps> = ({ darkMode, achievements }) => {
  return (
    <motion.div
      key="achievements-list-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {achievements.map((achievement) => (
        <motion.div
          key={achievement.id}
          className={`rounded-2xl p-6 ${
            achievement.earned
              ? 'bg-gradient-to-br from-indigo-500/10 to-purple-600/10 border border-indigo-500/30'
              : darkMode
              ? 'bg-gray-800 border border-gray-700 opacity-60'
              : 'bg-gray-100 border border-gray-200 opacity-60'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: achievement.id * 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${achievement.earned ? 'bg-yellow-500' : darkMode ? 'bg-gray-600' : 'bg-gray-300'}`}>
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{achievement.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{achievement.points} points</span>
              </div>
            </div>
            {achievement.earned && (
              <div className="ml-auto">
                <BadgeCheck className="w-6 h-6 text-green-500" />
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Achievements;