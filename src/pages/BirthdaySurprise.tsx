import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Cake, Gift, Heart, Music, PartyPopper } from 'lucide-react';
import BalloonGame from '../components/BalloonGame';
import BirthdayCountdown from '../components/BirthdayCountdown';
import { isBirthday } from '../utils/dateUtils';

// Function to play Happy Birthday song
const playHappyBirthday = () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const notes = [
    { note: 'C4', duration: 400 },
    { note: 'C4', duration: 400 },
    { note: 'D4', duration: 800 },
    { note: 'C4', duration: 800 },
    { note: 'F4', duration: 800 },
    { note: 'E4', duration: 1600 },
    { note: 'C4', duration: 400 },
    { note: 'C4', duration: 400 },
    { note: 'D4', duration: 800 },
    { note: 'C4', duration: 800 },
    { note: 'G4', duration: 800 },
    { note: 'F4', duration: 1600 },
  ];

  const playNote = (note, duration) => {
    const oscillator = audioContext.createOscillator();
    const frequency = getFrequency(note);
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration / 1000);
  };

  const getFrequency = (note) => {
    const frequencies = {
      C4: 261.63,
      D4: 293.66,
      E4: 329.63,
      F4: 349.23,
      G4: 392.00,
    };
    return frequencies[note] || 440.00; // Default to A4 if note not found
  };

  // Play the song by iterating over the notes
  notes.forEach((note, index) => {
    setTimeout(() => {
      playNote(note.note, note.duration);
    }, index * 1000);
  });
};

const BirthdaySurprise = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [emojis, setEmojis] = useState(['<3', '(✿◡‿◡)', ' ~(=^‥^)ノ', '❤️', '💌']);

  const isActualBirthday = isBirthday();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
      if (isActualBirthday) {
        launchConfetti();
        playHappyBirthday(); // Play Happy Birthday sound on birthday
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isActualBirthday]);

  const launchConfetti = () => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const icons = [Cake, Gift, Heart, Music, PartyPopper];
  const bgColor = isActualBirthday
    ? 'bg-gradient-to-br from-pink-500 via-red-500 to-pink-500'
    : 'bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500';

  const rainingEmojis = emojis.map((emoji, index) => (
    <motion.div
      key={index}
      className="absolute"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${-Math.random() * 100}px`,
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: '100vh', opacity: 1 }}
      transition={{
        duration: Math.random() * 5 + 5,
        repeat: Infinity,
        delay: Math.random() * 2,
      }}
    >
      <span className="text-4xl">{emoji}</span>
    </motion.div>
  ));

  return (
    <div className={`min-h-screen pt-16 relative overflow-hidden ${bgColor}`}>
      {/* Raining Emojis */}
      {rainingEmojis}

      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-white">
        <AnimatePresence>
          {showMessage && (
            <>
              <BirthdayCountdown />

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="mb-12"
              >
                <h1
                  className={`text-6xl md:text-8xl font-bold mb-8 animate-bounce ${
                    isActualBirthday ? 'text-pink-400' : 'text-white'
                  }`}
                >
                  {isActualBirthday
                    ? `🎉 Happy Birthday, Shreya! 🎉`
                    : 'Birthday Countdown'}
                </h1>
              </motion.div>

              <div className="grid grid-cols-5 gap-4 mb-12">
                {icons.map((Icon, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.2 }}
                    className="flex justify-center"
                  >
                    <Icon
                      className={`h-12 w-12 animate-pulse ${
                        isActualBirthday ? 'text-pink-400' : 'text-white'
                      }`}
                    />
                  </motion.div>
                ))}
              </div>

              <BalloonGame />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="space-y-6 text-xl"
              >
                <p className="leading-relaxed">
                  {isActualBirthday
                    ? 'Today is your special day, Shreya! Make it memorable!'
                    : 'Try out playing Happy Birthday now, or wait until the 19th ;)'}
                </p>
                {isActualBirthday && (
                  <p className="text-2xl font-bold text-pink-400">
                    🎂 Make a wish! ✨
                  </p>
                )}
              </motion.div>

              {isActualBirthday && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                  onClick={launchConfetti}
                  className="mt-12 px-8 py-4 bg-white text-pink-600 rounded-full text-xl font-bold hover:bg-opacity-90 transition-colors"
                >
                  More Confetti! 🎊
                </motion.button>
              )}
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BirthdaySurprise;
