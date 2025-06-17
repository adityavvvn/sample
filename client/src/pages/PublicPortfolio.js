import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ResumePDF from '../components/ResumePDF';

const PublicPortfolio = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setLoading(true);
        // In a real app, you'd fetch user data, skills, and projects from the API
        // For now, using mock data
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

        setUserData(mockUserData);
        setSkills(mockSkills);
        setProjects(mockProjects);
      } catch (err) {
        setError('Failed to load portfolio data');
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-2">Error</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <ResumePDF 
        userData={userData}
        skills={skills}
        projects={projects}
      />
    </div>
  );
};

export default PublicPortfolio; 