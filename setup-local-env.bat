@echo off
REM Setup script to create local .env files for SkillSpot development

echo 🚀 Setting up local environment files for SkillSpot...

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: Please run this script from the project root directory
    pause
    exit /b 1
)

REM Create .env files for local development
echo 📁 Creating local environment files...

REM Copy server environment file
if not exist "server\.env" (
    copy "env-files\server.env.local" "server\.env"
    echo ✅ Created server\.env
) else (
    echo ⚠️  server\.env already exists, skipping...
)

REM Copy client environment file
if not exist "client\.env" (
    copy "env-files\client.env.local" "client\.env"
    echo ✅ Created client\.env
) else (
    echo ⚠️  client\.env already exists, skipping...
)

echo.
echo 🎉 Local environment setup complete!
echo.
echo 📋 Next steps:
echo 1. Update server\.env with your MongoDB connection string
echo 2. Update server\.env with a strong JWT_SECRET for production
echo 3. Run 'npm run install-all' to install dependencies
echo 4. Run 'npm run dev' to start development servers
echo.
echo 🔧 Environment files created:
echo    - server\.env (backend configuration)
echo    - client\.env (frontend configuration)
echo.
echo ⚠️  Remember: .env files are gitignored and should not be committed!

pause
