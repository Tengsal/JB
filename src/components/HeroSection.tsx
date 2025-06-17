import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const rotatingWords = ['Dream Job', 'Next Role', 'Tech Career', 'Ideal Position', 'Future Team'];

const HeroSection: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mb-20 px-4">
      <div className="text-center max-w-3xl mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Land Your{' '}
          <span className="inline-block relative w-[200px] h-[50px] align-middle">
            <AnimatePresence mode="wait">
              <motion.span
                key={rotatingWords[currentWordIndex]}
                className="absolute top-0 left-0 w-full text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 text-2xl md:text-3xl font-semibold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {rotatingWords[currentWordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>{' '}
          Today
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-gray-400 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Discover top opportunities aligned with your goals. We match your talents with companies that value your growth and reward your journey.
        </motion.p>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Optional: Add a call-to-action button */}
          <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 text-white rounded-xl text-base font-medium shadow-lg">
            Get Started
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
