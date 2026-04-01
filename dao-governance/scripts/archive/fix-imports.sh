#!/bin/bash

echo "🔧 Fixing useDAOModal imports..."

# Fix all incorrect imports
find /Users/z/work/lux/dao/app/src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' "s|from '\(.*\)/useDAOModal'|from '\1/useDecentModal'|g" {} \;
find /Users/z/work/lux/dao/app/src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' 's|from "\(.*\)/useDAOModal"|from "\1/useDecentModal"|g' {} \;

echo "✅ Import paths fixed!"