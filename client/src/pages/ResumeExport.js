import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Download, Share2, FileText, Eye } from 'lucide-react';
import ResumePDF from '../components/ResumePDF';

const ResumeExport = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // Mock data for demonstration
  const mockUserData = {
    name: 'John Doe',
    title: 'Full Stack Developer',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
  };

  const mockSkills = [
    {
      skill: 'React',
      proficiency: [
        { date: '2022-01-01', level: 2 },
        { date: '2022-06-01', level: 3 },
        { date: '2023-01-01', level: 4 },
        { date: '2023-06-01', level: 5 },
      ],
      color: '#3b82f6',
    },
    {
      skill: 'Node.js',
      proficiency: [
        { date: '2022-01-01', level: 1 },
        { date: '2022-06-01', level: 2 },
        { date: '2023-01-01', level: 3 },
        { date: '2023-06-01', level: 4 },
      ],
      color: '#10b981',
    },
  ];

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
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Resume Export</h1>
        <p className="text-gray-600 mt-2">
          Generate and share your professional resume in multiple formats.
        </p>
      </div>

      {/* Export Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">PDF Export</h3>
              <p className="text-sm text-gray-600">Generate a professional PDF resume</p>
            </div>
          </div>
          <button 
            onClick={handlePrint}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Generate PDF
          </button>
        </div>

        <div className="card">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Share2 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Public Link</h3>
              <p className="text-sm text-gray-600">Create a shareable portfolio link</p>
            </div>
          </div>
          <button className="btn-primary w-full flex items-center justify-center gap-2">
            <Share2 className="w-4 h-4" />
            Create Link
          </button>
        </div>
      </div>

      {/* Preview Section */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Resume Preview</h2>
          <button 
            onClick={handlePrint}
            className="btn-secondary flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Preview & Print
          </button>
        </div>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
          <ResumePDF 
            ref={componentRef}
            userData={mockUserData}
            skills={mockSkills}
            projects={mockProjects}
          />
        </div>
      </div>

      {/* Recent Exports */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Exports</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Resume_Portfolio.pdf</p>
                <p className="text-sm text-gray-500">Generated 2 hours ago</p>
              </div>
            </div>
            <button className="btn-secondary text-sm">Download</button>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Share2 className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Public Portfolio Link</p>
                <p className="text-sm text-gray-500">Created 1 day ago</p>
              </div>
            </div>
            <button className="btn-secondary text-sm">Copy Link</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeExport; 