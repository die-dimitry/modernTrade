# ⚡ Quick Start Deployment - Railway.app (5 Minutes)

This is the **fastest** way to get your website live.

## Step 1: Prepare Your Code

1. Make sure your code is on GitHub
2. Ensure `.env` is in `.gitignore` (already done ✅)

## Step 2: Deploy Backend (2 minutes)

1. Go to [railway.app](https://railway.app) and sign up (free)
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repository
4. Railway will auto-detect it's a Node.js app
5. Click on the service → **Settings** → **Variables**
6. Add these environment variables:
   ```
   PORT=4000
   NODE_ENV=production
   ALLOWED_ORIGINS=https://your-app-name.up.railway.app
   ```
7. Go to **Settings** → **Root Directory** → Set to: `backend`
8. Railway will auto-deploy! ✅

**Note the backend URL** (e.g., `https://modern-trade-api.up.railway.app`)

## Step 3: Deploy Frontend (2 minutes)

1. In the same Railway project, click **"+ New"** → **"GitHub Repo"**
2. Select the same repository
3. Go to **Settings** → **Root Directory** → Set to: `frontend`
4. Go to **Settings** → **Build Command** → Set to: `npm install && npm run build`
5. Go to **Settings** → **Start Command** → Set to: `npx serve -s dist -l 3000`
6. Go to **Variables** → Add:
   ```
   VITE_API_BASE=https://your-backend-url.up.railway.app/api
   ```
   (Replace with your actual backend URL from Step 2)
7. Railway will auto-deploy! ✅

## Step 4: Update CORS (1 minute)

1. Go back to your **Backend** service
2. **Variables** → Update `ALLOWED_ORIGINS`:
   ```
   ALLOWED_ORIGINS=https://your-frontend-url.up.railway.app
   ```
   (Replace with your actual frontend URL)

## Step 5: Test! 🎉

1. Visit your frontend URL
2. Test the contact form
3. Test the user consent form
4. Check if PDFs are generated correctly

## 🎯 You're Live!

Railway provides:
- ✅ Free `.railway.app` domains
- ✅ Automatic HTTPS
- ✅ Auto-scaling
- ✅ Zero server management

## 💰 Cost

- **Free tier:** 500 hours/month (enough for testing)
- **Hobby plan:** $5/month (recommended for production)
- **Pro plan:** $20/month (for higher traffic)

## 🔗 Custom Domain (Optional)

1. In Railway, go to your service → **Settings** → **Domains**
2. Click **"Generate Domain"** or **"Add Custom Domain"**
3. Follow the DNS instructions

---

**That's it!** Your website is now live on the internet! 🚀


