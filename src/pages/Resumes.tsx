import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Palette, BookOpen, Building2 } from 'lucide-react';

const domains = [
  {
    id: 'tech',
    title: 'Technology',
    icon: Code,
    color: 'bg-blue-100',
    resume: {
      title: 'Software Engineer',
      experience: [
        {
          role: 'Senior Developer',
          company: 'Tech Corp',
          period: '2020-Present',
          description: 'Led development of enterprise applications',
        },
        // Add more experiences
      ],
    },
  },
  {
    id: 'design',
    title: 'Design',
    icon: Palette,
    color: 'bg-purple-100',
    resume: {
      title: 'UI/UX Designer',
      experience: [
        {
          role: 'Lead Designer',
          company: 'Creative Studio',
          period: '2018-2020',
          description: 'Designed user interfaces for mobile applications',
        },
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
          role: 'Computer Science',
          company: 'University Name',
          period: '2014-2018',
          description: 'Bachelor\'s degree with honors',
        },
      ],
    },
  },
  {
    id: 'business',
    title: 'Business',
    icon: Building2,
    color: 'bg-amber-100',
    resume: {
      title: 'Business Development',
      experience: [
        {
          role: 'Project Manager',
          company: 'Business Solutions',
          period: '2016-2018',
          description: 'Managed client relationships and project delivery',
        },
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
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
                } ${
                  domain.color
                } p-6 rounded-lg text-center transition-all duration-300`}
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