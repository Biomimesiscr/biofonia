#!/bin/sh
set -e

# Apply pending Prisma migrations before starting the server.
# Set RUN_MIGRATIONS=false to skip (e.g. when migrating from a separate job).
if [ "${RUN_MIGRATIONS:-true}" = "true" ]; then
  if [ -d /migrate/prisma/migrations ] && [ -n "$(ls -A /migrate/prisma/migrations 2>/dev/null)" ]; then
    echo "Applying database migrations..."
    (cd /migrate && node node_modules/prisma/build/index.js migrate deploy)
  else
    echo "No migrations found in prisma/migrations, skipping migrate deploy."
  fi
fi

exec "$@"
