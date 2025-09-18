#!/bin/bash

# SkillSpot Deployment Health Check Script
# This script helps you verify your deployment is working correctly

echo "🔍 Checking SkillSpot deployment health..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check URL
check_url() {
    local url=$1
    local name=$2
    
    echo -n "Checking $name ($url)... "
    
    if curl -s -f "$url" > /dev/null; then
        echo -e "${GREEN}✅ OK${NC}"
        return 0
    else
        echo -e "${RED}❌ FAILED${NC}"
        return 1
    fi
}

# Function to check API endpoint
check_api() {
    local url=$1
    local name=$2
    
    echo -n "Checking $name API ($url)... "
    
    response=$(curl -s -w "%{http_code}" "$url")
    http_code="${response: -3}"
    
    if [ "$http_code" = "200" ]; then
        echo -e "${GREEN}✅ OK (HTTP $http_code)${NC}"
        return 0
    else
        echo -e "${RED}❌ FAILED (HTTP $http_code)${NC}"
        return 1
    fi
}

# Get URLs from user
echo "Please enter your deployment URLs:"
read -p "Backend URL (e.g., https://skillspot-backend.onrender.com): " BACKEND_URL
read -p "Frontend URL (e.g., https://skillspot-frontend.onrender.com): " FRONTEND_URL

echo ""
echo "🔍 Running health checks..."

# Check backend
check_url "$BACKEND_URL" "Backend"
check_api "$BACKEND_URL/api/skills" "Skills API"
check_api "$BACKEND_URL/api/projects" "Projects API"
check_api "$BACKEND_URL/api/jobs" "Jobs API"
check_api "$BACKEND_URL/api/users" "Users API"

echo ""

# Check frontend
check_url "$FRONTEND_URL" "Frontend"

echo ""
echo "🧪 Testing frontend-backend integration..."

# Test if frontend can reach backend
echo -n "Testing CORS configuration... "
cors_test=$(curl -s -H "Origin: $FRONTEND_URL" -H "Access-Control-Request-Method: GET" -H "Access-Control-Request-Headers: X-Requested-With" -X OPTIONS "$BACKEND_URL/api/skills" -w "%{http_code}")
cors_code="${cors_test: -3}"

if [ "$cors_code" = "200" ] || [ "$cors_code" = "204" ]; then
    echo -e "${GREEN}✅ OK${NC}"
else
    echo -e "${RED}❌ FAILED (HTTP $cors_code)${NC}"
    echo -e "${YELLOW}   Make sure CLIENT_URL is set correctly in backend environment variables${NC}"
fi

echo ""
echo "📊 Deployment Summary:"
echo "   Backend: $BACKEND_URL"
echo "   Frontend: $FRONTEND_URL"
echo ""
echo "🔧 If you see any failures:"
echo "   1. Check Render service logs"
echo "   2. Verify environment variables"
echo "   3. Ensure MongoDB connection is working"
echo "   4. Check CORS configuration"
echo ""
echo "✅ Health check complete!"
