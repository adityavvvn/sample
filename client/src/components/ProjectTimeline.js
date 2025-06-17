import React, { useState } from 'react';
import { Calendar, FolderOpen, X } from 'lucide-react';

const mockProjects = [
  {
    id: 1,
    title: 'E-commerce Platform',
    tags: ['React', 'Node.js', 'MongoDB'],
    startDate: '2022-01-01',
    endDate: '2022-06-01',
    description: 'A full-stack e-commerce solution with real-time inventory and payment integration.',
  },
  {
    id: 2,
    title: 'Task Management App',
    tags: ['Vue.js', 'Firebase', 'TypeScript'],
    startDate: '2022-07-01',
    endDate: '2023-01-01',
    description: 'A collaborative task management application with real-time updates and notifications.',
  },
  {
    id: 3,
    title: 'Portfolio Website',
    tags: ['HTML', 'CSS', 'JavaScript'],
    startDate: '2023-02-01',
    endDate: '2023-03-01',
    description: 'A modern portfolio website with animations and responsive design.',
  },
];

function formatDate(date) {
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
  });
}

const ProjectTimeline = ({ projects = mockProjects }) => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="relative">
      <div className="border-l-4 border-blue-100 pl-6">
        {projects.map((project, idx) => (
          <div key={project.id} className="mb-10 relative group">
            {/* Dot */}
            <span className="absolute -left-7 top-2 w-5 h-5 bg-blue-500 rounded-full border-4 border-white shadow-lg"></span>
            <div
              className="card cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelected(project)}
            >
              <div className="flex items-center gap-3 mb-2">
                <FolderOpen className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900 text-lg">{project.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{tag}</span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(project.startDate)} - {formatDate(project.endDate)}</span>
              </div>
              <p className="text-gray-700 text-sm line-clamp-2">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Modal for project details */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full relative animate-fade-in">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <FolderOpen className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">{selected.title}</h2>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {selected.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{tag}</span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(selected.startDate)} - {formatDate(selected.endDate)}</span>
            </div>
            <p className="text-gray-700 mb-2">{selected.description}</p>
            <button
              className="btn-primary mt-4 w-full"
              onClick={() => setSelected(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectTimeline; 