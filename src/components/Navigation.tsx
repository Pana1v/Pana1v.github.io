import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Feather, Gift, Linkedin, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEditMode } from '../context/EditContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState('');
  const location = useLocation();
  const { content } = useEditMode();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/resumes', label: 'Experience' },
    { path: '/contact', label: 'Contact' },
    { path: '/blog', label: 'Journal' },
  ];

  const handleGiftClick = () => {
    setShowPasswordInput(true);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'shreya') {
      window.location.href = '/birthday-surprise';
    } else {
      alert('Incorrect password');
    }
    setShowPasswordInput(false);
    setPassword('');
  };

  const closePasswordModal = () => {
    setShowPasswordInput(false);
    setPassword('');
  };

  return (
    <>
      <nav className="fixed w-full z-50 nav-elegant">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <Feather className="h-6 w-6 text-gold-400 transition-transform group-hover:rotate-12" />
              <span className="text-xl font-serif text-ink-700">
                {content.personal.name.split(' ')[0]}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative text-sm tracking-wide transition-colors duration-300 ${location.pathname === item.path
                      ? 'text-gold-400'
                      : 'text-ink-700/70 hover:text-ink-700'
                    }`}
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-gold-400"
                    />
                  )}
                </Link>
              ))}

              {/* Social Icons */}
              <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-stone-200">
                <a
                  href={content.personal.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-700/50 hover:text-gold-400 transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={content.personal.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-700/50 hover:text-gold-400 transition-colors"
                >
                  <Github className="h-4 w-4" />
                </a>
                <button
                  onClick={handleGiftClick}
                  className="text-ink-700/50 hover:text-gold-400 transition-colors"
                >
                  <Gift className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-3">
              <button
                onClick={handleGiftClick}
                className="p-2 text-ink-700/50 hover:text-gold-400 transition-colors"
              >
                <Gift className="h-5 w-5" />
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-ink-700"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-parchment-100 border-t border-stone-200"
            >
              <div className="px-6 py-4 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block py-3 text-base transition-colors ${location.pathname === item.path
                        ? 'text-gold-400'
                        : 'text-ink-700/70 hover:text-ink-700'
                      }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Password Modal */}
      <AnimatePresence>
        {showPasswordInput && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink-800/30 backdrop-blur-sm"
            onClick={closePasswordModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-8 rounded shadow-elevated w-full max-w-sm mx-4"
            >
              <h3 className="text-xl font-serif mb-4 text-ink-700">Enter Password</h3>
              <form onSubmit={handlePasswordSubmit}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="mb-4"
                  autoFocus
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={closePasswordModal}
                    className="flex-1 btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 btn-primary"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;