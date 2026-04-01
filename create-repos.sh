#!/bin/bash

# Create GitHub Repositories for Zoo Apps
# This script creates empty repositories in the zoo-apps organization

set -e  # Exit on error

echo "🦓 Creating Zoo App Repositories"
echo "================================"
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed"
    echo "Install with: brew install gh"
    exit 1
fi

# Check if gh is authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ GitHub CLI is not authenticated"
    echo "Run: gh auth login"
    exit 1
fi

echo "✅ GitHub CLI is ready"
echo ""

# Define repositories with descriptions
declare -a REPOS=(
    "zoo.ngo:Zoo AI/ML Platform - Main application"
    "zoo.fund:Zoo Fund - Grants and funding platform"
    "zoo.exchange:Zoo Exchange - Token trading platform"
    "zoo.network:Zoo Network - Network information and node management"
    "zoo.foundation:Zoo Foundation - Foundation website"
    "zoo.computer:Zoo Computer - E-commerce platform for AI hardware"
    "zoo.lab:Zoo Lab - Experimental AI research interface"
    "zoo.vote:Zoo Vote - DAO governance and voting"
)

CREATED=0
SKIPPED=0
FAILED=0

for repo_info in "${REPOS[@]}"; do
    IFS=':' read -r repo_name description <<< "$repo_info"

    echo "📦 Creating: zoo-apps/$repo_name"

    # Check if repo already exists
    if gh repo view "zoo-apps/$repo_name" &> /dev/null 2>&1; then
        echo "⚠️  Repository zoo-apps/$repo_name already exists"
        ((SKIPPED++))
    else
        # Create repository
        if gh repo create "zoo-apps/$repo_name" \
            --public \
            --description "$description" \
            --confirm &> /dev/null; then
            echo "✅ Created: zoo-apps/$repo_name"
            ((CREATED++))
        else
            echo "❌ Failed to create: zoo-apps/$repo_name"
            ((FAILED++))
        fi
    fi

    echo ""
done

# Summary
echo "════════════════════════════════════════"
echo "📊 Summary"
echo "════════════════════════════════════════"
echo "✅ Created: $CREATED"
echo "⏭️  Skipped (already exist): $SKIPPED"
echo "❌ Failed: $FAILED"
echo ""

if [ $CREATED -gt 0 ]; then
    echo "🎉 Successfully created $CREATED repositories!"
    echo ""
    echo "Next steps:"
    echo "1. Run ./extract-app.sh to extract each app"
    echo "2. Or run ./deploy-all-apps.sh to automate full deployment"
fi
