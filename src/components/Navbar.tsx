import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Page } from '../App';

export function Navbar({ page, onNavigate }: { page: Page; onNavigate: (p: Page) => void }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const homeLink = (href: string, label: string) => (
    <a
      href={href}
      onClick={(e) => {
        if (page !== 'home') {
          e.preventDefault();
          onNavigate('home');
          setTimeout(() => {
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
          }, 50);
        }
      }}
      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      {label}
    </a>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 max-w-4xl">
        <button
          onClick={() => onNavigate('home')}
          className="font-serif text-lg font-semibold tracking-tight text-foreground hover:text-primary transition-colors duration-200"
        >
          Panav Arpit Raaj
        </button>

        <div className="flex items-center gap-6">
          {homeLink('#research', 'Research')}
          {homeLink('#projects', 'Projects')}
          {homeLink('#experience', 'Experience')}
          <button
            onClick={() => onNavigate('writing')}
            className={`text-sm transition-colors ${page === 'writing' ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Writing
          </button>

          <button
            onClick={() => setIsDark(!isDark)}
            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
