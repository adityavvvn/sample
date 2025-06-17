import React, { useState, useEffect } from 'react';
import { Briefcase, Star, MapPin, DollarSign, Filter } from 'lucide-react';
import axios from 'axios';

const JobMatchBoard = ({ userId = 'demo-user' }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, high-match, medium-match, low-match

  useEffect(() => {
    const fetchJobMatches = async () => {
      try {
        setLoading(true);
        // In a real app, this would fetch from the API
        // const response = await axios.get(`/api/jobs/match?userId=${userId}`);
        // setJobs(response.data.data);
        
        // Mock data for demonstration
        const mockJobs = [
          {
            _id: '1',
            title: 'Senior React Developer',
            company: 'TechCorp Inc.',
            tags: ['React', 'TypeScript', 'Node.js', 'AWS'],
            location: 'San Francisco, CA',
            salary: '$120k - $150k',
            description: 'We are looking for a senior React developer...',
            matchScore: 95,
            matchedTags: ['React', 'TypeScript', 'Node.js']
          },
          {
            _id: '2',
            title: 'Full Stack Developer',
            company: 'StartupXYZ',
            tags: ['JavaScript', 'Python', 'MongoDB'],
            location: 'Remote',
            salary: '$90k - $110k',
            description: 'Join our growing team as a full stack developer...',
            matchScore: 87,
            matchedTags: ['JavaScript', 'Python']
          },
          {
            _id: '3',
            title: 'Frontend Engineer',
            company: 'DesignStudio',
            tags: ['Vue.js', 'CSS', 'Design Systems'],
            location: 'New York, NY',
            salary: '$100k - $130k',
            description: 'Create beautiful user interfaces...',
            matchScore: 45,
            matchedTags: ['CSS']
          }
        ];
        
        setJobs(mockJobs);
      } catch (err) {
        setError('Failed to load job matches');
      } finally {
        setLoading(false);
      }
    };

    fetchJobMatches();
  }, [userId]);

  const getMatchColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getMatchLabel = (score) => {
    if (score >= 80) return 'High Match';
    if (score >= 60) return 'Medium Match';
    return 'Low Match';
  };

  const filteredJobs = jobs.filter(job => {
    if (filter === 'all') return true;
    if (filter === 'high-match') return job.matchScore >= 80;
    if (filter === 'medium-match') return job.matchScore >= 60 && job.matchScore < 80;
    if (filter === 'low-match') return job.matchScore < 60;
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filter by:</span>
        </div>
        <div className="flex gap-2">
          {[
            { key: 'all', label: 'All Jobs' },
            { key: 'high-match', label: 'High Match (80%+)' },
            { key: 'medium-match', label: 'Medium Match (60-79%)' },
            { key: 'low-match', label: 'Low Match (<60%)' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                filter === key
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div key={job._id} className="card hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getMatchColor(job.matchScore)}`}>
                    <Star className="w-3 h-3 fill-current" />
                    <span>{job.matchScore}% Match</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-3">{job.company}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    <span>{job.salary}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-1 text-xs rounded-full ${
                        job.matchedTags.includes(tag)
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-600">{job.description}</p>
              </div>
              <button className="btn-primary ml-4 whitespace-nowrap">Apply</button>
            </div>
          </div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-8">
          <Briefcase className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-600">Try adjusting your filters or check back later for new opportunities.</p>
        </div>
      )}
    </div>
  );
};

export default JobMatchBoard; 