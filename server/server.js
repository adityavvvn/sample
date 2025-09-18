const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

app.set('trust proxy', 1);
// Disable ETags to avoid 304 Not Modified responses for API JSON
app.set('etag', false);

// Middleware
app.use(helmet());
app.use(morgan('combined'));
// CORS configuration to support multiple origins
const getAllowedOrigins = () => {
  // Check for multiple URLs in CLIENT_URLS
  if (process.env.CLIENT_URLS) {
    return process.env.CLIENT_URLS.split(',').map(url => url.trim());
  }
  
  // Fallback to single CLIENT_URL for backward compatibility
  if (process.env.CLIENT_URL) {
    return [process.env.CLIENT_URL];
  }
  
  // Default to localhost for development
  return ['http://localhost:3000'];
};

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = getAllowedOrigins();
    
    // Allow requests with no origin (like mobile apps, curl requests, or direct browser access)
    if (!origin || origin === 'null') {
      console.log('CORS allowing request with no origin');
      return callback(null, true);
    }
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      console.log('CORS allowing origin:', origin);
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      console.log('Allowed origins:', allowedOrigins);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
// Prevent caching on API routes to ensure clients receive fresh bodies
app.use('/api', (req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/skillplot', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
  res.json({
    message: '🔹 SkillPlot API is running!',
    version: '1.0.0',
    endpoints: {
      skills: '/api/skills',
      projects: '/api/projects',
      jobs: '/api/jobs',
      users: '/api/users'
    }
  });
});

// API Routes (will be added in Phase 5)
app.use('/api/skills', require('./routes/skills'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/users', require('./routes/users'));
app.use('/api/jooble', require('./routes/jooble'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 SkillPlot server running on port ${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
}); 