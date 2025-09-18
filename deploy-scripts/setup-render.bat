@echo off
REM SkillSpot Render Deployment Setup Script for Windows
REM This script helps you prepare your project for Render deployment

echo 🚀 Setting up SkillSpot for Render deployment...

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: Please run this script from the project root directory
    pause
    exit /b 1
)

REM Create necessary directories
echo 📁 Creating necessary directories...
if not exist "env-examples" mkdir env-examples
if not exist "deploy-scripts" mkdir deploy-scripts

REM Check if environment files exist
echo 🔍 Checking environment configuration...

if not exist "server\.env" (
    echo ⚠️  Warning: server\.env not found
    echo    Please copy env-examples\server.env.example to server\.env and configure it
)

if not exist "client\.env" (
    echo ⚠️  Warning: client\.env not found
    echo    Please copy env-examples\client.env.example to client\.env and configure it
)

REM Install dependencies
echo 📦 Installing dependencies...
call npm run install-all

REM Build the project to check for errors
echo 🔨 Building project to check for errors...
call npm run build

if %errorlevel% equ 0 (
    echo ✅ Build successful!
) else (
    echo ❌ Build failed. Please fix the errors before deploying.
    pause
    exit /b 1
)

echo.
echo 🎉 Setup complete! Next steps:
echo 1. Push your code to GitHub
echo 2. Set up MongoDB Atlas database
echo 3. Follow the DEPLOYMENT_GUIDE.md for Render deployment
echo.
echo 📋 Quick checklist:
echo    □ Code pushed to GitHub
echo    □ MongoDB database created
echo    □ Environment variables configured
echo    □ Ready to deploy on Render

pause
