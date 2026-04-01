#!/bin/bash

# Attempt to load .env file if it exists
if [ -f .env ]; then
  echo "Loading environment variables from .env file..."
  set -a # Automatically export all variables
  source .env
  set +a
fi

# Set default values or ensure required variables are set
DB_URL=${DATABASE_URL:-}
BACKUP_DIR="$(dirname "$0")/../../../database"

# Check if required DATABASE_URL variable is set
if [ -z "$DB_URL" ]; then
  echo "Error: DATABASE_URL environment variable is not set (or not found in .env)."
  exit 1
fi

BACKUP_FILE="$BACKUP_DIR/db.sql"

echo "Starting backup of database..."
echo "Backup file: $BACKUP_FILE"

# Run pg_dump using the DATABASE_URL
# -F p specifies plain-text SQL format. Use -F c for custom compressed format if preferred.
pg_dump \
  -d "$DB_URL" \
  -F p \
  --no-owner \
  --exclude-table-data=offchain.sessions \
  --inserts \
  --on-conflict-do-nothing \
  > "$BACKUP_FILE"

# Check pg_dump exit status
if [ $? -eq 0 ]; then
  echo "Backup completed successfully."
else
  echo "Error: Backup failed. Check pg_dump output, permissions, and DATABASE_URL."
  # Optional: Remove potentially incomplete backup file
  # rm -f "$BACKUP_FILE"
  exit 1
fi

exit 0 
