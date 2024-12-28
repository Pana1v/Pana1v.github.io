import React from 'react';

const ProjectPage = ({ projectName }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-4">{projectName}</h1>
      <div className="w-full max-w-2xl p-4 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-2">GitHub Repository</h2>
        <iframe
          src="https://github.com/example/example-repo"
          title="GitHub Embed"
          className="w-full h-64 border rounded"
        ></iframe>
      </div>
    </div>
  );
};

export default ProjectPage;
