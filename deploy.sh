#!/bin/bash
set -e

echo "→ Pushing to GitHub..."
git push

echo "→ Deploying to Vercel..."
vercel --prod

echo "✓ Done"
