import React, { useState } from 'react';
import { Gift } from 'lucide-react';  // Confetti Icon
import PasswordModal from '../components/PasswordModal'; // Ensure PasswordModal handles user input
import ProjectCard from '../components/ProjectCard';
import { Link } from 'react-router-dom'; // Import Link for routing

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordEntered, setPasswordEntered] = useState(false);  // Track if password is correct

  const education = [
    {
      degree: 'B.Tech in Electrical and Electronics Engineering',
      institution: 'IIT Patna',
    },
    {
      degree: 'Indian School Certificate (ISC)',
      institution: 'Clarence High School',
    },
  ];

  const projects = [
    {
      title: 'ISRO USRC Lunar Elemental Mapping',
      description:
        'Conducting Multi-Shot Super-resolution on lunar X-Ray fluorescence (XRF) data to enhance spatial resolution.',
      link: '/projects/isro-usrc-lunar-elemental-mapping',
    },
    {
      title: 'Autonomous Robot Navigation and SLAM',
      description: 'Implemented SLAM on a robot using ROS Humble and ORB SLAM for navigation and localization.',
      link: '/projects/autonomous-robot-navigation',
    },
    {
      title: 'Flipkart Grid Robotics 6.0',
      description: 'Used PyTorch and YOLOV11 for object detection and product text extraction in robotics.',
      link: '/projects/flipkart-grid-robotics',
    },
  ];

  const handleGiftIconClick = () => {
    // When the gift icon is clicked, open the password dialog
    setPasswordEntered(false);  // Reset passwordEntered state
    setIsModalOpen(true);
  };

  const handlePasswordSubmit = () => {
    if (password === 'shreya') {
      setPasswordEntered(true);  // Correct password
      setIsModalOpen(false);     // Close modal after success
    } else {
      alert('Incorrect password!');
    }
  };

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
            <button
              onClick={handleGiftIconClick}
              className="text-gold-400 hover:text-gold-300 transition-colors flex items-center"
            >
              <Gift className="h-5 w-5" />
            </button>
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
        <h2 className="text-3xl font-bold text-center">Panav Arpit Raaj</h2>
        {/* <p className="text-lg text-gray-700">Welcome to my personal portfolio!</p> */}
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
      {isModalOpen && !passwordEntered && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Enter Password</h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-2 rounded-md mb-4"
              placeholder="Password"
            />
            <button
              onClick={handlePasswordSubmit}
              className="bg-gold-400 text-white px-4 py-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {passwordEntered && (
        <PasswordModal isOpen={true} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default Home;
