import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, ExternalLink, Award, BookOpen, Microscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEditMode } from '../context/EditContext';
import { EditableText } from '../components/EditableText';
import { ElegantCard } from '../components/GlassCard';
import profileImage from '../images/x.jpg';

const Home = () => {
  const { content, isEditMode } = useEditMode();

  return (
    <div className="min-h-screen pt-20 bg-pattern-subtle">
      {/* Hero Section */}
      <section className="max-w-3xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex flex-col items-center text-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <img
              src={profileImage}
              alt={content.personal.name}
              className="w-40 h-40 lg:w-48 lg:h-48 rounded-full object-cover profile-elegant"
            />
          </motion.div>

          {/* Credentials Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="credential-text mb-3"
          >
            {content.personal.credentials}
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl lg:text-5xl font-display font-normal mb-4 text-navy-800"
          >
            <EditableText path="personal.name" />
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-distinguished mb-8"
          >
            <EditableText path="personal.tagline" />
          </motion.p>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-xl mb-10"
          >
            <EditableText
              path="personal.bio"
              as="p"
              className="text-ink-600 text-lg leading-relaxed"
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
              className="p-3 border border-ivory-400 rounded hover:border-gold-400 transition-colors group"
            >
              <Linkedin className="w-5 h-5 text-ink-600 group-hover:text-gold-400 transition-colors" />
            </a>
            <a
              href={content.personal.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-ivory-400 rounded hover:border-gold-400 transition-colors group"
            >
              <Github className="w-5 h-5 text-ink-600 group-hover:text-gold-400 transition-colors" />
            </a>
            <a
              href={`mailto:${content.personal.email}`}
              className="p-3 border border-ivory-400 rounded hover:border-gold-400 transition-colors group"
            >
              <Mail className="w-5 h-5 text-ink-600 group-hover:text-gold-400 transition-colors" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider-ornament max-w-3xl mx-auto px-6">✦</div>

      {/* Research Statement */}
      <section className="max-w-3xl mx-auto px-6 lg:px-8 py-12">
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {content.personal.researchStatement}
        </motion.blockquote>
      </section>

      {/* Research Interests */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="section-label">Areas of Focus</p>
          <h2 className="text-2xl font-display">Research Interests</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3"
        >
          {content.researchInterests.map((interest, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="research-tag"
            >
              <Microscope className="w-4 h-4 inline mr-2 opacity-60" />
              {interest}
            </motion.span>
          ))}
        </motion.div>
      </section>

      {/* Divider */}
      <div className="divider-ornament max-w-4xl mx-auto px-6">❖</div>

      {/* Education Section */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="section-label">Academic Background</p>
          <h2 className="text-2xl font-display">Education</h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {content.education.map((edu, index) => (
            <ElegantCard key={index} delay={index * 0.1}>
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-ivory-200 rounded">
                    <BookOpen className="w-5 h-5 text-gold-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-display text-navy-800 mb-1">
                      {isEditMode ? (
                        <EditableText path={`education.${index}.degree`} />
                      ) : (
                        edu.degree
                      )}
                    </h3>
                    <p className="text-gold-400 text-sm font-medium mb-1">
                      {isEditMode ? (
                        <EditableText path={`education.${index}.institution`} />
                      ) : (
                        edu.institution
                      )}
                    </p>
                    {edu.period && (
                      <p className="text-ink-600/50 text-sm">{edu.period}</p>
                    )}
                    {edu.description && (
                      <p className="text-ink-600/70 mt-2 text-sm">{edu.description}</p>
                    )}
                  </div>
                </div>
              </div>
            </ElegantCard>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="divider-ornament max-w-4xl mx-auto px-6">✦</div>

      {/* Awards & Recognitions */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="section-label">Achievements</p>
          <h2 className="text-2xl font-display">Awards & Recognitions</h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {content.awards.map((award, index) => (
            <ElegantCard key={index} delay={index * 0.1}>
              <div className="p-5">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gradient-to-br from-gold-300/20 to-bronze-400/20 rounded">
                    <Award className="w-5 h-5 text-gold-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-navy-800 text-base mb-1">{award.title}</h3>
                    <p className="text-gold-400 text-sm">{award.issuer}</p>
                    <p className="text-ink-600/50 text-xs mt-1">{award.year}</p>
                    {award.description && (
                      <p className="text-ink-600/70 text-sm mt-2">{award.description}</p>
                    )}
                  </div>
                </div>
              </div>
            </ElegantCard>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="divider-ornament max-w-4xl mx-auto px-6">❖</div>

      {/* Projects Section */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="section-label">Portfolio</p>
          <h2 className="text-2xl font-display">Selected Works</h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {content.projects.map((project, index) => (
            <ElegantCard key={project.id} delay={index * 0.1}>
              <div className="p-6 card-flourish">
                <h3 className="text-lg font-display text-navy-800 mb-2">
                  {isEditMode ? (
                    <EditableText path={`projects.${index}.title`} />
                  ) : (
                    project.title
                  )}
                </h3>
                <p className="text-ink-600/70 text-sm mb-4 line-clamp-3">
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
                      className="px-2 py-1 text-xs bg-ivory-200 text-ink-600/70 rounded"
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
                      className="flex items-center gap-1 text-ink-600/60 hover:text-gold-400 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  )}
                  <Link
                    to={`/project/${project.id}`}
                    className="flex items-center gap-1 text-ink-600/60 hover:text-gold-400 transition-colors"
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

      {/* Expertise Section */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="section-label">Technical Proficiency</p>
          <h2 className="text-2xl font-display">Expertise</h2>
        </motion.div>

        {/* Group skills by category */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {Object.entries(
            content.skills.reduce((acc, skill) => {
              if (!acc[skill.category]) acc[skill.category] = [];
              acc[skill.category].push(skill.name);
              return acc;
            }, {} as Record<string, string[]>)
          ).map(([category, skills], catIndex) => (
            <div key={category}>
              <h3 className="expertise-category">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (catIndex * skills.length + index) * 0.02 }}
                    className="skill-badge"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Divider */}
      <div className="divider-ornament max-w-4xl mx-auto px-6">❖</div>

      {/* Professional Affiliations */}
      <section className="max-w-3xl mx-auto px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="section-label">Memberships</p>
          <h2 className="text-2xl font-display">Professional Affiliations</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4"
        >
          {content.professionalAffiliations.map((affiliation, index) => (
            <span
              key={index}
              className="px-5 py-2 bg-white border border-ivory-400 rounded text-ink-600 text-sm"
            >
              {affiliation}
            </span>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
        <ElegantCard hover={false}>
          <div className="p-10 text-center flourish-corner">
            <p className="section-label">Collaboration</p>
            <h2 className="text-2xl font-display mb-4 text-navy-800">
              Let's Work Together
            </h2>
            <p className="text-ink-600/70 mb-8 max-w-md mx-auto">
              I'm always open to discussing new research opportunities, collaborative projects, and innovative challenges in robotics, AI, and autonomous systems.
            </p>
            <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
              Start a Conversation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ElegantCard>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-ink-600/50 text-sm border-t border-ivory-400">
        <p className="mb-2">© {new Date().getFullYear()} {content.personal.name}</p>
        <p className="text-xs text-ink-600/40">{content.personal.credentials}</p>
      </footer>
    </div>
  );
};

export default Home;