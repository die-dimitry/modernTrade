import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Security: Define allowed MIME types
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/heic',
  'application/pdf'
];

const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.heic', '.pdf'];

const storage = multer.diskStorage({
  destination: function (_req: any, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
    cb(null, process.env.UPLOAD_DIR || './data/uploads');
  },
  filename: function (_req: any, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
    // Security: Sanitize filename
    const sanitizedName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    const ext = path.extname(sanitizedName).toLowerCase();
    // Security: Only allow safe extensions
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return cb(new Error('Invalid file extension'), '');
    }
    cb(null, `${Date.now()}-${uuidv4()}${ext}`);
  }
});

function fileFilter(_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) {
  const ext = path.extname(file.originalname).toLowerCase();
  
  // Security: Check both extension and MIME type
  const isValidExtension = ALLOWED_EXTENSIONS.includes(ext);
  const isValidMimeType = ALLOWED_MIME_TYPES.includes(file.mimetype);
  
  if (isValidExtension && isValidMimeType) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type. Allowed: ${ALLOWED_EXTENSIONS.join(', ')}`));
  }
}

export const upload = multer({
  storage,
  limits: { 
    fileSize: 8 * 1024 * 1024, // 8MB
    files: 1 // Only allow single file
  },
  fileFilter
});
