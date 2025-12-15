# Modern Trade — Single Monorepo (Frontend + Backend)

This repo contains a single-monorepo for Modern Trade (React frontend + Express backend).
It is tuned for VPS deployment (no Docker required) but includes a docker-compose for convenience.

## Run locally (development)

### Backend
```bash
cd backend
npm install
# create directories for uploads and pdfs
mkdir -p data/uploads data/pdfs
# set env vars, you can copy .env.example to .env and edit
cp .env.example .env
npm run dev
# Backend runs at http://localhost:4000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# Frontend runs at http://localhost:3000
# For production build:
npm run build
# Serve build via a static server or Nginx from frontend/dist
```

### Notes
- For VPS, use PM2 to run backend in production and Nginx as reverse proxy to serve frontend and proxy API.
- Backend stores uploads in `backend/data` and generated PDFs in `backend/data/pdfs`.
- This code is provided as a starting point; review security, email, and legal text before production.
