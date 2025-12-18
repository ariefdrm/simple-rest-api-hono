#!/bin/sh

set -e

echo "Running Prisma Migration"
bunx prisma migrate deploy

echo "Starting App"
exec "$@"
