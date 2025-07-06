# 🚀 Free Deployment Guide for Flight Booking Backend

## 🎯 **Best Free Options (Ranked)**

### 1. **Railway** ⭐ (RECOMMENDED)
- **Free Credits**: $5/month
- **Database**: Free PostgreSQL included
- **Uptime**: 24/7 (no sleep)
- **Custom Domain**: Yes
- **Easy Setup**: Git-based deployment

### 2. **Render**
- **Free Tier**: 750 hours/month
- **Database**: Free PostgreSQL (90 days)
- **Auto-sleep**: After 15 minutes
- **Custom Domain**: Yes

### 3. **Vercel** (Serverless)
- **Free Tier**: Generous limits
- **Database**: External required
- **Best for**: Stateless APIs

---

## 🚂 **Railway Deployment (Step-by-Step)**

### Prerequisites:
- GitHub account
- Railway account (free at railway.app)

### Steps:

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/flight-booking-backend.git
   git push -u origin main
   ```

2. **Deploy on Railway**
   - Go to [railway.app](https://railway.app)
   - Click "Start a New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Railway will auto-detect your Dockerfile

3. **Add Database**
   - In Railway dashboard, click "Add Service"
   - Select "PostgreSQL"
   - Copy the connection string

4. **Set Environment Variables**
   - Go to your service settings
   - Add these variables:
   ```
   NODE_ENV=production
   PORT=5000
   DATABASE_URL=postgresql://username:password@host:port/database
   JWT_SECRET=your-super-secret-jwt-key
   SUPABASE_URL=your-supabase-url
   SUPABASE_ANON_KEY=your-supabase-key
   ```

5. **Deploy**
   - Railway will automatically build and deploy
   - You'll get a public URL like: `https://your-app-name.up.railway.app`

---

## 🎨 **Render Deployment**

### Steps:

1. **Connect Repository**
   - Go to [render.com](https://render.com)
   - Click "New" → "Web Service"
   - Connect your GitHub repository

2. **Configure Service**
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`
   - **Environment**: Node
   - **Region**: Oregon (free)

3. **Add Database**
   - Create new PostgreSQL database
   - Copy connection string

4. **Environment Variables**
   - Add all required env vars (same as Railway)

5. **Deploy**
   - Render will build and deploy automatically

---

## ☁️ **Vercel Deployment (Serverless)**

### Steps:

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login and Deploy**
   ```bash
   vercel login
   vercel --prod
   ```

3. **Add Environment Variables**
   - Go to Vercel dashboard
   - Add all required env vars

4. **Database Setup**
   - Use external database (Supabase, PlanetScale, etc.)

---

## 🗄️ **Free Database Options**

### 1. **Supabase** (PostgreSQL)
- **Free tier**: 2 databases, 500MB storage
- **Features**: Built-in auth, real-time subscriptions
- **Perfect for**: Your existing setup

### 2. **PlanetScale** (MySQL)
- **Free tier**: 1 database, 5GB storage
- **Features**: Serverless, branching

### 3. **MongoDB Atlas**
- **Free tier**: 512MB storage
- **Features**: Document database

### 4. **Railway PostgreSQL**
- **Free tier**: Included with Railway
- **Features**: Easy setup, automatic backups

---

## 🛠️ **Environment Setup**

Create a `.env` file with these variables:

```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
```

---

## 🔧 **Pre-Deployment Checklist**

- [ ] Code pushed to GitHub
- [ ] Environment variables configured
- [ ] Database connection string ready
- [ ] Health check endpoint working (`/`)
- [ ] Build command working locally (`npm run build`)
- [ ] Start command working (`npm run start:prod`)

---

## 🎯 **Recommended Workflow**

1. **Start with Railway** (easiest, best free tier)
2. **Use Supabase** for database (you're already using it)
3. **Monitor usage** and upgrade if needed
4. **Add custom domain** when ready

---

## 💡 **Pro Tips**

1. **Railway**: Best overall free option
2. **Render**: Good alternative if Railway doesn't work
3. **Keep environment variables secure**
4. **Monitor your usage** to avoid unexpected charges
5. **Use health checks** for better uptime monitoring

---

## 🔍 **Testing Your Deployment**

After deployment, test these endpoints:
- `GET /` - Health check
- `GET /api` - Swagger documentation
- `POST /auth/login` - Authentication

---

## 📞 **Support & Troubleshooting**

**Common Issues:**
- **Build failures**: Check Node.js version compatibility
- **Database connection**: Verify connection string
- **Environment variables**: Ensure all required vars are set
- **Port issues**: Use `PORT` environment variable

**Getting Help:**
- Railway: Discord community
- Render: Support documentation
- Vercel: GitHub discussions
