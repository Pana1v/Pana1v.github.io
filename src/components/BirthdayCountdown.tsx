import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getTimeUntilBirthday, isBirthday } from '../utils/dateUtils';

// Shreya's birthdate
const birthDate = new Date('2004-1-19'); // Birthdate: 29th December 2003

const BirthdayCountdown = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilBirthday());
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  
  // Calculate Shreya's age based on her birthdate and the current year
  const age = currentYear - birthDate.getFullYear();
  const hasHadBirthdayThisYear = currentDate >= new Date(currentYear, birthDate.getMonth(), birthDate.getDate());
  
  const ageOnBirthday = hasHadBirthdayThisYear ? age : age - 1;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeUntilBirthday());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (isBirthday()) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gold-400 mb-8"
      >
        🎉 It's Shreya's Birthday! 🎉
        <p className="text-xl font-bold mt-4">Shreya is now {ageOnBirthday} years old! 🎂</p>
      </motion.div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-4">Time Until Shreya's Next Birthday ✨</h2>
      <div className="grid grid-cols-4 gap-4">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <motion.div
            key={unit}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white bg-opacity-20 rounded-lg p-4 text-center"
          >
            <div className="text-3xl font-bold text-white">{value}</div>
            <div className="text-sm text-white capitalize">{unit}</div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-white mt-8"
      >
        Shreya will turn {ageOnBirthday + 1} years old on her birthday! 🎉
      </motion.div>
    </div>
  );
};

export default BirthdayCountdown;
