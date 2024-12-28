import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Resumes from './pages/Resumes';
import Contact from './pages/Contact';
import BirthdaySurprise from './pages/BirthdaySurprise';
import Project from './pages/Project';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-stone-100 font-garamond">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resumes" element={<Resumes />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/birthday-surprise" element={<BirthdaySurprise />} />
          <Route path="/project/:id" element={<Project />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;