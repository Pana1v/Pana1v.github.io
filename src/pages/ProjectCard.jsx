import React from 'react';

const ProjectCard = ({ title, description, link }) => {
  return (
    <a
      href={link}
      className="p-4 bg-white shadow-md rounded-md hover:shadow-lg transition-shadow"
    >
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-sm text-gray-700">{description}</p>
    </a>
  );
};

export default ProjectCard;
