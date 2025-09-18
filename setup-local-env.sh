#!/bin/bash

# Setup script to create local .env files for SkillSpot development

echo "🚀 Setting up local environment files for SkillSpot..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Create .env files for local development
echo "📁 Creating local environment files..."

# Copy server environment file
if [ ! -f "server/.env" ]; then
    cp "env-files/server.env.local" "server/.env"
    echo "✅ Created server/.env"
else
    echo "⚠️  server/.env already exists, skipping..."
fi

# Copy client environment file
if [ ! -f "client/.env" ]; then
    cp "env-files/client.env.local" "client/.env"
    echo "✅ Created client/.env"
else
    echo "⚠️  client/.env already exists, skipping..."
fi

echo ""
echo "🎉 Local environment setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update server/.env with your MongoDB connection string"
echo "2. Update server/.env with a strong JWT_SECRET for production"
echo "3. Run 'npm run install-all' to install dependencies"
echo "4. Run 'npm run dev' to start development servers"
echo ""
echo "🔧 Environment files created:"
echo "   - server/.env (backend configuration)"
echo "   - client/.env (frontend configuration)"
echo ""
echo "⚠️  Remember: .env files are gitignored and should not be committed!"
