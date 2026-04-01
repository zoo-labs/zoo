#! /bin/bash
# Restore the database from the backup file to local database

BACKUP_FILE="$(dirname "$0")/../../../database/db.sql"

psql \
  -X \
  -d dao \
  -f "$BACKUP_FILE" \
  -v ON_ERROR_STOP=1
