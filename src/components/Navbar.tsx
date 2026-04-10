import { useState, useEffect } from 'react';
import { Sun, Moon, Cpu, Terminal } from 'lucide-react';
import { cn } from '../lib/utils';

export function Navbar() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2 font-mono text-xl font-bold tracking-tighter">
          <span className="text-primary">PANAV</span>
        </div>
        
        <div className="flex items-center gap-6">
          <a href="#skills" className="text-sm font-medium hover:text-primary transition-colors">Skills</a>
          <a href="#projects" className="text-sm font-medium hover:text-primary transition-colors">Projects</a>
          <a href="#opensource" className="text-sm font-medium hover:text-primary transition-colors">Open_Source</a>
          <a href="#experience" className="text-sm font-medium hover:text-primary transition-colors">Experience</a>
          <a href="#blog" className="text-sm font-medium hover:text-primary transition-colors">Blog</a>
          
          <button
            onClick={() => setIsDark(!isDark)}
            className="border border-border p-2 hover:bg-muted transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
