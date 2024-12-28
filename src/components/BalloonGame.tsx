import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];
const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'pink', 'orange', 'cyan'];

const BalloonGame = () => {
  const audioContext = useRef<AudioContext | null>(null);

  useEffect(() => {
    audioContext.current = new AudioContext();
    return () => {
      audioContext.current?.close();
    };
  }, []);

  const playNote = (note: string) => {
    if (!audioContext.current) return;
    
    const freq = noteToFreq(note);
    const oscillator = audioContext.current.createOscillator();
    const gainNode = audioContext.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.current.destination);
    
    oscillator.frequency.value = freq;
    gainNode.gain.setValueAtTime(0.5, audioContext.current.currentTime);
    
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + 1);
    oscillator.stop(audioContext.current.currentTime + 1);
  };

  const noteToFreq = (note: string): number => {
    const noteMap: { [key: string]: number } = {
      'C4': 261.63, 'D4': 293.66, 'E4': 329.63,
      'F4': 349.23, 'G4': 392.00, 'A4': 440.00,
      'B4': 493.88, 'C5': 523.25
    };
    return noteMap[note];
  };

  return (
    <div className="grid grid-cols-4 gap-4 my-8">
      {notes.map((note, index) => (
        <motion.div
          key={note}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => playNote(note)}
          className="cursor-pointer w-20 h-32 rounded-full mx-auto relative"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${colors[index]}, darkest${colors[index]})`,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-6 bg-gray-700 rounded-t-lg" />
        </motion.div>
      ))}
    </div>
  );
};

export default BalloonGame;