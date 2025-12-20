import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEditMode } from '../context/EditContext';
import { EditableText } from '../components/EditableText';
import { ElegantCard } from '../components/GlassCard';
import profileImage from '../images/x.jpg';

const Home = () => {
  const { content, isEditMode } = useEditMode();

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex flex-col items-center text-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <img
              src={profileImage}
              alt={content.personal.name}
              className="w-36 h-36 lg:w-44 lg:h-44 rounded-full object-cover profile-elegant"
            />
          </motion.div>

          {/* Hero Text */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl lg:text-5xl font-serif font-normal mb-4 text-ink-700"
          >
            <EditableText path="personal.name" />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gold-400 mb-6 font-serif italic"
          >
            <EditableText path="personal.tagline" />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-xl mb-10"
          >
            <EditableText
              path="personal.bio"
              as="p"
              className="text-ink-700/70 text-lg leading-relaxed"
              multiline
            />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link to="/contact" className="btn-primary flex items-center gap-2">
              Get in Touch
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/resumes" className="btn-secondary flex items-center gap-2">
              View Experience
            </Link>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4 mt-10"
          >
            <a
              href={content.personal.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-stone-200 rounded hover:border-gold-400 transition-colors group"
            >
              <Linkedin className="w-5 h-5 text-ink-700/50 group-hover:text-gold-400 transition-colors" />
            </a>
            <a
              href={content.personal.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-stone-200 rounded hover:border-gold-400 transition-colors group"
            >
              <Github className="w-5 h-5 text-ink-700/50 group-hover:text-gold-400 transition-colors" />
            </a>
            <a
              href={`mailto:${content.personal.email}`}
              className="p-3 border border-stone-200 rounded hover:border-gold-400 transition-colors group"
            >
              <Mail className="w-5 h-5 text-ink-700/50 group-hover:text-gold-400 transition-colors" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider-ornament max-w-4xl mx-auto px-6">✦</div>

      {/* Education Section */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-serif text-center mb-10 heading-accent heading-accent-center"
        >
          Education
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-2">
          {content.education.map((edu, index) => (
            <ElegantCard key={index} delay={index * 0.1}>
              <div className="p-6">
                <h3 className="text-lg font-serif text-ink-700 mb-1">
                  {isEditMode ? (
                    <EditableText path={`education.${index}.degree`} />
                  ) : (
                    edu.degree
                  )}
                </h3>
                <p className="text-gold-400 text-sm mb-2">
                  {isEditMode ? (
                    <EditableText path={`education.${index}.institution`} />
                  ) : (
                    edu.institution
                  )}
                </p>
                {edu.period && (
                  <p className="text-ink-700/50 text-sm">{edu.period}</p>
                )}
                {edu.description && (
                  <p className="text-ink-700/70 mt-2 text-sm">{edu.description}</p>
                )}
              </div>
            </ElegantCard>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="divider-ornament max-w-4xl mx-auto px-6">✦</div>

      {/* Projects Section */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-serif text-center mb-10 heading-accent heading-accent-center"
        >
          Selected Works
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {content.projects.map((project, index) => (
            <ElegantCard key={project.id} delay={index * 0.1}>
              <div className="p-6">
                <h3 className="text-lg font-serif text-ink-700 mb-2">
                  {isEditMode ? (
                    <EditableText path={`projects.${index}.title`} />
                  ) : (
                    project.title
                  )}
                </h3>
                <p className="text-ink-700/70 text-sm mb-4 line-clamp-3">
                  {isEditMode ? (
                    <EditableText path={`projects.${index}.description`} multiline />
                  ) : (
                    project.description
                  )}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 text-xs bg-parchment-200 text-ink-700/60 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 text-sm">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-ink-700/60 hover:text-gold-400 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  )}
                  <Link
                    to={`/project/${project.id}`}
                    className="flex items-center gap-1 text-ink-700/60 hover:text-gold-400 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Details
                  </Link>
                </div>
              </div>
            </ElegantCard>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="divider-ornament max-w-4xl mx-auto px-6">✦</div>

      {/* Skills Section */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-serif text-center mb-10 heading-accent heading-accent-center"
        >
          Expertise
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3"
        >
          {content.skills.map((skill, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
              className="px-4 py-2 bg-white border border-stone-200 rounded text-sm text-ink-700/70 hover:border-gold-400 hover:text-gold-500 transition-all cursor-default"
            >
              {skill.name}
            </motion.span>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
        <ElegantCard hover={false}>
          <div className="p-10 text-center">
            <h2 className="text-2xl font-serif mb-4 text-ink-700">
              Let's Work Together
            </h2>
            <p className="text-ink-700/70 mb-8 max-w-md mx-auto">
              I'm always open to discussing new projects and opportunities in robotics, AI, and autonomous systems.
            </p>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
              Start a Conversation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ElegantCard>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-ink-700/50 text-sm border-t border-stone-200">
        <p>© {new Date().getFullYear()} {content.personal.name}</p>
      </footer>
    </div>
  );
};

export default Home;