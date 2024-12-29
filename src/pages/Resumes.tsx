import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Palette, BookOpen, Building2, Brain, Cpu  } from 'lucide-react';

const domains = [
  {
    id: 'tech',
    title: 'Technology',
    icon: Code,
    color: 'bg-blue-100',
    resume: {
      title: 'Software Engineering & Robotics',
      experience: [
        {
          role: 'Mobile Robotics Intern',
          company: 'Addverb Technologies',
          period: 'May 2024 – August 2024',
          description: 'Developed and tested localization and mapping algorithms for Autonomous Mobile Robots (AMR) using LIDAR and cameras.',
        },
        {
          role: 'BTech Project: Autonomous Robot Navigation & SLAM',
          company: 'IIT Patna',
          period: 'May 2024 – August 2024',
          description: 'Implemented ORB SLAM on a monocular camera and RTAB-Map with a depth camera for mapping and localization.',
        },
        // Additional experiences here
      ],
    },
  },
  {
    id: 'design',
    title: 'Design',
    icon: Palette,
    color: 'bg-purple-100',
    resume: {
      title: 'UI/UX Design & Robotics Integration',
      experience: [
        {
          role: 'Team Captain, ABU Robocon & Rover Team',
          company: 'IIT Patna',
          period: 'Dec 2022 – May 2023',
          description: 'Led a team of 60 students for ABU Robocon, designed and developed a lunar rover prototype for ISRO Robotics Challenge.',
        },
        // Additional experiences here
      ],
    },
  },
  {
    id: 'education',
    title: 'Education',
    icon: BookOpen,
    color: 'bg-green-100',
    resume: {
      title: 'Academic Background',
      experience: [
        {
          role: 'B.Tech in Electrical & Electronics Engineering',
          company: 'IIT Patna',
          period: '2020-Present',
          description: 'CPI: 7.5',
        },
        {
          role: 'Indian School Certificate (ISC)',
          company: 'Clarence High School',
          period: '2019-2020',
          description: 'Percentage: 95.5%',
        },
      ],
    },
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: Building2,
    color: 'bg-amber-100',
    resume: {
      title: 'Key Projects',
      experience: [
        {
          role: 'ISRO USRC Lunar Elemental Mapping',
          company: 'Inter IIT Tech Meet 13.0',
          period: 'Ongoing',
          description: 'Conducting multi-shot super-resolution on lunar X-Ray fluorescence data, enhancing spatial resolution in mapping elemental distribution.',
        },
        {
          role: 'Flipkart Grid Robotics',
          company: 'Flipkart',
          period: 'Sept – Oct 2024',
          description: 'Utilized Mistral LLM and PyTorch models for product text extraction and freshness assessment of consumables.',
        },
        // Additional projects here
      ],
    },
  },
  {
    id: 'skills',
    title: 'Technical Skills',
    icon: Microchip,
    color: 'bg-pink-100',
    resume: {
      title: 'Core Skills',
      experience: [
        {
          role: 'Programming Languages',
          company: 'Skills',
          period: '',
          description: 'C/C++, Python, Java, MATLAB',
        },
        {
          role: 'Technologies',
          company: 'Technologies',
          period: '',
          description: 'Docker, ROS (1 and 2), OpenCV, Linux, SQL, PyTorch, YOLO (V9, V11), TensorFlow',
        },
        // Additional skills here
      ],
    },
  },
  {
    id: 'certifications',
    title: 'Certifications',
    icon: Brain,
    color: 'bg-teal-100',
    resume: {
      title: 'Certifications & Achievements',
      experience: [
        {
          role: 'Deep Learning: Model Optimization and Tuning',
          company: 'LinkedIn',
          period: '',
          description: '',
        },
        {
          role: 'Fundamentals of Accelerated Data Science with RAPIDS',
          company: 'Nvidia',
          period: '',
          description: '',
        },
        // Additional certifications here
      ],
    },
  },
];

const Resumes = () => {
  const [selectedDomain, setSelectedDomain] = useState(domains[0]);

  return (
    <div className="min-h-screen pt-20 pb-12 bg-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-stone-800 mb-12 text-center"
        >
          Professional Experience
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
          {domains.map((domain) => {
            const Icon = domain.icon;
            return (
              <motion.button
                key={domain.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDomain(domain)}
                className={`${
                  domain.id === selectedDomain.id
                    ? 'ring-2 ring-stone-800'
                    : ''
                } ${domain.color} p-6 rounded-lg text-center transition-all duration-300`}
              >
                <Icon className="h-8 w-8 mx-auto mb-2" />
                <h3 className="font-semibold">{domain.title}</h3>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDomain.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white p-8 rounded-lg shadow-xl"
          >
            <h2 className="text-3xl font-bold mb-6">{selectedDomain.resume.title}</h2>
            <div className="space-y-8">
              {selectedDomain.resume.experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-l-4 border-stone-800 pl-4"
                >
                  <h3 className="font-bold text-xl">{exp.role}</h3>
                  <p className="text-stone-600">{exp.company}</p>
                  <p className="text-stone-500 text-sm">{exp.period}</p>
                  <p className="mt-2">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Resumes;
