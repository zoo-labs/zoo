#!/bin/bash

# Fix merge conflicts by choosing the 'develop' branch version (luxdao)
echo "Fixing merge conflicts in app files..."

# Find all files with merge conflicts
files=$(find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec grep -l "<<<<<<< HEAD" {} \;)

for file in $files; do
    echo "Fixing: $file"
    # Create a temporary file
    temp_file="${file}.tmp"
    
    # Process the file to remove conflict markers and keep 'develop' version
    awk '
    /^<<<<<<< HEAD$/ { in_conflict = 1; next }
    /^=======$/ { 
        if (in_conflict) { 
            in_conflict = 0
            in_develop = 1
            next 
        }
    }
    /^>>>>>>> develop$/ { 
        if (in_develop) {
            in_develop = 0
            next
        }
    }
    !in_conflict { print }
    ' "$file" > "$temp_file"
    
    # Replace the original file
    mv "$temp_file" "$file"
done

echo "✅ All merge conflicts fixed!"