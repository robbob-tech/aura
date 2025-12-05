#!/bin/bash
# Push public-aura-repo to GitHub

# Replace YOUR_USERNAME with your GitHub username
GITHUB_USERNAME="YOUR_USERNAME"

echo "Creating public GitHub repo 'aura'..."

# Create repo via GitHub API (requires GITHUB_TOKEN)
if [ -z "$GITHUB_TOKEN" ]; then
  echo "⚠️  GITHUB_TOKEN not set. Creating repo manually..."
  echo ""
  echo "1. Go to: https://github.com/new"
  echo "2. Repository name: aura"
  echo "3. Make it PUBLIC"
  echo "4. Do NOT initialize with README"
  echo "5. Create repository"
  echo ""
  echo "Then run:"
  echo "  git remote add origin https://github.com/$GITHUB_USERNAME/aura.git"
  echo "  git push -u origin main"
else
  # Create repo via API
  curl -X POST \
    -H "Authorization: token $GITHUB_TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    https://api.github.com/user/repos \
    -d '{"name":"aura","description":"Public AURA API relay","private":false}'
  
  # Add remote and push
  git remote add origin https://github.com/$GITHUB_USERNAME/aura.git || git remote set-url origin https://github.com/$GITHUB_USERNAME/aura.git
  git push -u origin main
fi

