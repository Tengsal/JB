import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import UserProgress from '../components/UserProgress';
import HeroSection from '../components/HeroSection';
import StatsSection  from '../components/StatsSection'; // Use the defaultStats
import TabsSection from '../components/TabsSection';
import GamificationSection from '../components/GamificationSection';
import CTASection from '../components/CTASection';

const JobBoard = () => {
  const [darkMode] = useState(true);
  const [userPoints, setUserPoints] = useState(1250);
  const userLevel = 3;
  const [showAchievementNotification, setShowAchievementNotification] = useState(false);
  const [currentNotification, setCurrentNotification] = useState({ title: '', description: '' });

  useEffect(() => {
    const achievementTimeout = setTimeout(() => {
      setCurrentNotification({ title: 'Job Explorer', description: 'Viewed 5 job listings' });
      setShowAchievementNotification(true);
      setUserPoints(prev => prev + 50);
      setTimeout(() => setShowAchievementNotification(false), 4000);
    }, 3000);

    return () => clearTimeout(achievementTimeout);
  }, []);

  const categories = [
    { id: '1', name: 'Technology', icon: 'Zap', color: 'bg-purple-100 text-purple-600' },
    { id: '2', name: 'Marketing', icon: 'Rocket', color: 'bg-pink-100 text-pink-600' },
    { id: '3', name: 'Design', icon: 'Award', color: 'bg-blue-100 text-blue-600' },
    { id: '4', name: 'Finance', icon: 'TrendingUp', color: 'bg-green-100 text-green-600' },
    { id: '5', name: 'Healthcare', icon: 'Briefcase', color: 'bg-red-100 text-red-600' },
    { id: '6', name: 'Education', icon: 'Users', color: 'bg-yellow-100 text-yellow-600' },
    { id: '7', name: 'Engineering', icon: 'Building2', color: 'bg-indigo-100 text-indigo-600' },
    { id: '8', name: 'Customer Service', icon: 'Search', color: 'bg-orange-100 text-orange-600' },
  ];

  const jobListings = [
    {
      id: '1',
      title: 'Senior UX Designer',
      company: 'TechVision',
      location: 'Remote',
      salary: '$90K - $120K',
      tags: ['Figma', 'UI/UX', 'Prototyping'],
      isNew: true,
      isHot: true,
    },
    {
      id: '2',
      title: 'Frontend Developer',
      company: 'WebCraft',
      location: 'San Francisco, CA',
      salary: '$110K - $140K',
      tags: ['React', 'TypeScript', 'NextJS'],
      isNew: false,
      isHot: true,
    },
    {
      id: '3',
      title: 'Data Scientist',
      company: 'DataMinds',
      location: 'New York, NY',
      salary: '$120K - $150K',
      tags: ['Python', 'ML', 'TensorFlow'],
      isNew: true,
      isHot: false,
    },
    {
      id: '4',
      title: 'Product Manager',
      company: 'ProductLabs',
      location: 'Austin, TX',
      salary: '$100K - $130K',
      tags: ['Agile', 'Scrum', 'Product Strategy'],
      isNew: false,
      isHot: false,
    },
  ];

  const achievementsData = [
    { id: 1, title: 'First Application', description: 'You successfully submitted your first job application!', points: 50, earned: true },
    { id: 2, title: 'Profile Completer', description: 'Your profile is now 100% complete. Well done!', points: 100, earned: true },
    { id: 3, title: 'Job Explorer', description: 'You have viewed 5 job listings. Keep exploring!', points: 50, earned: true },
    { id: 4, title: 'Interview Ace', description: 'Ace that interview and this badge is yours!', points: 200, earned: false },
    { id: 5, title: 'Top Candidate', description: 'Become a top candidate to unlock this achievement.', points: 300, earned: false },
  ];

  const applyForJob = () => {
    setUserPoints(prev => prev + 25);
    setCurrentNotification({ title: 'First Application', description: 'Applied for your first job!' });
    setShowAchievementNotification(true);
    setTimeout(() => setShowAchievementNotification(false), 4000);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <AnimatePresence>
        {showAchievementNotification && (
          <motion.div
            key="achievement-notification"
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%', transition: { duration: 0.3 } }}
            className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-xl z-50 w-auto max-w-md
                        ${darkMode ? 'bg-gray-800 text-white border border-gray-700' : 'bg-white text-gray-800 border border-gray-200'}`}
          >
            <div className="flex items-center">
              <Trophy className={`w-6 h-6 mr-3 flex-shrink-0 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
              <div>
                <h3 className="font-bold text-lg">{currentNotification.title}</h3>
                {currentNotification.description && <p className="text-sm">{currentNotification.description}</p>}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="container mx-auto px-4 py-8">
        <UserProgress darkMode={darkMode} userLevel={userLevel} userPoints={userPoints} />

        <HeroSection />

        <StatsSection darkMode={darkMode}  />  {/* Use defaultStats here */}

        <TabsSection
          darkMode={darkMode}
          jobListings={jobListings}
          categories={categories}
          achievements={achievementsData}
          applyForJob={applyForJob}
        />
      </main>

      <GamificationSection darkMode={darkMode} />
      <CTASection />
    </div>
  );
};

export default JobBoard;