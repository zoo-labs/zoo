#!/bin/bash

# Extract Zoo App for GitHub Pages Deployment
# Usage: ./extract-app.sh <repo-name> <app-dir> <domain>
# Example: ./extract-app.sh zoo.fund fund zoo.fund

set -e  # Exit on error

APP_NAME=$1
APP_DIR=$2
DOMAIN=$3

if [ -z "$APP_NAME" ] || [ -z "$APP_DIR" ] || [ -z "$DOMAIN" ]; then
  echo "Usage: ./extract-app.sh <repo-name> <app-dir> <domain>"
  echo "Example: ./extract-app.sh zoo.fund fund zoo.fund"
  exit 1
fi

echo "🚀 Extracting $APP_NAME from $APP_DIR..."

# Create temp directory
TEMP_DIR="/tmp/$APP_NAME"
rm -rf "$TEMP_DIR"
mkdir -p "$TEMP_DIR"

# Copy app
echo "📦 Copying app files..."
cp -r "$APP_DIR"/* "$TEMP_DIR/" 2>/dev/null || cp -r "$APP_DIR/." "$TEMP_DIR/"
cd "$TEMP_DIR"

# Clean monorepo artifacts
echo "🧹 Cleaning monorepo artifacts..."
rm -rf node_modules dist .next build .turbo
rm -f package-lock.json yarn.lock pnpm-lock.yaml

# Create public directory if it doesn't exist
mkdir -p public

# Create CNAME
echo "📝 Creating CNAME file..."
echo "$DOMAIN" > public/CNAME

# Create GitHub workflow
echo "⚙️  Creating GitHub Actions workflow..."
mkdir -p .github/workflows
cat > .github/workflows/deploy.yml << 'EOF'
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          NODE_ENV: production

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
EOF

# Create README
echo "📄 Creating README..."
cat > README.md << EOF
# $APP_NAME

Zoo ecosystem application deployed at https://$DOMAIN

## Development

\`\`\`bash
npm install
npm run dev
\`\`\`

## Deployment

Automatically deploys to GitHub Pages on push to main branch.

## Custom Domain

DNS configured to point $DOMAIN to this GitHub Pages site.

## Setup

1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. Configure custom domain: $DOMAIN
4. Wait for DNS propagation
5. Enable "Enforce HTTPS"

## Build

\`\`\`bash
npm run build
\`\`\`

Build output goes to \`./dist\` directory.
EOF

# Initialize git
echo "📦 Initializing git repository..."
git init
git add .
git commit -m "feat: Extract $APP_NAME from monorepo

Extracted from zoo monorepo for independent deployment.

Domain: $DOMAIN
Deployment: GitHub Pages (GitHub Actions)
App Directory: $APP_DIR"

echo "✅ $APP_NAME extracted and prepared"
echo ""
echo "📋 Next steps:"
echo "1. Create GitHub repo: gh repo create zoo-apps/$APP_NAME --public"
echo "2. Add remote: git remote add origin git@github.com:zoo-apps/$APP_NAME.git"
echo "3. Push: git branch -M main && git push -u origin main"
echo "4. Enable GitHub Pages in repo settings"
echo "5. Configure DNS: $DOMAIN → zoo-apps.github.io"
echo ""
echo "🌐 Extracted to: $TEMP_DIR"
