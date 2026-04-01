#!/bin/bash

# Deploy All Zoo Apps to GitHub Pages
# This script creates repositories, extracts apps, and pushes them

set -e  # Exit on error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🦓 Zoo Apps Deployment Script${NC}"
echo -e "${BLUE}================================${NC}"
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo -e "${RED}❌ GitHub CLI (gh) is not installed${NC}"
    echo "Install with: brew install gh"
    exit 1
fi

# Check if gh is authenticated
if ! gh auth status &> /dev/null; then
    echo -e "${RED}❌ GitHub CLI is not authenticated${NC}"
    echo "Run: gh auth login"
    exit 1
fi

echo -e "${GREEN}✅ GitHub CLI is installed and authenticated${NC}"
echo ""

# Make extract-app.sh executable
chmod +x extract-app.sh

# Define all apps
declare -A APPS=(
    ["zoo.ngo"]="app:zoo.ngo"
    ["zoo.fund"]="fund:zoo.fund"
    ["zoo.exchange"]="exchange:zoo.exchange"
    ["zoo.network"]="network:zoo.network"
    ["zoo.foundation"]="foundation:foundation.zoo.ngo"
    ["zoo.computer"]="computer:computer.zoo.ngo"
    ["zoo.lab"]="lab:lab.zoo.ngo"
    ["zoo.vote"]="dao-governance/app:vote.zoo.ngo"
)

# Function to create repo
create_repo() {
    local repo_name=$1
    local description=$2

    echo -e "${YELLOW}📦 Creating repository: zoo-apps/$repo_name${NC}"

    if gh repo view "zoo-apps/$repo_name" &> /dev/null; then
        echo -e "${YELLOW}⚠️  Repository zoo-apps/$repo_name already exists${NC}"
        read -p "Delete and recreate? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            echo -e "${YELLOW}🗑️  Deleting existing repository...${NC}"
            gh repo delete "zoo-apps/$repo_name" --yes
        else
            echo -e "${BLUE}ℹ️  Skipping repository creation${NC}"
            return 1
        fi
    fi

    gh repo create "zoo-apps/$repo_name" \
        --public \
        --description "$description" \
        --confirm

    echo -e "${GREEN}✅ Repository created: zoo-apps/$repo_name${NC}"
    return 0
}

# Function to extract and push app
extract_and_push() {
    local repo_name=$1
    local app_dir=$2
    local domain=$3

    echo -e "${BLUE}🚀 Extracting and pushing $repo_name${NC}"

    # Run extraction script
    ./extract-app.sh "$repo_name" "$app_dir" "$domain"

    # Navigate to extracted directory
    cd "/tmp/$repo_name"

    # Add remote and push
    echo -e "${YELLOW}📤 Pushing to zoo-apps/$repo_name${NC}"
    git remote add origin "git@github.com:zoo-apps/$repo_name.git"
    git branch -M main
    git push -u origin main

    echo -e "${GREEN}✅ $repo_name deployed${NC}"
    echo ""

    # Return to original directory
    cd - > /dev/null
}

# Function to configure GitHub Pages
configure_pages() {
    local repo_name=$1
    local domain=$2

    echo -e "${YELLOW}⚙️  Configuring GitHub Pages for $repo_name${NC}"

    # Note: GitHub Pages configuration requires API calls
    # The following is informational for manual setup
    echo -e "${BLUE}ℹ️  Manual steps required:${NC}"
    echo "   1. Go to: https://github.com/zoo-apps/$repo_name/settings/pages"
    echo "   2. Set Source: GitHub Actions"
    echo "   3. Set Custom domain: $domain"
    echo "   4. Wait for DNS check"
    echo "   5. Enable 'Enforce HTTPS'"
    echo ""
}

# Main deployment loop
echo -e "${BLUE}🎯 Starting deployment for ${#APPS[@]} apps${NC}"
echo ""

DEPLOYED=0
SKIPPED=0
FAILED=0

for repo_name in "${!APPS[@]}"; do
    IFS=':' read -r app_dir domain <<< "${APPS[$repo_name]}"

    echo -e "${BLUE}════════════════════════════════════════${NC}"
    echo -e "${BLUE}Processing: $repo_name${NC}"
    echo -e "${BLUE}App Dir: $app_dir${NC}"
    echo -e "${BLUE}Domain: $domain${NC}"
    echo -e "${BLUE}════════════════════════════════════════${NC}"
    echo ""

    # Create repository
    if create_repo "$repo_name" "Zoo ecosystem application - $domain"; then
        # Extract and push
        if extract_and_push "$repo_name" "$app_dir" "$domain"; then
            # Show Pages configuration info
            configure_pages "$repo_name" "$domain"
            ((DEPLOYED++))
        else
            echo -e "${RED}❌ Failed to extract/push $repo_name${NC}"
            ((FAILED++))
        fi
    else
        echo -e "${YELLOW}⏭️  Skipped $repo_name${NC}"
        ((SKIPPED++))
    fi

    echo ""
done

# Summary
echo -e "${BLUE}════════════════════════════════════════${NC}"
echo -e "${BLUE}📊 Deployment Summary${NC}"
echo -e "${BLUE}════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ Deployed: $DEPLOYED${NC}"
echo -e "${YELLOW}⏭️  Skipped: $SKIPPED${NC}"
echo -e "${RED}❌ Failed: $FAILED${NC}"
echo ""

if [ $DEPLOYED -gt 0 ]; then
    echo -e "${BLUE}🔍 Next Steps:${NC}"
    echo ""
    echo "1. Configure DNS for custom domains:"
    echo "   - Primary domains (zoo.fund, etc.):"
    echo "     A records: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153"
    echo "     CNAME www: zoo-apps.github.io"
    echo ""
    echo "   - Subdomains (vote.zoo.ngo, etc.):"
    echo "     CNAME: zoo-apps.github.io"
    echo ""
    echo "2. Enable GitHub Pages for each repository"
    echo "3. Wait for DNS propagation (can take up to 48 hours)"
    echo "4. Enable HTTPS in GitHub Pages settings"
    echo ""
    echo -e "${GREEN}🎉 Deployment complete!${NC}"
fi
