#!/bin/bash

# 🚂 Railway Deployment Script
# Run this script to prepare your project for Railway deployment

echo "🚀 Preparing Flight Booking Backend for Railway deployment..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit - Flight Booking Backend"
fi

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "📦 Installing Railway CLI..."
    npm install -g @railway/cli
fi

# Login to Railway
echo "🔐 Please login to Railway..."
railway login

# Deploy to Railway
echo "🚀 Deploying to Railway..."
railway up

echo "✅ Deployment initiated! Check your Railway dashboard for progress."
echo "🌐 Your app will be available at: https://your-app-name.up.railway.app"
echo ""
echo "📋 Don't forget to:"
echo "  1. Add your environment variables in Railway dashboard"
echo "  2. Add a PostgreSQL database service"
echo "  3. Update your DATABASE_URL environment variable"
echo ""
echo "🎉 Happy coding!"
