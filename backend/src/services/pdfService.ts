import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { ensureConsentOutputDir, ensureContactOutputDir } from './storage';
import { getNextCounter } from './counter';

export async function generateContactPDF(opts: {
  name: string;
  mobile: string;
  email: string;
  message: string;
}) {
  ensureContactOutputDir();
  // Generate unique ID using timestamp and random number
  const id = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
  const outDir = process.env.CONTACT_OUTPUT_DIR || path.resolve(__dirname, '../../data/Contact Us Outputs');
  const outPath = path.join(outDir, `Contact-${id}.pdf`);

  return new Promise<string>((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const stream = fs.createWriteStream(outPath);
    doc.pipe(stream);

    doc.fontSize(20).text('MODERN TRADE — CONTACT FORM SUBMISSION', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Submission Date: ${new Date().toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    })}`);
    doc.moveDown();
    doc.fontSize(12).text(`Reference ID: ${id}`);
    doc.moveDown();
    doc.moveDown();

    doc.fontSize(14).text('Contact Information:', { underline: true });
    doc.moveDown();
    doc.fontSize(12).text(`Name: ${opts.name}`);
    doc.moveDown(0.5);
    doc.text(`Mobile: ${opts.mobile}`);
    doc.moveDown(0.5);
    doc.text(`Email: ${opts.email}`);
    doc.moveDown();

    doc.fontSize(14).text('Message:', { underline: true });
    doc.moveDown();
    doc.fontSize(11).text(opts.message, { 
      align: 'left',
      width: 500,
      lineGap: 2
    });

    doc.end();

    stream.on('finish', () => resolve(outPath));
    stream.on('error', (err) => reject(err));
  });
}

export async function generateConsentPDF(opts: {
  fullName: string;
  email: string;
  phoneNo: string;
  panNumber: string;
  whatsappNo?: string;
  agentName?: string;
  aadharPath: string;
  signaturePath: string;
  signatureImage?: string; // Base64 string alternative
  aadharImage?: string; // Base64 string alternative
  submissionDate: string;
  userIp: string;
  outputDir?: string;
}) {
  ensureConsentOutputDir();
  
  // Get next counter value
  const counter = getNextCounter();
  
  // Create filename: SU{counter}{FullName}{PANNumber}.pdf
  // Remove spaces and special characters from name for filename
  const sanitizedName = opts.fullName.replace(/[^a-zA-Z0-9]/g, '');
  const filename = `SU${counter}${sanitizedName}${opts.panNumber}.pdf`;
  
  const outDir = opts.outputDir || process.env.CONSENT_OUTPUT_DIR || path.resolve(__dirname, '../../data/User Consent Outputs');
  const outPath = path.join(outDir, filename);

  return new Promise<string>((resolve, reject) => {
    const doc = new PDFDocument({ 
      size: 'A4', 
      margin: 50,
      info: {
        Title: 'User Agreement & Risk Disclosure Statement',
        Author: 'Modern Trade',
        Subject: 'User Consent & Agreement',
        Creator: 'Modern Trade PDF Generator'
      }
    });
    const stream = fs.createWriteStream(outPath);
    doc.pipe(stream);

    // ========== HEADER SECTION ==========
    doc.fontSize(18).font('Helvetica-Bold').text('MODERN TRADE', { align: 'center' });
    doc.fontSize(12).font('Helvetica').text('Your Premium Market Analysis Service in India', { align: 'center' });
    doc.moveDown(1.5);

    // ========== LEGAL TEXT SECTION ==========
    doc.fontSize(16).font('Helvetica-Bold').text('USER AGREEMENT & RISK DISCLOSURE STATEMENT', { align: 'center' });
    doc.moveDown(0.8);
    
    doc.fontSize(11).font('Helvetica').text(`Effective Date: ${opts.submissionDate}`, { align: 'left' });
    doc.text('Jurisdiction: India', { align: 'left' });
    doc.moveDown(1);

    // Legal text with proper formatting
    const legalText = [
      { text: '1. PREAMBLE AND ACCEPTANCE', size: 12, bold: true, spacing: 0.8 },
      { text: `This User Agreement is a legally binding contract between the Service Provider and ${opts.fullName} (hereinafter "The User"). By accessing our services, the User explicitly acknowledges they have read, understood, and agreed to be bound by these terms.`, size: 10, bold: false, spacing: 0.5 },
      
      { text: '2. NATURE OF SERVICES (NO SEBI REGISTRATION)', size: 12, bold: true, spacing: 0.8 },
      { text: '2.1 Educational Purpose Only: The Company provides technical analysis and market research for educational purposes only.', size: 10, bold: false, spacing: 0.3 },
      { text: '2.2 Not Investment Advice: The Company is NOT registered with SEBI as an Investment Advisor. Content does not constitute "Investment Advice" under SEBI Regulations, 2013.', size: 10, bold: false, spacing: 0.3 },
      { text: '2.3 Independent Decision Making: All trading decisions are made solely by You.', size: 10, bold: false, spacing: 0.5 },
      
      { text: '3. RISK DISCLOSURE STATEMENT', size: 12, bold: true, spacing: 0.8 },
      { text: '3.1 High Risk: Trading in stocks, derivatives (F&O), and commodities involves substantial risk. There is a possibility of losing Your entire capital.', size: 10, bold: false, spacing: 0.3 },
      { text: '3.2 No Profit Guarantee: We do not guarantee fixed returns. Past performance is not indicative of future results.', size: 10, bold: false, spacing: 0.3 },
      { text: '3.3 Market Volatility: Markets are subject to rapid fluctuations beyond our control.', size: 10, bold: false, spacing: 0.5 },
      
      { text: '4. LIMITATION OF LIABILITY', size: 12, bold: true, spacing: 0.8 },
      { text: '4.1 Exclusion of Damages: You agree not to hold The Company liable for any financial losses incurred. You waive Your right to legal action regarding trading losses.', size: 10, bold: false, spacing: 0.3 },
      { text: '4.2 User Responsibility: You confirm You are trading with Your own capital.', size: 10, bold: false, spacing: 0.3 },
      { text: '4.3 Indemnity: You agree to indemnify The Company from claims arising from Your violation of this Agreement.', size: 10, bold: false, spacing: 0.5 },
      
      { text: '5. REFUND POLICY', size: 12, bold: true, spacing: 0.8 },
      { text: 'All fees are non-refundable and non-transferable. You confirm You have evaluated the service prior to subscription.', size: 10, bold: false, spacing: 0.5 },
      
      { text: '6. DISPUTE RESOLUTION', size: 12, bold: true, spacing: 0.8 },
      { text: 'Any dispute shall be referred to arbitration under the Arbitration and Conciliation Act, 1996. Jurisdiction is exclusive to the courts of India.', size: 10, bold: false, spacing: 0.5 },
    ];

    const pageHeight = 750; // A4 height minus margins (approximately)
    const bottomMargin = 50;

    for (const item of legalText) {
      // Check if we need a new page
      if (doc.y + 20 > pageHeight - bottomMargin) {
        doc.addPage();
      }

      doc.fontSize(item.size);
      doc.font(item.bold ? 'Helvetica-Bold' : 'Helvetica');
      
      // Use justified alignment for body text, left for headings
      const align = item.bold ? 'left' : 'justify';
      doc.text(item.text, {
        align: align,
        width: 495,
        lineGap: 2
      });
      
      doc.moveDown(item.spacing);
    }

    doc.moveDown(1);

    // ========== EXECUTION SECTION (User Details) ==========
    // Check if we need a new page for execution section
    if (doc.y + 150 > pageHeight - bottomMargin) {
      doc.addPage();
    }

    doc.fontSize(14).font('Helvetica-Bold').text('EXECUTION', { underline: true });
    doc.moveDown(0.5);
    
    doc.fontSize(11).font('Helvetica');
    const userDetails = [
      `Full Name: ${opts.fullName}`,
      `Email: ${opts.email}`,
      `Phone Number: ${opts.phoneNo}`,
      `PAN Card Number: ${opts.panNumber}`
    ];

    for (const detail of userDetails) {
      doc.text(detail, { align: 'left' });
      doc.moveDown(0.4);
    }

    if (opts.agentName) {
      doc.text(`Agent Name: ${opts.agentName}`, { align: 'left' });
      doc.moveDown(0.4);
    }

    doc.moveDown(1);

    // ========== SIGNATURE SECTION (Positioned on Right Side) ==========
    // Check if we need a new page for signature
    if (doc.y + 120 > pageHeight - bottomMargin) {
      doc.addPage();
    }

    const signatureStartY = doc.y;
    const signatureWidth = 200;
    const signatureHeight = 80;
    const pageWidth = 595; // A4 width in points
    const rightMargin = 50;
    const signatureX = pageWidth - rightMargin - signatureWidth;
    
    // Draw "Signed by:" label on the right side
    doc.fontSize(11).font('Helvetica').text('Signed by:', signatureX, signatureStartY, { align: 'left' });
    const signatureLabelY = doc.y;
    
    try {
      let signatureBuffer: Buffer | null = null;
      
      // Try to use signature image from path or base64
      if (opts.signatureImage) {
        // Handle base64 string
        const base64Data = opts.signatureImage.replace(/^data:image\/\w+;base64,/, '');
        signatureBuffer = Buffer.from(base64Data, 'base64');
      } else if (opts.signaturePath && fs.existsSync(opts.signaturePath)) {
        signatureBuffer = fs.readFileSync(opts.signaturePath);
      }

      if (signatureBuffer) {
        // Position signature image on the right side, below the "Signed by:" label
        const signatureImageY = signatureLabelY + 5;
        doc.image(signatureBuffer, signatureX, signatureImageY, {
          fit: [signatureWidth, signatureHeight]
        });
      } else {
        doc.fontSize(10).text('(Signature not available)', signatureX, signatureLabelY + 5, { align: 'left' });
      }
    } catch (e) {
      console.error('Error loading signature:', e);
      doc.fontSize(10).text('(Error loading signature)', signatureX, signatureLabelY + 5, { align: 'left' });
    }

    // Reset Y position to start Digital Consent Log on the left side
    // Ensure it starts at the same Y level as signature (they're side by side)
    doc.y = signatureStartY;

    // ========== DIGITAL CONSENT LOG ==========
    doc.fontSize(11).font('Helvetica-Bold').text('DIGITAL CONSENT LOG', { align: 'left' });
    doc.moveDown(0.3);
    doc.fontSize(10).font('Helvetica');
    doc.text(`Signed by: ${opts.fullName}`, { align: 'left' });
    doc.moveDown(0.2);
    doc.text(`IP Address: ${opts.userIp}`, { align: 'left' });
    doc.moveDown(0.2);
    doc.text(`Date: ${opts.submissionDate}`, { align: 'left' });
    doc.moveDown(1.5);

    // ========== FORCE PAGE BREAK ==========
    doc.addPage();

    // ========== AADHAR CARD ON LAST PAGE ==========
    doc.fontSize(12).font('Helvetica-Bold').text('Annexure A: User Identity Document (Aadhar)', { align: 'center' });
    doc.moveDown(1);

    try {
      let aadharBuffer: Buffer | null = null;
      
      // Try to use aadhar image from path or base64
      if (opts.aadharImage) {
        // Handle base64 string
        const base64Data = opts.aadharImage.replace(/^data:image\/\w+;base64,/, '');
        aadharBuffer = Buffer.from(base64Data, 'base64');
      } else if (opts.aadharPath && fs.existsSync(opts.aadharPath)) {
        aadharBuffer = fs.readFileSync(opts.aadharPath);
      }

      if (aadharBuffer) {
        // Scale image to fit within margins but remain legible
        // A4 width: 595pt, margins: 50pt each side = 495pt available width
        // Leave some padding, so max width ~450pt, height ~600pt
        const maxWidth = 450;
        const maxHeight = 600;
        
        // Center the image by calculating x position
        const pageWidth = 595; // A4 width in points
        const margin = 50;
        const imageWidth = maxWidth;
        const xPosition = (pageWidth - imageWidth) / 2;
        
        doc.image(aadharBuffer, xPosition, doc.y, {
          fit: [maxWidth, maxHeight]
        });
      } else {
        doc.fontSize(10).text('(Aadhar document not available)', { align: 'center' });
      }
    } catch (e) {
      console.error('Error loading Aadhar:', e);
      doc.fontSize(10).text('(Error loading Aadhar document)', { align: 'center' });
    }

    doc.end();

    stream.on('finish', () => resolve(outPath));
    stream.on('error', (err) => reject(err));
  });
}
