# 🚀 Deployment Guide - Modern Trade Website

This guide covers the **easiest** deployment options for your website, ranked from simplest to more advanced.

---

## 🥇 **OPTION 1: Railway.app (RECOMMENDED - Easiest)**

**Best for:** Quick deployment, zero server management, automatic HTTPS

**Cost:** Free tier available, then ~$5-20/month

### Steps:

1. **Sign up at [Railway.app](https://railway.app)** (free account)

2. **Deploy Backend:**
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway auto-detects Node.js
   - Add environment variables:
     ```
     PORT=4000
     NODE_ENV=production
     ALLOWED_ORIGINS=https://your-frontend-domain.com
     ```
   - Railway will auto-build and deploy

3. **Deploy Frontend:**
   - Create another service in same project
   - Point to `frontend` directory
   - Set build command: `npm run build`
   - Set start command: `npm run preview` (or use Railway's static hosting)
   - Add environment variable:
     ```
     VITE_API_BASE=https://your-backend-url.up.railway.app/api
     ```

4. **Get Domain:**
   - Railway provides free `.railway.app` domains
   - Or connect your custom domain (free)

**Pros:** ✅ Zero config, auto HTTPS, easy scaling, file storage included  
**Cons:** ⚠️ Can get expensive with high traffic

---

## 🥈 **OPTION 2: Render.com (Also Very Easy)**

**Best for:** Free tier, simple setup, good for small-medium traffic

**Cost:** Free tier available, then ~$7-25/month

### Steps:

1. **Sign up at [Render.com](https://render.com)**

2. **Deploy Backend:**
   - New → Web Service
   - Connect GitHub repo
   - Settings:
     - **Root Directory:** `backend`
     - **Build Command:** `npm install && npm run build`
     - **Start Command:** `npm start`
     - **Environment:** Node
   - Add environment variables (same as Railway)
   - Deploy!

3. **Deploy Frontend:**
   - New → Static Site
   - Connect GitHub repo
   - Settings:
     - **Root Directory:** `frontend`
     - **Build Command:** `npm install && npm run build`
     - **Publish Directory:** `dist`
   - Add environment variable: `VITE_API_BASE=https://your-backend.onrender.com/api`

**Pros:** ✅ Free tier, simple, auto HTTPS  
**Cons:** ⚠️ Free tier spins down after inactivity (15 min wake-up delay)

---

## 🥉 **OPTION 3: VPS with PM2 + Nginx (Most Control)**

**Best for:** Full control, predictable costs, production-ready

**Cost:** $5-12/month (DigitalOcean, Vultr, Linode)

### Quick Setup:

1. **Get VPS:**
   - Sign up at [DigitalOcean](https://digitalocean.com) or [Vultr](https://vultr.com)
   - Create Ubuntu 22.04 droplet ($6/month minimum)

2. **SSH into server:**
   ```bash
   ssh root@your-server-ip
   ```

3. **Install Node.js:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

4. **Install PM2:**
   ```bash
   sudo npm install -g pm2
   ```

5. **Install Nginx:**
   ```bash
   sudo apt update
   sudo apt install nginx -y
   ```

6. **Clone your repo:**
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

7. **Setup Backend:**
   ```bash
   cd backend
   npm install
   npm run build
   # Create .env file
   nano .env
   # Add: PORT=4000, NODE_ENV=production, etc.
   pm2 start dist/index.js --name "modern-trade-api"
   pm2 save
   pm2 startup
   ```

8. **Setup Frontend:**
   ```bash
   cd ../frontend
   npm install
   npm run build
   # Copy dist to nginx
   sudo cp -r dist/* /var/www/html/
   ```

9. **Configure Nginx:**
   ```bash
   sudo nano /etc/nginx/sites-available/default
   ```
   
   Replace with:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com www.your-domain.com;
       
       # Frontend
       root /var/www/html;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
       
       # Backend API
       location /api {
           proxy_pass http://localhost:4000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   
   ```bash
   sudo nginx -t
   sudo systemctl restart nginx
   ```

10. **Setup SSL (Free with Let's Encrypt):**
    ```bash
    sudo apt install certbot python3-certbot-nginx -y
    sudo certbot --nginx -d your-domain.com -d www.your-domain.com
    ```

**Pros:** ✅ Full control, predictable cost, no vendor lock-in  
**Cons:** ⚠️ Requires server management knowledge

---

## 🎯 **OPTION 4: Vercel (Frontend) + Railway (Backend)**

**Best for:** Best performance, modern stack, separate scaling

### Steps:

1. **Deploy Backend on Railway** (see Option 1)

2. **Deploy Frontend on Vercel:**
   - Sign up at [Vercel.com](https://vercel.com)
   - Import GitHub repo
   - Settings:
     - **Root Directory:** `frontend`
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
   - Add environment variable: `VITE_API_BASE=https://your-backend-url/api`
   - Deploy!

**Pros:** ✅ Best frontend performance, free tier, auto HTTPS  
**Cons:** ⚠️ Two services to manage

---

## 📋 **Pre-Deployment Checklist**

Before deploying, make sure:

- [ ] Update `VITE_API_BASE` in frontend to point to your backend URL
- [ ] Set `ALLOWED_ORIGINS` in backend to include your frontend domain
- [ ] Test file uploads work (Aadhar card upload)
- [ ] Test PDF generation works
- [ ] Verify IP address logging works
- [ ] Set up domain name (optional but recommended)
- [ ] Configure SSL/HTTPS (automatic on Railway/Render/Vercel)

---

## 🔧 **Environment Variables Needed**

### Backend (.env):
```env
PORT=4000
NODE_ENV=production
ALLOWED_ORIGINS=https://your-frontend-domain.com,https://www.your-frontend-domain.com
UPLOAD_DIR=./data/uploads
CONTACT_OUTPUT_DIR=./data/Contact Us Outputs
CONSENT_OUTPUT_DIR=./data/User Consent Outputs
```

### Frontend (build-time):
```env
VITE_API_BASE=https://your-backend-url.com/api
```

---

## 🎯 **My Recommendation**

**For Quick Launch:** Use **Railway.app** (Option 1) - it's the easiest and handles everything automatically.

**For Long-term:** Use **VPS with PM2 + Nginx** (Option 3) - more control and predictable costs.

**For Best Performance:** Use **Vercel + Railway** (Option 4) - modern, scalable, free tiers available.

---

## 🆘 **Need Help?**

If you get stuck, check:
- Railway docs: https://docs.railway.app
- Render docs: https://render.com/docs
- PM2 docs: https://pm2.keymetrics.io/docs
- Nginx docs: https://nginx.org/en/docs/


