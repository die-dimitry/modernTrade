import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import consentRouter from './routes/consent';
import contactRouter from './routes/contact';
import { ensureDirs } from './services/storage';

// Load environment variables from .env, but don't crash if the file is missing
dotenv.config();

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

// Trust proxy to get real IP address (important for IP extraction)
app.set('trust proxy', true);

// Security: Configure Helmet with sensible defaults
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
    // Needed for some browsers/tools and to avoid breaking third-party resources
    crossOriginEmbedderPolicy: false,
  })
);

// Allow images and other resources to be loaded across origins (for CDN / separate frontend)
app.use(
  helmet.crossOriginResourcePolicy({
    policy: 'cross-origin',
  })
);

// Security: Restrict CORS to specific origins, configurable via env
const defaultAllowedOrigins = new Set<string>([
  'http://localhost:3000',
  'http://localhost:5173',
]);

if (process.env.FRONTEND_URL) {
  defaultAllowedOrigins.add(process.env.FRONTEND_URL);
}

if (process.env.ALLOWED_ORIGINS) {
  process
    .env
    .ALLOWED_ORIGINS
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
    .forEach((origin) => defaultAllowedOrigins.add(origin));
}

app.use(
  cors({
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin || defaultAllowedOrigins.has(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Security: Limit body size to prevent DoS
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));

ensureDirs();

app.use('/api/consent', consentRouter);
app.use('/api/contact', contactRouter);
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`Backend listening on ${PORT}`);
});
