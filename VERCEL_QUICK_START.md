# Vercel Deployment Quick Reference

## 🚀 Deploy in 5 Steps

### 1️⃣ Sign Up

```
https://vercel.com → "Sign Up with GitHub"
```

### 2️⃣ Import Project

```
"Add New" → "Project" → Select "towhid146/portfolio"
```

### 3️⃣ Add Env Variables

```
ADMIN_EMAIL = admin@towhidul.com
ADMIN_PASSWORD = YourSecurePassword123!
```

### 4️⃣ Click Deploy

```
Click "Deploy" button → Wait 2-5 minutes
```

### 5️⃣ Live!

```
Visit: https://portfolio-xyz123.vercel.app
Admin: https://portfolio-xyz123.vercel.app/admin
```

---

## ✅ Verification Checklist

After deployment, test these:

- [ ] Homepage loads: `/`
- [ ] Blog page loads: `/blog`
- [ ] Exams page loads: `/exams`
- [ ] Exam takes loads: `/exams/[slug]`
- [ ] Admin login page: `/admin`
- [ ] Admin login works with credentials
- [ ] Admin dashboard loads: `/admin/exams`
- [ ] Create exam works: `/admin/exams/new`
- [ ] Edit exam works: `/admin/exams/[slug]/edit`
- [ ] Submit exam works

---

## 📱 Test URLs

```
Homepage:        https://portfolio-xyz123.vercel.app/
Blog:            https://portfolio-xyz123.vercel.app/blog
Public Exams:    https://portfolio-xyz123.vercel.app/exams
Format Guide:    https://portfolio-xyz123.vercel.app/MCQ_FORMAT_GUIDE.md
Admin Login:     https://portfolio-xyz123.vercel.app/admin
Admin Dashboard: https://portfolio-xyz123.vercel.app/admin/exams
```

---

## 🔑 Important: Change Admin Password

**Before final deployment:**

1. Go to Vercel Project Settings
2. Go to "Environment Variables"
3. Update `ADMIN_PASSWORD` to something secure
4. Redeploy (automatic)

Example secure password:

```
Portfolio@2026#Secure!
```

---

## 🔄 Auto-Redeploy

Every time you:

1. Push code to GitHub
2. Vercel **automatically** redeploys
3. Takes 1-2 minutes
4. No manual action needed

---

## 🐛 Troubleshooting

| Problem         | Solution                            |
| --------------- | ----------------------------------- |
| Build fails     | Check build logs, verify env vars   |
| API 404         | Check `/src/app/api/` routes exist  |
| Login fails     | Verify ADMIN_EMAIL & ADMIN_PASSWORD |
| Data disappears | Normal - file storage is ephemeral  |
| Slow response   | Check Functions dashboard           |

---

## 📊 Monitor Your App

In Vercel Dashboard:

```
Deployments  → See live deployment logs
Functions    → See API route performance
Monitoring   → See errors and usage
Analytics    → See page performance
```

---

## 🎯 Success Indicators

✅ App is deployed when you see:

- Green checkmark on latest deployment
- "Visit" button is clickable
- Homepage loads without errors
- Admin login works

---

## 🔗 Links

- Vercel: https://vercel.com
- Your Dashboard: https://vercel.com/dashboard
- Project Settings: https://vercel.com/dashboard/settings
- Docs: https://vercel.com/docs/frameworks/nextjs

---

**You're all set! 🎉**
