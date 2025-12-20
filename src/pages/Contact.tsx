import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Linkedin, Github, FileText } from 'lucide-react';
import { useEditMode } from '../context/EditContext';
import { ElegantCard } from '../components/GlassCard';

const Contact = () => {
  const { content } = useEditMode();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = encodeURIComponent(`Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:${content.personal.email}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: content.personal.email, href: `mailto:${content.personal.email}` },
    { icon: Phone, label: 'Phone', value: content.personal.phone, href: `tel:${content.personal.phone.replace(/\s/g, '')}` },
    { icon: MapPin, label: 'Location', value: content.personal.location, href: null },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-parchment-100">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-serif text-ink-700 mb-4">Get in Touch</h1>
          <p className="text-ink-700/70 max-w-md mx-auto">
            I'm always open to discussing new opportunities in robotics, AI, and autonomous systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ElegantCard hover={false}>
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div>
                  <label className="block text-sm text-ink-700/70 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm text-ink-700/70 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm text-ink-700/70 mb-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Your message..."
                    className="resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </ElegantCard>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <ElegantCard key={index} delay={index * 0.1}>
                  <div className="p-5 flex items-center gap-4">
                    <div className="p-3 bg-parchment-200 rounded">
                      <Icon className="w-5 h-5 text-gold-400" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-ink-700/50 mb-1">{info.label}</p>
                      {info.href ? (
                        <a href={info.href} className="text-ink-700 hover:text-gold-400 transition-colors">
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-ink-700">{info.value}</p>
                      )}
                    </div>
                  </div>
                </ElegantCard>
              );
            })}

            {/* Social Links */}
            <ElegantCard delay={0.3}>
              <div className="p-5">
                <h3 className="text-sm uppercase tracking-wider text-ink-700/50 mb-4">Connect</h3>
                <div className="flex gap-3">
                  <a
                    href={content.personal.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-parchment-200 rounded hover:bg-gold-400 hover:text-white transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={content.personal.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-parchment-200 rounded hover:bg-gold-400 hover:text-white transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={content.personal.mediumUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-parchment-200 rounded hover:bg-gold-400 hover:text-white transition-colors"
                  >
                    <FileText className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </ElegantCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;