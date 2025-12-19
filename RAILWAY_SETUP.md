# Railway.app Deployment Setup Guide

## ✅ Fixes Applied
- Fixed Dockerfile to install all dependencies (including devDependencies) for TypeScript build
- Backend package.json already has proper `build` and `start` scripts
- Created root package.json for monorepo structure

## 🚀 Quick Start - Deploy Backend on Railway

### Step 1: Create Service in Railway
1. Go to [Railway.app](https://railway.app)
2. Create a new project
3. Click **"New Service"** → **"GitHub Repo"**
4. Select your repository
5. **IMPORTANT:** In the service settings, set **Root Directory** to: `backend`

### Step 2: Configure Build Settings
Railway should auto-detect these, but verify in Settings → Build:
- **Build Command:** `npm run build` (or leave empty for auto-detection)
- **Start Command:** `npm start` (or leave empty for auto-detection)

### Step 3: Environment Variables (Optional)
In Settings → Variables, add if needed:
- `ALLOWED_ORIGINS`: Your frontend URL(s), e.g., `https://your-frontend.railway.app`
- `PORT`: Railway sets this automatically, but you can override if needed

### Step 4: Deploy
- Railway will automatically build and deploy
- Check the Deployments tab for logs
- Your backend will be available at the generated Railway URL

## 🎯 Using Dockerfile (Alternative Method)

If you want to use the Dockerfile instead:
1. In Railway service settings → Settings → Build
2. Enable **"Use Dockerfile"**
3. Make sure Root Directory is set to `backend`
4. Railway will use your Dockerfile for building

## 📦 Deploy Frontend (Separate Service)

If you want to deploy the frontend too:
1. Create a **second service** in the same Railway project
2. Select the same GitHub repo
3. Set **Root Directory** to: `frontend`
4. **Build Command:** `npm run build`
5. **Start Command:** You'll need to serve the built files. Options:
   - Use Railway's static file serving (if available)
   - Or add `serve` package: `npm install -g serve && serve -s dist -l 3000`
   - Or use the Dockerfile (frontend has one)

## ⚙️ Important Notes

- ✅ Railway automatically sets `PORT` - your backend uses `process.env.PORT || 4000`
- ✅ Your backend package.json has `build` and `start` scripts configured correctly
- ✅ Dockerfile now installs all dependencies needed for the TypeScript build
- ⚠️ Make sure CORS `ALLOWED_ORIGINS` includes your frontend URL(s)

## 🔧 Troubleshooting

### "start.sh not found" error:
- This usually means Railway is looking in the wrong directory
- **Solution:** Set Root Directory to `backend` in service settings

### "Railpack couldn't determine how to build app":
- Railway couldn't detect Node.js project
- **Solution:** Ensure Root Directory is set to `backend` (where package.json exists)

### Build fails:
- Check that Root Directory is correct
- Verify package.json exists in that directory
- Check build logs in Railway dashboard

### TypeScript build errors:
- Fixed: Dockerfile now installs devDependencies needed for `tsc`

