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

export type Page = 'home' | 'writing';

export default function App() {
  const [page, setPage] = useState<Page>(() => {
    return window.location.hash === '#/writing' ? 'writing' : 'home';
  });
  const [showDashboard, setShowDashboard] = useState(false);
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('portfolio_data');
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });

  useEffect(() => {
    window.location.hash = page === 'writing' ? '#/writing' : '';
    window.scrollTo(0, 0);
  }, [page]);

  useEffect(() => {
    const onHashChange = () => {
      setPage(window.location.hash === '#/writing' ? 'writing' : 'home');
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

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
    <div className="min-h-screen font-sans">
      <div className="bg-ambient" />
      <div className="bg-noise" />
      <Navbar page={page} onNavigate={setPage} />
      <main className="relative z-10">
        {page === 'home' ? (
          <>
            <Hero data={data} />
            <Skills data={data} />
            <Projects data={data} />
            <OpenSource data={data} />
            <Experience data={data} />
          </>
        ) : (
          <Blog data={data} />
        )}
      </main>
      <footer className="relative z-10 py-12">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <div className="mx-auto mb-6 h-px w-24 bg-gradient-to-r from-transparent via-border to-transparent" />
          <p className="text-[13px] text-muted-foreground/80">
            &copy; {new Date().getFullYear()} Panav Arpit Raaj
          </p>
          <button
            onClick={() => setShowDashboard(true)}
            className="mt-3 text-[10px] text-muted-foreground/20 hover:text-muted-foreground transition-colors"
          >
            admin
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
