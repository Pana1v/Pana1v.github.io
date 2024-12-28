import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, ExternalLink, BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ProjectData {
  name: string;
  description: string;
  readme: string;
  homepage: string;
  stars: number;
  forks: number;
}

const Project = () => {
  const { id } = useParams();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, fetch project data from GitHub API
    // For demo purposes, we'll use mock data
    const mockProject = {
      name: 'Example Project',
      description: 'A sophisticated web application',
      readme: '# Project Overview\n\nThis is a sample readme...',
      homepage: 'https://example.com',
      stars: 123,
      forks: 45
    };

    setTimeout(() => {
      setProject(mockProject);
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-stone-900"></div>
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="min-h-screen pt-20 pb-12 bg-stone-100">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-xl p-8"
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">{project.name}</h1>
            <div className="flex space-x-4">
              <a href="#" className="text-stone-800 hover:text-stone-600">
                <Github className="h-6 w-6" />
              </a>
              <a href={project.homepage} className="text-stone-800 hover:text-stone-600">
                <ExternalLink className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div className="prose max-w-none">
            <ReactMarkdown>{project.readme}</ReactMarkdown>
          </div>

          <div className="mt-8 flex items-center space-x-6 text-stone-600">
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              <span>{project.stars} stars</span>
            </div>
            <div className="flex items-center">
              <Github className="h-5 w-5 mr-2" />
              <span>{project.forks} forks</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Project;