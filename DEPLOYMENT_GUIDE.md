# Deployment Guide

## Option 1: Deploy to Vercel (Recommended for Next.js)

### Step 1: Prepare Your Repository

```bash
# Make sure all changes are committed
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Connect to Vercel

1. Go to **https://vercel.com**
2. Click "New Project"
3. Import your GitHub repository
4. Select the repository from your account
5. Click "Import"

### Step 3: Configure Environment Variables

In Vercel dashboard:

1. Go to Settings → Environment Variables
2. Add the following variables:

```
# Auth Credentials (CHANGE THESE!)
ADMIN_EMAIL=your-admin@email.com
ADMIN_PASSWORD=your-secure-password-here

# Optional: MongoDB (if using database)
MONGODB_URI=your-mongodb-connection-string
```

### Step 4: Deploy

1. Vercel will automatically detect it's a Next.js app
2. Click "Deploy"
3. Your app will be live at `your-project.vercel.app`

**Advantages:**

- ✅ Auto-scaling
- ✅ Serverless functions
- ✅ Built-in Next.js optimizations
- ✅ Free tier available
- ✅ File uploads in `/data` work (but won't persist between deployments - use database instead)

---

## Option 2: Deploy to Railway

### Step 1: Connect GitHub

1. Go to **https://railway.app**
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository

### Step 2: Configure Environment Variables

In Railway dashboard:

1. Go to your project
2. Click on "Variables"
3. Add:

```
ADMIN_EMAIL=your-admin@email.com
ADMIN_PASSWORD=your-secure-password-here
NODE_ENV=production
```

### Step 3: Deploy

Railway will automatically:

- Detect Node.js/Next.js
- Install dependencies
- Build the app
- Deploy

Your app will be at a Railway-provided URL (you can add a custom domain)

**Advantages:**

- ✅ Free tier with $5/month credit
- ✅ Simple GitHub integration
- ✅ Good for Node.js apps
- ✅ File uploads persist in a shared volume

---

## Option 3: Deploy Both (Advanced)

**Frontend → Vercel**
**Backend (Separate API) → Railway**

⚠️ _Not recommended for this project since it's a full-stack Next.js app_

---

## Important: File Storage Issue

Your current setup stores data in `/data/posts` and `/data/exams` as local files.

### Problem:

- In Vercel: Files are **ephemeral** (deleted after deployment)
- In Railway: Files persist in a shared volume (better but limited)

### Solution: Use MongoDB

1. **Get free MongoDB Atlas:**
   - Go to https://www.mongodb.com/cloud/atlas
   - Create free cluster
   - Get connection string

2. **Update your code to use MongoDB** (optional - file system works for testing)

---

## Environment Variables to Change

**Before deploying, update these sensitive values:**

```typescript
// src/lib/auth.ts
const ADMIN_EMAIL = "your-email@yourdomain.com";
const ADMIN_PASSWORD = "CHANGE_TO_SECURE_PASSWORD"; // ⚠️ Strong password!
```

---

## Quick Start: Vercel Deployment

### Prerequisites:

- GitHub account with your repo
- Vercel account (free)

### In 3 minutes:

1. Go to https://vercel.com/new
2. Import GitHub repo
3. Add environment variables
4. Click Deploy

**That's it!** Your site will be live.

---

## Custom Domain Setup

### For Vercel:

1. Dashboard → Project → Settings → Domains
2. Add your domain
3. Update DNS records (instructions provided)

### For Railway:

1. Project → Settings → Domain
2. Add custom domain
3. Update DNS records

---

## Troubleshooting

### "File not found errors after deployment"

- **Solution:** Switch to MongoDB or use Railway's persistent storage

### "Admin login not working"

- Check environment variables are set correctly
- Restart deployment after changing variables

### "500 errors on API routes"

- Check server logs in deployment dashboard
- Ensure Node.js version is 18+

---

## After Deployment

1. **Test admin login:** `/admin`
2. **Test exams:** `/exams`
3. **Monitor performance:** Use deployment platform's analytics
4. **Update DNS:** If using custom domain

---

## Quick Links

- Vercel: https://vercel.com
- Railway: https://railway.app
- MongoDB Atlas: https://mongodb.com/cloud/atlas
- GitHub: https://github.com
