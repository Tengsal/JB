import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import googleLogo from '/logos/google.png';      // Import the Google logo
import microsoftLogo from '/logos/microsoft.png'; // Import the Microsoft logo
import amazonLogo from '/logos/Amazon.png';       // Import the Amazon logo
import appleLogo from '/logos/apple.png';         // Import the Apple logo

interface StatItem {
  logo: {
    src: string;
    alt: string;
  };
}

interface StatsSectionProps {
  darkMode: boolean;
}

const StatsSection: React.FC<StatsSectionProps> = ({ darkMode }) => {
  const stats: StatItem[] = [
    { logo: { src: googleLogo, alt: "Google" } },
    { logo: { src: microsoftLogo, alt: "Microsoft" } },
    { logo: { src: amazonLogo, alt: "Amazon" } },
    { logo: { src: appleLogo, alt: "Apple" } }, // All logos imported directly
  ];

  const duplicatedStats = [...stats, ...stats];
  const [currentIndex, setCurrentIndex] = useState(0);
  const statsCount = duplicatedStats.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % statsCount);
    }, 3000);

    return () => clearInterval(interval);
  }, [statsCount]);

  return (
    <section className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Trusted by Industry Leaders
          </motion.h2>
          <motion.p
            className={`mt-4 max-w-2xl mx-auto text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Join thousands of companies and professionals already using our platform.
          </motion.p>
        </div>

        {/* Logos Carousel */}
        <div className="relative w-full overflow-hidden py-8 mb-16">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${(currentIndex * 100) / statsCount}%)` }}
          >
            {duplicatedStats.map((stat, index) => (
              <motion.div
                key={index}
                className={`p-8 rounded-xl shadow-lg mx-4 w-64 flex-shrink-0 flex items-center justify-center ${
                  darkMode
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700'
                    : 'bg-white border border-gray-200'
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
              >
                <img
                  src={stat.logo.src}  // Displaying logo directly from the imported source
                  alt={stat.logo.alt}
                  className="h-10 object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;