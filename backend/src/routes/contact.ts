import express from 'express';
import path from 'path';
import { generateContactPDF } from '../services/pdfService';
import { ensureContactOutputDir } from '../services/storage';

const router = express.Router();

// Security: Input validation and sanitization helper
function sanitizeInput(input: string, maxLength: number = 1000): string {
  if (!input || typeof input !== 'string') return '';
  // Remove potentially dangerous characters
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, '');
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return false;
  // Remove all spaces and validate
  const cleaned = phone.replace(/\s/g, '');
  // Allow international format: + followed by country code and number
  // Must have at least country code + 1 digit (minimum 3 characters like +91)
  // Maximum 15 characters total (country code + number)
  const phoneRegex = /^\+[1-9]\d{1,14}$/;
  return phoneRegex.test(cleaned) && cleaned.length >= 3;
}

router.post('/submit', async (req, res) => {
  try {
    const { name, mobile, email, message } = req.body;

    // Security: Validate all required fields
    if (!name || !mobile || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Security: Sanitize and validate inputs
    const sanitizedName = sanitizeInput(name, 100);
    const sanitizedEmail = sanitizeInput(email, 255);
    const sanitizedMobile = sanitizeInput(mobile, 20);
    const sanitizedMessage = sanitizeInput(message, 2000);

    if (!sanitizedName || sanitizedName.length < 2) {
      return res.status(400).json({ error: 'Invalid name' });
    }

    if (!validateEmail(sanitizedEmail)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (!validatePhone(sanitizedMobile)) {
      return res.status(400).json({ error: 'Invalid phone number' });
    }

    if (!sanitizedMessage || sanitizedMessage.length < 10) {
      return res.status(400).json({ error: 'Message too short' });
    }

    ensureContactOutputDir();

    const pdfPath = await generateContactPDF({
      name: sanitizedName,
      mobile: sanitizedMobile,
      email: sanitizedEmail,
      message: sanitizedMessage
    });

    const pdfUrl = `/api/contact/files/${path.basename(pdfPath)}`;
    return res.json({ success: true, pdfUrl });
  } catch (err: any) {
    // Security: Don't expose internal error details
    console.error('Error /contact/submit', err?.message || err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Security: Serve static files with proper headers
router.use('/files', express.static(
  path.resolve(process.env.CONTACT_OUTPUT_DIR || path.join(__dirname, '../../data/Contact Us Outputs')),
  {
    setHeaders: (res, filePath) => {
      // Only serve PDF files
      if (path.extname(filePath) === '.pdf') {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline');
      }
    }
  }
));
export default router;

