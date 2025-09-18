# SkillSpot Deployment Guide for Render

This guide will walk you through deploying both the frontend (React) and backend (Node.js/Express) of your SkillSpot application on Render.

## Prerequisites

1. **GitHub Repository**: Ensure your code is pushed to a GitHub repository
2. **Render Account**: Sign up at [render.com](https://render.com)
3. **MongoDB Database**: You'll need a MongoDB database (MongoDB Atlas recommended)

## Project Structure Overview

```
SkillSpot/
├── client/          # React frontend
├── server/          # Node.js backend
└── package.json     # Root package.json
```

## Step 1: Set Up MongoDB Database

### Option A: MongoDB Atlas (Recommended)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Create a database user
4. Get your connection string (it will look like: `mongodb+srv://username:password@cluster.mongodb.net/skillplot`)

### Option B: Render MongoDB Service
1. In your Render dashboard, click "New +"
2. Select "MongoDB"
3. Choose a name and region
4. Note the connection string provided

## Step 2: Deploy Backend (API Server)

### 2.1 Create Backend Service
1. In Render dashboard, click "New +"
2. Select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `skillspot-backend` (or your preferred name)
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free tier (or upgrade as needed)

### 2.2 Set Environment Variables
In the Render dashboard, go to your backend service → Environment tab and add:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/skillplot
CLIENT_URLS=http://localhost:3000,https://your-frontend-url.onrender.com
JWT_SECRET=your-super-secret-jwt-key-here
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
JOOBLE_API_KEY=ba5421c6-08ce-46b3-b2af-0753e899f81c
```

**Important Notes:**
- Replace `MONGODB_URI` with your actual MongoDB connection string
- `CLIENT_URLS` supports multiple origins separated by commas (includes both local and production URLs)
- Generate a strong `JWT_SECRET` (you can use: `openssl rand -base64 32`)
- The backend will now accept requests from both localhost and your production frontend

### 2.3 Deploy Backend
1. Click "Create Web Service"
2. Wait for deployment to complete
3. Note the backend URL (e.g., `https://skillspot-backend.onrender.com`)

## Step 3: Deploy Frontend (React App)

### 3.1 Create Frontend Service
1. In Render dashboard, click "New +"
2. Select "Static Site"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `skillspot-frontend` (or your preferred name)
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`

### 3.2 Set Environment Variables
In the Render dashboard, go to your frontend service → Environment tab and add:

```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

**Important:** 
- Replace `your-backend-url.onrender.com` with your actual backend URL from Step 2.3
- The frontend will auto-detect the backend URL based on the hostname, but setting this explicitly ensures consistency

### 3.3 Deploy Frontend
1. Click "Create Static Site"
2. Wait for deployment to complete
3. Note the frontend URL (e.g., `https://skillspot-frontend.onrender.com`)

## Step 4: Update Backend CORS Configuration (Optional)

The backend is already configured to accept requests from both localhost and your production frontend. However, if you want to add additional URLs or modify the configuration:

1. Go to your backend service in Render dashboard
2. Navigate to Environment tab
3. Update `CLIENT_URLS` if needed:
   ```
   CLIENT_URLS=http://localhost:3000,https://skillspot-frontend.onrender.com,https://your-custom-domain.com
   ```
4. Save changes (this will trigger a redeploy)

**Note:** The current configuration already supports both local development and production deployment.

## Step 5: Test Your Deployment

1. **Test Backend**: Visit `https://your-backend-url.onrender.com` - you should see the API welcome message
2. **Test Frontend**: Visit `https://your-frontend-url.onrender.com` - you should see your React app
3. **Test Integration**: Try logging in or creating an account to ensure frontend-backend communication works

## Step 6: Custom Domain (Optional)

If you want to use a custom domain:

1. In your Render service settings, go to "Custom Domains"
2. Add your domain
3. Follow the DNS configuration instructions
4. Update your environment variables with the new domain

## Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check that all dependencies are in `package.json`
   - Ensure build commands are correct
   - Check the build logs in Render dashboard

2. **CORS Errors**:
   - Verify `CLIENT_URL` in backend environment variables
   - Ensure frontend URL is correct and includes `https://`

3. **Database Connection Issues**:
   - Verify MongoDB connection string
   - Check if your IP is whitelisted in MongoDB Atlas
   - Ensure database user has proper permissions

4. **Environment Variables Not Working**:
   - Restart the service after adding environment variables
   - Check variable names match exactly (case-sensitive)
   - Ensure no extra spaces in values

### Useful Commands for Debugging:

```bash
# Check backend logs
# Go to Render dashboard → Your backend service → Logs

# Test API endpoints
curl https://your-backend-url.onrender.com/api/skills

# Check if environment variables are loaded
# Add this to your backend code temporarily:
console.log('Environment:', process.env.NODE_ENV);
console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
```

## Performance Optimization

1. **Enable Auto-Deploy**: In service settings, enable auto-deploy from main branch
2. **Health Checks**: Render automatically monitors your services
3. **Scaling**: Upgrade to paid plans for better performance and reliability
4. **Caching**: Consider adding Redis for session storage in production

## Security Considerations

1. **Environment Variables**: Never commit sensitive data to Git
2. **HTTPS**: Render provides HTTPS by default
3. **Rate Limiting**: Already configured in your backend
4. **Helmet**: Security headers are already configured
5. **JWT Secrets**: Use strong, unique secrets for production

## Monitoring and Maintenance

1. **Logs**: Monitor logs regularly in Render dashboard
2. **Uptime**: Render provides uptime monitoring
3. **Updates**: Keep dependencies updated
4. **Backups**: MongoDB Atlas provides automatic backups

## Cost Considerations

- **Free Tier**: Limited to 750 hours/month per service
- **Paid Plans**: Start at $7/month for always-on services
- **Database**: MongoDB Atlas free tier is sufficient for development

## Next Steps

1. Set up monitoring and alerting
2. Configure CI/CD for automatic deployments
3. Set up staging environment
4. Implement proper error tracking (e.g., Sentry)
5. Add performance monitoring

## 🔧 Environment Variables Summary

**Backend (Production):**
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/skillplot
CLIENT_URLS=http://localhost:3000,https://your-frontend-url.onrender.com
JWT_SECRET=your-super-secret-jwt-key
JOOBLE_API_KEY=ba5421c6-08ce-46b3-b2af-0753e899f81c
```

**Frontend (Production):**
```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

**Local Development:**
```
# Server (.env)
CLIENT_URLS=http://localhost:3000,https://skillspot-frontend.onrender.com
MONGODB_URI=mongodb://localhost:27017/skillplot
JOOBLE_API_KEY=ba5421c6-08ce-46b3-b2af-0753e899f81c

# Client (.env)
REACT_APP_API_URL=http://localhost:5000
```

## 🚀 Quick Setup for Local Development

1. Run the setup script:
   ```bash
   # Windows
   setup-local-env.bat
   
   # Linux/Mac
   chmod +x setup-local-env.sh
   ./setup-local-env.sh
   ```

2. Update the generated `.env` files with your actual values
3. Run `npm run install-all` to install dependencies
4. Run `npm run dev` to start both servers

Your SkillSpot application should now be successfully deployed on Render! 🚀
