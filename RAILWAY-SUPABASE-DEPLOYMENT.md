# 🚀 Simplified Railway Deployment (with Supabase)

Since you're already using **Supabase** for your database, the deployment process is even simpler! No need for additional PostgreSQL service.

## 🎯 **Quick Railway Deployment**

### **Step 1: Push to GitHub**
```bash
git add .
git commit -m "Ready for Railway deployment"
git push origin main
```

### **Step 2: Deploy on Railway**
1. Go to [railway.app](https://railway.app)
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Choose your flight-booking-backend repository
5. Railway will automatically detect your Dockerfile and deploy

### **Step 3: Set Environment Variables**
In Railway dashboard, add these environment variables:

```env
NODE_ENV=production
PORT=5000
DATABASE_URL=your-supabase-connection-string
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

### **Step 4: Get Your Supabase Connection String**
1. Go to your Supabase project dashboard
2. Navigate to Settings → Database
3. Copy the connection string (URI format)
4. It should look like: `postgresql://postgres:[PASSWORD]@db.[PROJECT_ID].supabase.co:5432/postgres`

---

## 🎉 **That's It!**

**No additional database setup needed** because:
- ✅ Your app already uses Supabase
- ✅ Railway will just host your backend
- ✅ All database operations go through Supabase
- ✅ You keep your existing Supabase features (auth, real-time, etc.)

## 📱 **After Deployment**

Your API will be available at:
- **Railway URL**: `https://your-app-name.up.railway.app`
- **Health Check**: `https://your-app-name.up.railway.app/`
- **Swagger Docs**: `https://your-app-name.up.railway.app/api`

## 💰 **Cost Breakdown**
- **Railway**: $5 free credits/month (plenty for your backend)
- **Supabase**: Free tier (2 projects, 500MB storage)
- **Total**: $0/month for small-medium usage

## 🔧 **Environment Variables You Need**

```env
# Application
NODE_ENV=production
PORT=5000

# Database (Supabase)
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT_ID].supabase.co:5432/postgres

# Authentication
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
JWT_EXPIRES_IN=24h

# Supabase
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

---

## 🚀 **One-Click Deployment Script**

Run this in PowerShell:

```powershell
# Push to GitHub
git add .
git commit -m "Railway deployment ready"
git push origin main

# Install Railway CLI if not installed
npm install -g @railway/cli

# Login and deploy
railway login
railway up
```

**That's it!** Your NestJS backend will be live in minutes, connected to your existing Supabase database.
