import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Scroll, Gift } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState('');
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/resumes', label: 'Resumes' },
    { path: '/contact', label: 'Contact' },
    { path: '/blog', label: 'Blog' },
  ];

  const handleGiftClick = () => {
    setShowPasswordInput(true);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'your_password') {
      window.location.href = '/birthday-surprise';
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <nav className="fixed w-full bg-stone-900 text-stone-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Scroll className="h-8 w-8" />
            <span className="text-xl font-semibold">Panav</span>
          </Link>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${
                    location.pathname === item.path
                      ? 'text-gold-400'
                      : 'text-stone-100 hover:text-gold-300'
                  } px-3 py-2 text-sm transition-colors duration-300`}
                >
                  {item.label}
                </Link>
              ))}
              <button onClick={handleGiftClick} className="flex items-center space-x-2">
                <Gift className="h-6 w-6" />
              </button>
            </div>
          </div>
          
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-stone-100"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <button onClick={handleGiftClick} className="flex items-center space-x-2">
              <Gift className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${
                  location.pathname === item.path
                    ? 'text-gold-400'
                    : 'text-stone-100 hover:text-gold-300'
                } block px-3 py-2 text-base`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <button onClick={handleGiftClick} className="flex items-center space-x-2">
              <Gift className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}

      {showPasswordInput && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <form onSubmit={handlePasswordSubmit}>
              <label className="block text-sm font-medium text-gray-700">
                Enter Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                type="submit"
                className="mt-2 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;