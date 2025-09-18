import axios from 'axios';

// Get API URL with robust fallback logic
const getApiUrl = () => {
  // Auto-detect based on current hostname first
  const hostname = window.location.hostname;

  // In Render production, always use the backend service URL
  if (hostname.includes('onrender.com')) {
    return 'https://skillspot-backend.onrender.com';
  }

  // Use environment variable if explicitly set (non-Render environments)
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }

  // Local development defaults
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:5000';
  }

  // Default fallback
  return 'http://localhost:5000';
};

// Create axios instance with base configuration
const api = axios.create({
  baseURL: getApiUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Log API configuration for debugging
console.log('API Base URL:', getApiUrl());
console.log('Current hostname:', window.location.hostname);
console.log('Current origin:', window.location.origin);

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('API Request:', config.method?.toUpperCase(), config.url, config.data);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url, response.data);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.config?.url, error.response?.data);
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api; 