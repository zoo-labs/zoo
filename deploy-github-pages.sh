#!/bin/bash

# Deploy script for zoo.ngo and zoo.fund to GitHub Pages

echo "Building and preparing sites for GitHub Pages deployment..."

# Build foundation site (zoo.ngo)
echo "Building foundation site with Next.js..."
cd foundation
pnpm install
pnpm run build
cd ..

# Create deployment directory
rm -rf _site
mkdir -p _site

# Copy foundation site (zoo.ngo) to root - THIS IS THE MAIN SITE
echo "Copying foundation site to root (zoo.ngo - main site)..."
cp -r foundation/out/* _site/

# Copy fund site to /fund subdirectory (accessible at zoo.ngo/fund)
mkdir -p _site/fund
echo "Copying fund site to /fund subdirectory (zoo.ngo/fund)..."
cp -r fund/public/* _site/fund/
if [ -d "fund/data" ]; then
  cp -r fund/data _site/fund/data
fi

# Create GitHub Pages configuration for primary domain
echo "zoo.ngo" > _site/CNAME

# Create redirect page for potential zoo.fund visitors
# Note: zoo.fund should be configured at DNS level to redirect to zoo.ngo/fund
cat > _site/zoo-fund-redirect.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="refresh" content="0; url=/fund/">
    <title>Zoo Fund - Redirecting</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; text-align: center; padding: 50px; }
    </style>
</head>
<body>
    <h2>Redirecting to Zoo Fund...</h2>
    <p>If you are not redirected, <a href="/fund/">click here</a>.</p>
</body>
</html>
EOF

echo "Sites prepared for deployment!"
echo ""
echo "To deploy to GitHub Pages:"
echo "1. Push to main branch to trigger automatic deployment"
echo "2. Or manually run: gh workflow run deploy-pages.yml"
echo ""
echo "GitHub Pages will serve:"
echo "   - zoo.ngo as the main site (foundation)"
echo "   - zoo.ngo/fund for the Zoo Fund site"
echo ""
echo "DNS Configuration needed:"
echo "   - Point zoo.ngo to GitHub Pages"
echo "   - For zoo.fund access, you can:"
echo "     a) Set up a redirect from zoo.fund to zoo.ngo/fund"
echo "     b) Or deploy fund to a separate GitHub Pages repository"