import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { OpenSource } from './components/OpenSource';
import { Blog } from './components/Blog';
import { Dashboard } from './components/Dashboard';
import { DATA as INITIAL_DATA } from './data';

export default function App() {
  const [showDashboard, setShowDashboard] = useState(false);
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('portfolio_data');
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        setShowDashboard(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleUpdateData = (newData: typeof INITIAL_DATA) => {
    setData(newData);
    localStorage.setItem('portfolio_data', JSON.stringify(newData));
  };

  return (
    <div className="min-h-screen font-sans selection:bg-primary/30 selection:text-primary">
      <Navbar />
      <main>
        <Hero data={data} />
        <Skills data={data} />
        <Projects data={data} />
        <OpenSource data={data} />
        <Experience data={data} />
        <Blog data={data} />
      </main>
      <footer className="border-t bg-muted/50 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground font-mono">
            &copy; {new Date().getFullYear()} Panav // Built with React & Tailwind
          </p>
          <button 
            onClick={() => setShowDashboard(true)}
            className="mt-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/20 hover:text-primary transition-colors"
          >
            [Access_System_Core]
          </button>
        </div>
      </footer>

      {showDashboard && (
        <Dashboard 
          data={data}
          onUpdate={handleUpdateData}
          onClose={() => setShowDashboard(false)} 
        />
      )}
    </div>
  );
}
