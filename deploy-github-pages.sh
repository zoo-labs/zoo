#!/bin/bash

# Deploy script for zoo.fund and zoo.network to GitHub Pages

echo "Preparing sites for GitHub Pages deployment..."

# Create deployment directory
rm -rf _site
mkdir -p _site

# Copy fund site (static HTML)
echo "Copying fund site..."
cp -r fund/public/* _site/

# Create network site directory
mkdir -p _site/network
echo "Copying network site..."
cp -r network/public/* _site/network/

# Create GitHub Pages configuration
echo "zoo.fund" > _site/CNAME

# Create a simple redirect for zoo.network
cat > _site/network.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="refresh" content="0; url=/network/">
    <title>Zoo Network</title>
</head>
<body>
    <p>Redirecting to Zoo Network...</p>
</body>
</html>
EOF

echo "Sites prepared for deployment!"
echo ""
echo "To deploy to GitHub Pages:"
echo "1. Create a new repository or use existing one"
echo "2. Push the _site directory contents to gh-pages branch"
echo "3. Enable GitHub Pages in repository settings"
echo "4. Configure custom domains:"
echo "   - zoo.fund for main site"
echo "   - zoo.network as subdomain"
echo ""
echo "Or use GitHub Actions workflow at .github/workflows/deploy-sites.yml"