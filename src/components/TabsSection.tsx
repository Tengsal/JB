import { useState } from 'react';
import { AnimatePresence } from 'framer-motion'; // Removed 'motion' as it's not directly used here

import JobListings from './JobListings';
import Categories from './Categories';
import Achievements from './Achievements'; // Assuming this is your component for displaying achievements

// TypeScript types (assuming these are accurate for your project)
type JobListing = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  tags: string[];
  isNew: boolean;
  isHot: boolean;
};

type Category = {
  id: string;
  name: string;
  icon: string; // Assuming icon is a string (e.g., SVG name or class)
  color: string;
};

type Achievement = {
  id: number;
  title: string;
  points: number;
  earned: boolean;
  description?: string; // Added description as it's often part of achievements
};

type TabsSectionProps = {
  darkMode: boolean;
  jobListings: JobListing[];
  categories: Category[];
  achievements: Achievement[];
  applyForJob: () => void;
};

const TabsSection = ({
  darkMode,
  jobListings,
  categories,
  achievements,
  applyForJob
}: TabsSectionProps) => {
  const [activeTab, setActiveTab] = useState('jobs');

  const getButtonClasses = (tabName: string) => {
    return `px-6 py-3 font-medium rounded-t-lg transition-colors duration-150 ${
      activeTab === tabName
        ? `border-b-2 ${darkMode ? 'border-indigo-400 text-indigo-400' : 'border-indigo-600 text-indigo-600'}`
        : `${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-800'}`
    }`;
  };

  return (
    <section className="py-8">
      <div className={`flex border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} mb-8`}>
        <button
          className={getButtonClasses('jobs')}
          onClick={() => setActiveTab('jobs')}
          aria-pressed={activeTab === 'jobs'}
        >
          Job Listings
        </button>
        <button
          className={getButtonClasses('categories')}
          onClick={() => setActiveTab('categories')}
          aria-pressed={activeTab === 'categories'}
        >
          Categories
        </button>
        <button
          className={getButtonClasses('achievements')}
          onClick={() => setActiveTab('achievements')}
          aria-pressed={activeTab === 'achievements'}
        >
          Achievements
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'jobs' && (
          <JobListings
            key="jobs" // Add key for AnimatePresence children
            darkMode={darkMode}
            jobListings={jobListings}
            applyForJob={applyForJob}
          />
        )}

        {activeTab === 'categories' && (
          <Categories
            key="categories" // Add key for AnimatePresence children
            darkMode={darkMode}
            categories={categories}
          />
        )}

        {activeTab === 'achievements' && (
          <Achievements
            key="achievements" // Add key for AnimatePresence children
            darkMode={darkMode}
            achievements={achievements}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default TabsSection;