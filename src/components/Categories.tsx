import { motion } from 'framer-motion';
import {
  Zap,
  Rocket,
  Award,
  TrendingUp,
  Briefcase,
  Users,
  Building2,
  Search,
  LucideIcon
} from 'lucide-react';
import React from 'react';

type Category = {
  name: string;
  icon: keyof typeof iconComponents; // ensures only valid icon keys
  color: string;
};

type CategoriesProps = {
  darkMode: boolean;
  categories: Category[];
};

const iconComponents: Record<string, LucideIcon> = {
  Zap,
  Rocket,
  Award,
  TrendingUp,
  Briefcase,
  Users,
  Building2,
  Search
};

const Categories: React.FC<CategoriesProps> = ({ darkMode, categories }) => {
  return (
    <motion.div
      key="categories"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-6"
    >
      {categories.map((category, index) => {
        const Icon = iconComponents[category.icon];

        return (
          <motion.div
            key={index}
            className={`rounded-xl p-6 cursor-pointer group ${
              darkMode
                ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700'
                : 'bg-white border border-gray-200'
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{
              y: -5,
              backgroundColor: darkMode ? 'rgb(55, 65, 81)' : 'rgb(249, 250, 251)'
            }}
          >
            <div className={`${category.color} p-3 rounded-xl w-max mb-4`}>
              {Icon && <Icon className="w-6 h-6" />}
            </div>
            <h3 className="font-bold text-lg mb-1">{category.name}</h3>
            <p className="text-sm text-gray-500">245 jobs available</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default Categories;
