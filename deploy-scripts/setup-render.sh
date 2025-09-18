#!/bin/bash

# SkillSpot Render Deployment Setup Script
# This script helps you prepare your project for Render deployment

echo "🚀 Setting up SkillSpot for Render deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p env-examples
mkdir -p deploy-scripts

# Check if environment files exist
echo "🔍 Checking environment configuration..."

if [ ! -f "server/.env" ]; then
    echo "⚠️  Warning: server/.env not found"
    echo "   Please copy env-examples/server.env.example to server/.env and configure it"
fi

if [ ! -f "client/.env" ]; then
    echo "⚠️  Warning: client/.env not found"
    echo "   Please copy env-examples/client.env.example to client/.env and configure it"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm run install-all

# Build the project to check for errors
echo "🔨 Building project to check for errors..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please fix the errors before deploying."
    exit 1
fi

echo ""
echo "🎉 Setup complete! Next steps:"
echo "1. Push your code to GitHub"
echo "2. Set up MongoDB Atlas database"
echo "3. Follow the DEPLOYMENT_GUIDE.md for Render deployment"
echo ""
echo "📋 Quick checklist:"
echo "   □ Code pushed to GitHub"
echo "   □ MongoDB database created"
echo "   □ Environment variables configured"
echo "   □ Ready to deploy on Render"
