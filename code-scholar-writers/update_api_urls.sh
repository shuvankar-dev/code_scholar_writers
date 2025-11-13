#!/bin/bash
# Script to update all API URLs to use centralized configuration

echo "Updating API URLs in all files..."

# Files to update with their API patterns
declare -A files_to_update=(
  ["src/components/SingleBlogPage.tsx"]="http://localhost/codescholarwriters-api"
  ["src/components/admin/AdminBlogManagement.tsx"]="http://localhost/codescholarwriters-api"
  ["src/components/admin/AdminDashboard.tsx"]="http://localhost/codescholarwriters-api"
  ["src/components/admin/AdminFAQManagement.tsx"]="http://localhost/codescholarwriters-api"
  ["src/components/admin/AdminLogin.tsx"]="http://localhost/codescholarwriters-api"
  ["src/components/admin/AdminMasterPrice.tsx"]="http://localhost/codescholarwriters-api"
  ["src/components/admin/AdminOrders.tsx"]="http://localhost/codescholarwriters-api"
  ["src/components/admin/AdminRegister.tsx"]="http://localhost/codescholarwriters-api"
)

echo "Files that need manual updating:"
for file in "${!files_to_update[@]}"; do
  if [ -f "$file" ]; then
    echo "- $file"
  fi
done

echo ""
echo "Steps to make production ready:"
echo "1. Update remaining files to use getApiUrl() from @/config/api"
echo "2. Verify your production API URL is correct"
echo "3. Test API endpoints on your production server"
echo "4. Remove console.log statements from api.ts"