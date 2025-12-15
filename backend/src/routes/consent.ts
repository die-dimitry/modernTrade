import express from 'express';
import { upload } from '../middlewares/upload';
import path from 'path';
import sharp from 'sharp';
import { generateConsentPDF } from '../services/pdfService';
import { ensureDirs } from '../services/storage';
import fs from 'fs';
const router = express.Router();

// Security: Input validation helpers
function sanitizeInput(input: string, maxLength: number = 1000): string {
  if (!input || typeof input !== 'string') return '';
  return input.trim().slice(0, maxLength).replace(/[<>]/g, '');
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone: string): boolean {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

function validatePAN(pan: string): boolean {
  // PAN format: 5 letters, 4 digits, 1 letter (e.g., ABCDE1234F)
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan) && pan.length === 10;
}

router.post('/submit', upload.single('aadhar'), async (req, res) => {
  try {
    const { fullName, email, phoneNo, panNumber, whatsappNo, agentName } = req.body;
    const aadharFile = req.file;
    const signatureDataUrl = req.body.signature;

    // Security: Validate required fields
    if (!fullName || !email || !phoneNo || !panNumber) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    if (!aadharFile) {
      return res.status(400).json({ error: 'Aadhar file required' });
    }
    if (!signatureDataUrl) {
      return res.status(400).json({ error: 'Signature required' });
    }

    // Extract user IP address (prioritize headers, then connection, handle IPv6)
    let userIp = 'Unknown';
    
    // Check x-forwarded-for header first (most reliable for proxied requests)
    const forwardedFor = req.headers['x-forwarded-for'];
    if (forwardedFor) {
      const ips = forwardedFor.toString().split(',').map(ip => ip.trim());
      // Get the first IP (original client IP)
      userIp = ips[0];
    } else {
      // Check x-real-ip header
      const realIp = req.headers['x-real-ip'];
      if (realIp) {
        userIp = realIp.toString().trim();
      } else {
        // Fall back to req.ip or connection.remoteAddress
        const ip = req.ip || (req.socket?.remoteAddress) || req.connection?.remoteAddress;
        if (ip) {
          userIp = ip.toString().trim();
        }
      }
    }
    
    // Convert IPv6 localhost to IPv4 for better readability
    if (userIp === '::1' || userIp === '::ffff:127.0.0.1') {
      userIp = '127.0.0.1';
    }
    
    // Remove IPv6 prefix if present (::ffff:)
    if (userIp.startsWith('::ffff:')) {
      userIp = userIp.replace('::ffff:', '');
    }

    // Format submission date
    const submissionDate = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });

    // Security: Sanitize and validate inputs
    const sanitizedFullName = sanitizeInput(fullName, 100);
    const sanitizedEmail = sanitizeInput(email, 255);
    const sanitizedPhoneNo = sanitizeInput(phoneNo, 20);
    const sanitizedPAN = sanitizeInput(panNumber, 10).toUpperCase().replace(/[^A-Z0-9]/g, '');
    const sanitizedAgentName = agentName ? sanitizeInput(agentName, 100) : undefined;

    if (!sanitizedFullName || sanitizedFullName.length < 2) {
      return res.status(400).json({ error: 'Invalid name' });
    }

    if (!validateEmail(sanitizedEmail)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (!validatePhone(sanitizedPhoneNo)) {
      return res.status(400).json({ error: 'Invalid phone number' });
    }

    if (!sanitizedPAN || sanitizedPAN.length !== 10) {
      return res.status(400).json({ error: 'PAN Card Number must be exactly 10 characters' });
    }

    if (!validatePAN(sanitizedPAN)) {
      return res.status(400).json({ error: 'Invalid PAN Card Number format' });
    }

    ensureDirs();

    const uploadedPath = aadharFile.path;
    const ext = path.extname(uploadedPath).toLowerCase();
    let processedAadhar = uploadedPath;
    if (ext === '.heic') {
      const converted = `${uploadedPath}.jpg`;
      await sharp(uploadedPath).jpeg().toFile(converted);
      processedAadhar = converted;
    } else {
      const normalized = `${uploadedPath}-norm.jpg`;
      await sharp(uploadedPath).resize({ width: 1200, withoutEnlargement: true }).jpeg().toFile(normalized);
      processedAadhar = normalized;
    }

    // Security: Validate signature data URL format
    const matches = signatureDataUrl.match(/^data:(image\/(png|jpeg));base64,(.+)$/);
    if (!matches) {
      return res.status(400).json({ error: 'Invalid signature data format' });
    }
    
    // Security: Limit signature size (max 500KB)
    const sigBase64 = matches[3];
    if (sigBase64.length > 500000) {
      return res.status(400).json({ error: 'Signature too large' });
    }
    
    const sigBuffer = Buffer.from(sigBase64, 'base64');
    const sigPath = path.join(process.env.UPLOAD_DIR || './data/uploads', `${Date.now()}-sig.png`);
    fs.writeFileSync(sigPath, sigBuffer);

    const pdfPath = await generateConsentPDF({
      fullName: sanitizedFullName,
      email: sanitizedEmail,
      phoneNo: sanitizedPhoneNo,
      panNumber: sanitizedPAN,
      whatsappNo: whatsappNo ? sanitizeInput(whatsappNo, 20) : undefined,
      agentName: sanitizedAgentName,
      aadharPath: processedAadhar,
      signaturePath: sigPath,
      signatureImage: signatureDataUrl, // Pass base64 string as well
      submissionDate: submissionDate,
      userIp: userIp
    });

    const pdfUrl = `/api/consent/files/${path.basename(pdfPath)}`;
    return res.json({ success: true, pdfUrl });
  } catch (err: any) {
    // Security: Don't expose internal error details
    console.error('Error /consent/submit', err?.message || err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Security: Serve static files with proper headers
router.use('/files', express.static(
  path.resolve(process.env.CONSENT_OUTPUT_DIR || path.join(__dirname, '../../data/User Consent Outputs')),
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
