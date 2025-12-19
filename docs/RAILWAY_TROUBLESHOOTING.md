# Railway Deployment Troubleshooting

## Error: "No start command was found"

If you're getting this error even after setting Root Directory, try these solutions:

### Solution 1: Set Root Directory in Railway Dashboard (MOST IMPORTANT)

1. Go to Railway Dashboard → Your Service
2. Click **Settings** tab
3. Scroll to **"Root Directory"** section
4. Set it to exactly: `backend` (no leading slash, no trailing slash)
5. Click **Save**
6. Railway will redeploy automatically

### Solution 2: Set Build/Start Commands as Environment Variables

If Root Directory alone doesn't work, set these in Railway Dashboard:

1. Go to your service → **Variables** tab
2. Add these environment variables:
   - `RAILWAY_BUILD_COMMAND` = `npm install && npm run build`
   - `RAILWAY_START_COMMAND` = `npm start`

### Solution 3: Verify package.json

Make sure `backend/package.json` has:
```json
{
  "scripts": {
    "start": "node dist/index.js",
    "build": "tsc"
  }
}
```

✅ Your package.json already has these!

### Solution 4: Check File Structure

Ensure your repository structure is:
```
modern-trade-monorepo/
  backend/
    package.json  ← Must exist
    railway.json  ← Railway config
    Procfile      ← Alternative start method
    src/
      index.ts
    tsconfig.json
```

### Why This Happens

Railway's Railpack (Nixpacks) tries to auto-detect how to build/run your app. For monorepos, it can get confused and look at the root directory instead of your service directory. Setting Root Directory tells Railway where your actual app code is.

### Verification

After setting Root Directory, check the build logs:
- Should see: "Detected Node"
- Should see: "Running: npm run build"
- Should see: "Starting: npm start"
- Should NOT see: "No start command was found"

## Still Having Issues?

1. Delete the service in Railway
2. Create a new service
3. Connect your GitHub repo
4. **IMMEDIATELY set Root Directory to `backend`** before Railway tries to build
5. Save and let it deploy

This ensures Railway uses the correct directory from the start.

