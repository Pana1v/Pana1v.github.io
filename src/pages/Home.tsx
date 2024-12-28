import React, { useState } from 'react';
import { Gift } from 'lucide-react';  // Confetti Icon
import PasswordModal from '../components/PasswordModal';
import ProjectCard from '../components/ProjectCard';
import { Link } from 'react-router-dom'; // Import Link for routing

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const education = [
    {
      degree: 'B.Tech in Computer Science',
      institution: 'IIT Example',
      year: '2019 - 2023',
    },
    {
      degree: 'High School Diploma',
      institution: 'ABC High School',
      year: '2017 - 2019',
    },
  ];

  const projects = [
    {
      title: 'Project A',
      description: 'Implemented XYZ algorithm for efficient task management.',
      link: '/projects/project-a',
    },
    {
      title: 'Project B',
      description: 'Developed a machine learning pipeline for ABC tasks.',
      link: '/projects/project-b',
    },
    {
      title: 'Project C',
      description: 'Created a dynamic web application using React and Node.js.',
      link: '/projects/project-c',
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-stone-900/90 shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="text-white font-bold text-lg">My Portfolio</div>
          <div className="flex space-x-4">
            <Link to="/resume" className="text-gold-400 hover:text-gold-300 transition-colors">
              Resume
            </Link>
            <Link to="/projects" className="text-gold-400 hover:text-gold-300 transition-colors">
              Projects
            </Link>
            <Link to="/birthday-surprise" className="text-gold-400 hover:text-gold-300 transition-colors">
              <Gift className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Photo Section */}
      <div id="photo" className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <img
          src="your-photo-url-here.jpg"
          alt="Your Photo"
          className="rounded-full h-32 w-32 mx-auto mb-6"
        />
        <h2 className="text-3xl font-bold text-center">Hello, I'm Panzerkommandant</h2>
        <p className="text-lg text-gray-700">Welcome to my personal portfolio!</p>
      </div>

      {/* Education Section */}
      <div id="education" className="mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Education</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {education.map((edu, index) => (
            <div
              key={index}
              className="p-4 bg-white shadow-md rounded-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold">{edu.degree}</h3>
              <p className="text-sm text-gray-700">{edu.institution}</p>
              <p className="text-sm text-gray-600">{edu.year}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Projects Section */}
      <div id="projects" className="mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Projects</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              link={project.link}
            />
          ))}
        </div>
      </div>

      {/* Password Modal */}
      <PasswordModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Home;
