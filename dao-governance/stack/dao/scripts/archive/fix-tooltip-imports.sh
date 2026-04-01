#!/bin/bash

echo "🔧 Fixing DAOTooltip imports to DecentTooltip..."

# Fix all DAOTooltip imports to DecentTooltip
find /Users/z/work/lux/dao/app/src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' "s|from '\(.*\)/DAOTooltip'|from '\1/DecentTooltip'|g" {} \;
find /Users/z/work/lux/dao/app/src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' 's|from "\(.*\)/DAOTooltip"|from "\1/DecentTooltip"|g' {} \;

# Also fix the component name itself in imports
find /Users/z/work/lux/dao/app/src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' "s|{ DAOTooltip }|{ DecentTooltip }|g" {} \;
find /Users/z/work/lux/dao/app/src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' "s|<DAOTooltip|<DecentTooltip|g" {} \;
find /Users/z/work/lux/dao/app/src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' "s|</DAOTooltip>|</DecentTooltip>|g" {} \;

echo "✅ Tooltip imports fixed!"

# Also fix useDAOModules imports
echo "🔧 Fixing useDAOModules import paths..."

# Find where useDAOModules actually exists
actual_path=$(find /Users/z/work/lux/dao/app/src -name "*useDAOModules*" -type f | head -1)

if [ -n "$actual_path" ]; then
    echo "Found useDAOModules at: $actual_path"
else
    echo "⚠️  useDAOModules file not found, may need to be created"
fi

echo "✅ All imports fixed!"