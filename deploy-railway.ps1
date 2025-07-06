# 🚂 Railway Deployment Script for Windows PowerShell (with Supabase)
# Run this script to deploy your NestJS backend to Railway using existing Supabase database

Write-Host "🚀 Deploying Flight Booking Backend to Railway (with Supabase)..." -ForegroundColor Green

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "📁 Initializing git repository..." -ForegroundColor Yellow
    git init
    git add .
    git commit -m "Initial commit - Flight Booking Backend"
}

# Check if Railway CLI is installed
try {
    railway --version | Out-Null
    Write-Host "✅ Railway CLI is already installed" -ForegroundColor Green
} catch {
    Write-Host "📦 Installing Railway CLI..." -ForegroundColor Yellow
    npm install -g @railway/cli
}

# Login to Railway
Write-Host "🔐 Please login to Railway..." -ForegroundColor Cyan
railway login

# Deploy to Railway
Write-Host "🚀 Deploying to Railway..." -ForegroundColor Green
railway up

Write-Host "✅ Deployment initiated! Check your Railway dashboard for progress." -ForegroundColor Green
Write-Host "🌐 Your app will be available at: https://your-app-name.up.railway.app" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Don't forget to add these environment variables in Railway dashboard:" -ForegroundColor Yellow
Write-Host "  NODE_ENV=production"
Write-Host "  PORT=5000"
Write-Host "  DATABASE_URL=your-supabase-connection-string"
Write-Host "  JWT_SECRET=your-super-secret-jwt-key"
Write-Host "  SUPABASE_URL=https://your-project-id.supabase.co"
Write-Host "  SUPABASE_ANON_KEY=your-supabase-anon-key"
Write-Host "  SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key"
Write-Host ""
Write-Host "ℹ️  No additional PostgreSQL service needed - using your existing Supabase!" -ForegroundColor Blue
Write-Host "🎉 Happy coding!" -ForegroundColor Green
