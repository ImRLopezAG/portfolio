#!/bin/sh
set -e

# Database paths
SEED_DB="/usr/src/app/seed/data.db"
EFS_DB="/usr/src/app/database/data.db"

# If EFS database doesn't exist but seed database does, copy it
if [ ! -f "$EFS_DB" ] && [ -f "$SEED_DB" ]; then
    echo "📦 Seeding database from image..."
    cp "$SEED_DB" "$EFS_DB"
    echo "✅ Database seeded successfully"
else
    if [ -f "$EFS_DB" ]; then
        echo "✅ Using existing database from EFS"
    else
        echo "ℹ️  No seed database found, Strapi will create a new one"
    fi
fi

# Start Strapi
exec node --run start
