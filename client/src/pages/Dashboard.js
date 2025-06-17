import React, { useEffect, useState } from 'react';
import { 
  TrendingUp, 
  Code, 
  FolderOpen, 
  Briefcase,
  Plus,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ComparisonDashboard from '../components/ComparisonDashboard';
import api from '../utils/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState([
    {
      title: 'Total Skills',
      value: '0',
      change: 'Loading...',
      icon: Code,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Projects',
      value: '0',
      change: 'Loading...',
      icon: FolderOpen,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Job Matches',
      value: '0',
      change: 'Loading...',
      icon: Briefcase,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Skill Growth',
      value: '0%',
      change: 'vs last month',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');
    try {
      // Fetch skills and projects in parallel
      const [skillsRes, projectsRes] = await Promise.all([
        api.get('/api/skills'),
        api.get('/api/projects')
      ]);

      const skillsCount = skillsRes.data.data.length;
      const projectsCount = projectsRes.data.data.length;
      
      // Calculate skill growth (simplified - could be enhanced with historical data)
      const skillGrowth = skillsCount > 0 ? '+15%' : '0%';
      
      // Calculate changes (simplified - could be enhanced with date filtering)
      const skillsChange = skillsCount > 0 ? `+${Math.min(skillsCount, 3)} this month` : 'No skills yet';
      const projectsChange = projectsCount > 0 ? `+${Math.min(projectsCount, 2)} this week` : 'No projects yet';

      setStats([
        {
          title: 'Total Skills',
          value: skillsCount.toString(),
          change: skillsChange,
          icon: Code,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50'
        },
        {
          title: 'Active Projects',
          value: projectsCount.toString(),
          change: projectsChange,
          icon: FolderOpen,
          color: 'text-green-600',
          bgColor: 'bg-green-50'
        },
        {
          title: 'Job Matches',
          value: '8', // This could be fetched from jobs API when implemented
          change: '+3 today',
          icon: Briefcase,
          color: 'text-purple-600',
          bgColor: 'bg-purple-50'
        },
        {
          title: 'Skill Growth',
          value: skillGrowth,
          change: 'vs last month',
          icon: TrendingUp,
          color: 'text-orange-600',
          bgColor: 'bg-orange-50'
        }
      ]);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'add-skill':
        navigate('/skills');
        break;
      case 'add-project':
        navigate('/projects');
        break;
      case 'view-jobs':
        navigate('/job-matches');
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here's an overview of your career progress.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="text-red-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading dashboard</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
              <button 
                onClick={fetchDashboardData}
                className="mt-2 text-sm text-red-800 hover:text-red-900 underline"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            className="card hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleQuickAction('add-skill')}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                  <Plus className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Add New Skill</h3>
                <p className="text-sm text-gray-600 mb-4">Track your latest skill acquisition</p>
                <div className="flex items-center text-sm font-medium text-blue-600">
                  <span>Get started</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          </div>

          <div 
            className="card hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleQuickAction('add-project')}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center mb-4">
                  <FolderOpen className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Add New Project</h3>
                <p className="text-sm text-gray-600 mb-4">Showcase your latest work</p>
                <div className="flex items-center text-sm font-medium text-green-600">
                  <span>Get started</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          </div>

          <div 
            className="card hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleQuickAction('view-jobs')}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">View Job Matches</h3>
                <p className="text-sm text-gray-600 mb-4">Find opportunities that match your skills</p>
                <div className="flex items-center text-sm font-medium text-purple-600">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Dashboard */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Skill Comparison</h2>
        <ComparisonDashboard />
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="card">
          <div className="space-y-4">
            {loading ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Loading activity...</span>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    {stats[0].value > 0 ? `You have ${stats[0].value} skills tracked` : 'No skills added yet'}
                  </span>
                  <span className="text-xs text-gray-400 ml-auto">Just now</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    {stats[1].value > 0 ? `You have ${stats[1].value} projects in your portfolio` : 'No projects added yet'}
                  </span>
                  <span className="text-xs text-gray-400 ml-auto">Just now</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    {stats[2].value > 0 ? `Found ${stats[2].value} job matches` : 'No job matches yet'}
                  </span>
                  <span className="text-xs text-gray-400 ml-auto">Just now</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 