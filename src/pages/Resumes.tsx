import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, BookOpen, Folder, Cpu, Award } from 'lucide-react';
import { useEditMode } from '../context/EditContext';
import { ElegantCard } from '../components/GlassCard';
import { EditableText } from '../components/EditableText';

const domains = [
  { id: 'experience', title: 'Experience', icon: Briefcase },
  { id: 'education', title: 'Education', icon: BookOpen },
  { id: 'projects', title: 'Projects', icon: Folder },
  { id: 'skills', title: 'Skills', icon: Cpu },
  { id: 'certifications', title: 'Certifications', icon: Award },
];

const Resumes = () => {
  const [selectedDomain, setSelectedDomain] = useState(domains[0]);
  const { content, isEditMode } = useEditMode();

  const renderContent = () => {
    switch (selectedDomain.id) {
      case 'experience':
        return (
          <div className="space-y-8">
            {content.experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-6 border-l-2 border-gold-400/30"
              >
                <div className="absolute left-0 top-1 w-2.5 h-2.5 -translate-x-[6px] rounded-full bg-gold-400" />
                <h3 className="text-lg font-serif text-ink-700">
                  {isEditMode ? (
                    <EditableText path={`experience.${index}.role`} />
                  ) : (
                    exp.role
                  )}
                </h3>
                <p className="text-gold-400 text-sm">
                  {isEditMode ? (
                    <EditableText path={`experience.${index}.company`} />
                  ) : (
                    exp.company
                  )}
                </p>
                <p className="text-ink-700/50 text-sm mb-2">{exp.period}</p>
                <p className="text-ink-700/70">
                  {isEditMode ? (
                    <EditableText path={`experience.${index}.description`} multiline />
                  ) : (
                    exp.description
                  )}
                </p>
              </motion.div>
            ))}
          </div>
        );

      case 'education':
        return (
          <div className="space-y-8">
            {content.education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-6 border-l-2 border-gold-400/30"
              >
                <div className="absolute left-0 top-1 w-2.5 h-2.5 -translate-x-[6px] rounded-full bg-gold-400" />
                <h3 className="text-lg font-serif text-ink-700">{edu.degree}</h3>
                <p className="text-gold-400 text-sm">{edu.institution}</p>
                {edu.period && <p className="text-ink-700/50 text-sm">{edu.period}</p>}
                {edu.description && <p className="text-ink-700/70 mt-2">{edu.description}</p>}
              </motion.div>
            ))}
          </div>
        );

      case 'projects':
        return (
          <div className="grid gap-6 md:grid-cols-2">
            {content.projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ElegantCard>
                  <div className="p-5">
                    <h3 className="font-serif text-ink-700 mb-2">{project.title}</h3>
                    <p className="text-ink-700/70 text-sm mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="px-2 py-0.5 text-xs bg-parchment-200 text-ink-700/60 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </ElegantCard>
              </motion.div>
            ))}
          </div>
        );

      case 'skills':
        const skillsByCategory = content.skills.reduce((acc, skill) => {
          if (!acc[skill.category]) acc[skill.category] = [];
          acc[skill.category].push(skill.name);
          return acc;
        }, {} as Record<string, string[]>);

        return (
          <div className="space-y-8">
            {Object.entries(skillsByCategory).map(([category, skills], catIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: catIndex * 0.1 }}
              >
                <h3 className="text-sm uppercase tracking-wider text-gold-400 mb-4">{category}</h3>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-white border border-stone-200 rounded text-sm text-ink-700/70"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        );

      case 'certifications':
        return (
          <div className="grid gap-4 md:grid-cols-2">
            {content.certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ElegantCard>
                  <div className="p-5 flex items-start gap-4">
                    <div className="p-2 bg-parchment-200 rounded">
                      <Award className="w-5 h-5 text-gold-400" />
                    </div>
                    <div>
                      <h3 className="font-serif text-ink-700">{cert.name}</h3>
                      <p className="text-ink-700/60 text-sm">{cert.issuer}</p>
                    </div>
                  </div>
                </ElegantCard>
              </motion.div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-parchment-100">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-serif text-center mb-12 text-ink-700"
        >
          Professional Experience
        </motion.h1>

        {/* Domain Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {domains.map((domain, index) => {
            const Icon = domain.icon;
            const isActive = domain.id === selectedDomain.id;

            return (
              <motion.button
                key={domain.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedDomain(domain)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded text-sm transition-all
                  ${isActive
                    ? 'bg-gold-400 text-white'
                    : 'bg-white border border-stone-200 text-ink-700/70 hover:border-gold-400 hover:text-gold-500'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{domain.title}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDomain.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ElegantCard hover={false}>
              <div className="p-8">
                <h2 className="text-xl font-serif mb-8 text-ink-700 heading-accent">
                  {selectedDomain.title}
                </h2>
                {renderContent()}
              </div>
            </ElegantCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Resumes;
