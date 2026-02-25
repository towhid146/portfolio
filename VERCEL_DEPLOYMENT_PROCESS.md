# Complete Vercel Deployment Guide - Step by Step

## Important: Single Full-Stack App

This is a **single Next.js full-stack application**:
- **Frontend**: React components in `/src/app`
- **Backend**: API routes in `/src/app/api`
- **Deploy once to Vercel** - both frontend and backend are deployed together

---

## Step 1: Prerequisites ✅

Before deploying, ensure:
- [ ] Code committed to GitHub (already done ✓)
- [ ] GitHub account
- [ ] Vercel account (free signup at https://vercel.com)

---

## Step 2: Create Vercel Account

1. Go to **https://vercel.com**
2. Click **"Sign Up"**
3. Click **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub account
5. Click **"Create a Team"** (or skip if personal use)

---

## Step 3: Import Project to Vercel

### Method 1: From Vercel Dashboard (Recommended)

1. After login, you'll see the **Vercel Dashboard**
2. Click **"Add New..."** → **"Project"**
3. Under **"Import Git Repository"**, click **"Select a Repository"**
4. Find and click **`towhid146/portfolio`**
5. Click **"Import"**

### Method 2: Direct Link (Quick)

Simply visit: https://vercel.com/new/git/

Then select your `towhid146/portfolio` repository.

---

## Step 4: Configure Project Settings

After clicking import, you'll see the **Configure Project** page:

### Basic Settings (Auto-filled)
- **Project Name**: `portfolio` (or change if desired)
- **Framework Preset**: `Next.js` (auto-detected)
- **Root Directory**: `./` (default)

### Build & Development Settings (Auto-detected)
```
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

These are usually correct. **Leave as default.**

---

## Step 5: Add Environment Variables ⚠️ IMPORTANT

**This is where you set admin credentials for production.**

1. Scroll down to **"Environment Variables"**
2. Click **"Add New"** for each variable:

### Add These Variables:

**Variable 1:**
- **Name**: `ADMIN_EMAIL`
- **Value**: `admin@towhidul.com`
- **Select**: "Production, Preview, Development"
- Click **"Add"**

**Variable 2:**
- **Name**: `ADMIN_PASSWORD`
- **Value**: `YourSecurePassword123!` (Change from admin123)
- **Select**: "Production, Preview, Development"
- Click **"Add"**

**Variable 3 (Optional - for future MongoDB):**
- **Name**: `MONGODB_URI`
- **Value**: (leave empty for now)
- Skip this if not using MongoDB

### Final Environment Variables Section Should Look Like:
```
ADMIN_EMAIL = admin@towhidul.com
ADMIN_PASSWORD = YourSecurePassword123!
```

---

## Step 6: Deploy

1. After adding env variables, click **"Deploy"** button (bottom right)
2. Vercel will:
   - Install dependencies (npm install)
   - Build project (npm run build)
   - Deploy to production
   - Generate a live URL

### Deployment Progress

You'll see a live log:
```
✓ Analyzed 378 files
✓ Created 45 new Functions
✓ Installed 187 dependencies
✓ Built application successfully
→ Generated build output...
✓ Deployed to production!
```

**Time**: Usually 2-5 minutes

---

## Step 7: Get Your Live URL

After deployment completes:

1. Click **"Visit"** button
2. Or copy your production URL from top:
   ```
   https://portfolio-xyz123.vercel.app
   ```

Your app is now **LIVE on the internet!** 🎉

---

## Step 8: Test Your Deployment

### 1. Test Public Pages
- Visit: `https://portfolio-xyz123.vercel.app/`
- Visit: `https://portfolio-xyz123.vercel.app/exams`

### 2. Test Admin Login
- Visit: `https://portfolio-xyz123.vercel.app/admin`
- Login with:
  - **Email**: `admin@towhidul.com`
  - **Password**: `YourSecurePassword123!` (whatever you set)

### 3. Test Features
- [ ] View exams list
- [ ] View exam details
- [ ] Create new exam
- [ ] Submit answers
- [ ] View results
- [ ] Edit exam settings

---

## Step 9: Set Custom Domain (Optional)

If you own a domain (e.g., `myportfolio.com`):

1. Go to **Vercel Dashboard** → **Select your project**
2. Click **"Settings"** tab
3. Go to **"Domains"**
4. Click **"Add Domain"**
5. Enter your domain name
6. Update DNS records at your domain provider with values Vercel provides
7. Wait 24 hours for DNS to propagate

---

## Common Issues & Solutions

### Issue 1: "Build Failed"
**Solution:**
- Check build logs (Vercel shows them live)
- Common cause: Missing environment variables
- Ensure `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set

### Issue 2: "Cannot POST /api/exams"
**Solution:**
- Verify environment variables are set correctly
- Check API route exists in `/src/app/api/`
- Refresh page and try again

### Issue 3: "File not found" in browser
**Solution:**
- This is expected for file-based storage (ephemeral)
- Data is lost when Vercel restarts the server
- Use MongoDB for persistent data (see below)

### Issue 4: Admin Login Not Working
**Solution:**
- Check exact email and password match environment variables
- Password is case-sensitive
- Clear browser cookies and try again

---

## Important: File Storage Limitation

**Current Setup (File-based):**
- ✅ Works fine on Vercel
- ❌ Data lost when server restarts
- ❌ Not suitable for production

### When Vercel Restarts (Your Data is Lost):
- New deployment
- Server error/crash
- Daily resets (Vercel free tier restart)

**For Production, Use MongoDB:**
1. Create free MongoDB cluster at https://mongodb.com/cloud/atlas
2. Get connection string
3. Update code to use MongoDB instead of file system
4. Set `MONGODB_URI` environment variable
5. Redeploy

---

## Monitoring & Debugging

### View Live Logs
1. Vercel Dashboard → Your Project
2. Click **"Deployments"** tab
3. Click latest deployment
4. Click **"View Logs"** button
5. Filter by "Edge Network", "Function", or "Build"

### Check Function Runtime
1. **"Functions"** tab
2. See all API routes and their performance
3. `/api/exams` - GET all exams function
4. `/api/exams/[slug]` - Dynamic exam routes

### Check Build Size
1. **"Deployments"** tab
2. Latest deployment details
3. See which files are largest

---

## Redeploying with Changes

Whenever you make code changes:

1. Commit to GitHub:
   ```bash
   git add .
   git commit -m "Update feature"
   git push origin main
   ```

2. Vercel **automatically redeploys** (takes 1-2 minutes)

3. No manual steps needed - GitHub integration handles it!

---

## Summary: The Exact Process

```
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Add New" → "Project"
4. Select towhid146/portfolio
5. Click "Import"
6. Add environment variables:
   - ADMIN_EMAIL = admin@towhidul.com
   - ADMIN_PASSWORD = YourSecurePassword123!
7. Click "Deploy"
8. Wait 2-5 minutes
9. Click "Visit" to see live app
10. Test at https://your-url.vercel.app/admin
```

**That's it! Your app is live! 🚀**

---

## Next Steps

After deployment:

1. **Monitor Performance**: Check Vercel dashboard regularly
2. **Add Monitoring**: Set up alerts for failed deployments
3. **Upgrade Database**: Switch from file-based to MongoDB
4. **Custom Domain**: Add your own domain name
5. **SSL Certificate**: Automatically enabled by Vercel

---

## Quick Links

- Vercel Dashboard: https://vercel.com/dashboard
- Your Project: https://vercel.com/dashboard/towhid146
- Documentation: https://vercel.com/docs
- Support: https://vercel.com/support

---

## Video Alternative

If you prefer video guide:
1. Search "Vercel Deploy Next.js" on YouTube
2. Follow along step-by-step
3. Should take ~5 minutes

---

