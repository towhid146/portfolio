# Vercel Deployment Checklist

## Pre-Deployment

- [ ] All code committed to GitHub
- [ ] No sensitive data in code (use environment variables)
- [ ] Tested locally: `npm run dev`
- [ ] No console errors
- [ ] Admin credentials updated in code OR environment variables

## Create Vercel Account

- [ ] Visit https://vercel.com
- [ ] Sign up with GitHub
- [ ] Authorize GitHub access

## Deploy Project

- [ ] Click "New Project" on Vercel dashboard
- [ ] Select your GitHub repository
- [ ] Click "Import"
- [ ] Wait for auto-detection (should detect Next.js)
- [ ] Click "Deploy"

## Configure Environment Variables

In Vercel Project Settings → Environment Variables, add:

```
ADMIN_EMAIL = admin@yourdomain.com
ADMIN_PASSWORD = your_secure_password_here
```

Then **redeploy** (or it will redeploy automatically)

## Post-Deployment

- [ ] Access your live site at `[project].vercel.app`
- [ ] Test admin login: `/admin`
- [ ] Test exams: `/exams`
- [ ] Check build logs for errors
- [ ] (Optional) Add custom domain in Settings → Domains

## Troubleshooting

| Issue                       | Solution                                    |
| --------------------------- | ------------------------------------------- |
| "Not found" on page refresh | Next.js needs rebuild - wait for deployment |
| Admin login fails           | Check environment variables are set         |
| Missing files in `/data`    | Use MongoDB or Railway instead              |
| Build fails                 | Check Node.js version 18+                   |
| API 404 errors              | Check API route paths                       |

## Monitoring

- **Vercel Analytics**: Dashboard → Analytics
- **Deployment Logs**: Dashboard → Deployments → Logs
- **Function Logs**: Dashboard → Functions

## Roll Back

If something breaks:

1. Go to Deployments
2. Click previous successful deployment
3. Click "Redeploy"
