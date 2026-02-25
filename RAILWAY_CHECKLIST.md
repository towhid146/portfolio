# Railway Deployment Checklist

## Pre-Deployment

- [ ] All code committed to GitHub
- [ ] Tested locally: `npm run dev`
- [ ] package.json has correct scripts
- [ ] No console errors
- [ ] Ready for production

## Create Railway Account

- [ ] Visit https://railway.app
- [ ] Sign up with GitHub email
- [ ] Authorize GitHub access
- [ ] Verify email

## Create New Project

- [ ] Click "New Project"
- [ ] Select "Deploy from GitHub repo"
- [ ] Select your portfolio repository
- [ ] Click "Deploy Now"

## Configure Environment Variables

Railway will auto-detect it's a Node.js/Next.js app.

In Railway Project → Variables, add:

```
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=your_secure_password_here
NODE_ENV=production
PORT=3000
```

## Configure Build Settings

Usually auto-detected, but verify:

1. Go to Settings → Deployments
2. **Build Command:** `npm run build`
3. **Start Command:** `npm start`
4. **Node Version:** 18 or 20 (default is fine)

## Deploy

- [ ] Click "Deploy"
- [ ] Watch deployment logs
- [ ] Wait for "Deployment successful"
- [ ] Get your URL from Railway dashboard

## Post-Deployment

- [ ] Test your app at the provided Railway URL
- [ ] Test admin login: `/admin`
- [ ] Test exams: `/exams`
- [ ] Check logs for errors

## Setup Custom Domain (Optional)

1. Go to Project → Settings → Domains
2. Add your custom domain
3. Update DNS records with provided values
4. Wait 24h for DNS propagation

## Monitoring & Logs

- **Deployment Logs:** Deployments tab → View logs
- **Runtime Logs:** Logs tab
- **Metrics:** Metrics tab (storage, memory, CPU)

## File Storage

Files in `/data` are stored in Railway's ephemeral storage:

- **Persistent within deployment:** Yes
- **Persistent across redeployments:** Limited
- **For permanent storage:** Use MongoDB

## Environment Variables List

For Railway Variables tab, add these:

| Key              | Value                | Notes                |
| ---------------- | -------------------- | -------------------- |
| `ADMIN_EMAIL`    | `admin@example.com`  | Change to your email |
| `ADMIN_PASSWORD` | `SecurePassword123!` | Use strong password  |
| `NODE_ENV`       | `production`         | Required             |
| `MONGODB_URI`    | (optional)           | For database storage |

## Troubleshooting

| Issue                       | Solution                                        |
| --------------------------- | ----------------------------------------------- |
| Deployment fails            | Check Node.js version, package.json scripts     |
| "Cannot find module"        | Run `npm install` locally, commit lock file     |
| Files missing after restart | They're ephemeral - use MongoDB                 |
| Port already in use         | Railway assigns automatically, no action needed |
| High memory usage           | Check for memory leaks in code                  |

## Performance Tips

1. Enable caching in Railway settings
2. Use MongoDB for persistent data
3. Monitor deployment logs for issues
4. Set up alerts for deployment failures

## Rolling Back

If deployment breaks:

1. Go to Deployments tab
2. Find previous successful deployment
3. Click three dots → "Revert"
4. Railway will redeploy the previous version

## Useful Commands

```bash
# Test build locally
npm run build

# Test production build
npm start

# View what Railway will run
cat package.json | grep -A 3 "scripts"
```

## Cost Tracking

- First $5/month free
- Monitor usage in Project → Metrics
- Set up billing alerts in Account Settings
