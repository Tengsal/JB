import { motion } from 'framer-motion';
import { BadgeCheck, Star } from 'lucide-react';

type UserProgressProps = {
  darkMode: boolean;
  userLevel: number;
  userPoints: number;
};

const UserProgress: React.FC<UserProgressProps> = ({ darkMode, userLevel, userPoints }) => {
  const progressPercent = Math.min((userLevel / 10) * 100, 100);
  const pointsToNextLevel = 2000 - userPoints;

  return (
    <div className={`mb-8 p-5 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-indigo-50'}`}>
            <BadgeCheck className="w-5 h-5 text-yellow-500" />
          </div>
          <h2 className="text-lg font-bold">Your Career Journey</h2>
        </div>
        <div className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-1.5 rounded-full">
          <Star className="w-4 h-4" />
          <span className="font-medium">{userPoints} pts</span>
        </div>
      </div>
      
      {/* Progress section */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500">Level {userLevel}</span>
          <span className="text-sm font-medium text-gray-500">Level {userLevel + 1}</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <motion.div 
            className="bg-gradient-to-r from-green-400 to-emerald-500 h-2.5 rounded-full"
            style={{ width: `${progressPercent}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1 }}
          />
        </div>
        
        <div className="text-right">
          <span className="text-xs text-indigo-500 font-medium">
            {pointsToNextLevel} pts to next level
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserProgress;