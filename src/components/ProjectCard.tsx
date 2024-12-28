import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  githubUrl: string;
  projectId: string;
}

const ProjectCard = ({ title, description, image, githubUrl, projectId }: ProjectCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-xl overflow-hidden"
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-stone-600 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <Link
            to={`/project/${projectId}`}
            className="text-stone-800 hover:text-stone-600"
          >
            <ExternalLink className="h-5 w-5" />
          </Link>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-800 hover:text-stone-600"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;