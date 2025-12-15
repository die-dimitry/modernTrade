import fs from 'fs';
import path from 'path';

export function ensureDirs() {
  const uploadDir = process.env.UPLOAD_DIR || path.resolve(__dirname, '../../data/uploads');
  const pdfDir = process.env.PDF_DIR || path.resolve(__dirname, '../../data/pdfs');
  fs.mkdirSync(uploadDir, { recursive: true });
  fs.mkdirSync(pdfDir, { recursive: true });
}

export function ensureContactOutputDir() {
  const contactOutputDir = process.env.CONTACT_OUTPUT_DIR || path.resolve(__dirname, '../../data/Contact Us Outputs');
  fs.mkdirSync(contactOutputDir, { recursive: true });
}

export function ensureConsentOutputDir() {
  const consentOutputDir = process.env.CONSENT_OUTPUT_DIR || path.resolve(__dirname, '../../data/User Consent Outputs');
  fs.mkdirSync(consentOutputDir, { recursive: true });
}
