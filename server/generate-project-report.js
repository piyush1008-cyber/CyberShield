const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, '..', 'CyberShield_Complete_Project_Report.pdf');
const doc = new PDFDocument({ margin: 50, size: 'A4' });
const writeStream = fs.createWriteStream(outputPath);
doc.pipe(writeStream);

// Helper for horizontal rule
function drawDivider(y) {
  doc.strokeColor('#cbd5e1').lineWidth(1).moveTo(50, y).lineTo(545, y).stroke();
}

// ─────────────────────────────────────────────────────────────
// PAGE 1: COVER PAGE
// ─────────────────────────────────────────────────────────────
// Dark background top banner
doc.rect(0, 0, 595, 220).fill('#0f172a');

doc.fillColor('#38bdf8').fontSize(32).font('Helvetica-Bold')
  .text('CYBERSHIELD', 50, 60);

doc.fillColor('#ffffff').fontSize(16).font('Helvetica')
  .text('AI-Powered Cybercrime Redressal & Threat Intelligence Platform', 50, 105, { width: 495 });

doc.fillColor('#94a3b8').fontSize(11).font('Helvetica')
  .text('Comprehensive Project Report & Technical Architecture Dossier (2026 Edition)', 50, 155);

// Meta details card
doc.rect(50, 260, 495, 140).fill('#f8fafc').strokeColor('#e2e8f0').lineWidth(1).stroke();

doc.fillColor('#0f172a').fontSize(12).font('Helvetica-Bold').text('PROJECT METADATA & SPECIFICATIONS', 70, 280);
drawDivider(298);

doc.fillColor('#475569').fontSize(10).font('Helvetica-Bold').text('Project Type:', 70, 310);
doc.fillColor('#0f172a').font('Helvetica').text('Final Year Capstone Project / Production AI Platform', 180, 310);

doc.fillColor('#475569').font('Helvetica-Bold').text('Team Lead:', 70, 330);
doc.fillColor('#0f172a').font('Helvetica').text('Peeyoosh Kangle & Team (4 Members)', 180, 330);

doc.fillColor('#475569').font('Helvetica-Bold').text('Core Stack:', 70, 350);
doc.fillColor('#0f172a').font('Helvetica').text('React 19, Node.js, Express, MongoDB, Google Gemini 3.8 Flash', 180, 350);

doc.fillColor('#475569').font('Helvetica-Bold').text('Date of Submission:', 70, 370);
doc.fillColor('#0f172a').font('Helvetica').text('October 2026', 180, 370);

// Key Highlights Summary on Cover
doc.fillColor('#0f172a').fontSize(14).font('Helvetica-Bold').text('KEY INNOVATION HIGHLIGHTS', 50, 430);
doc.rect(50, 450, 495, 280).fill('#f1f5f9');

const highlights = [
  '• Google Gemini 3.8 Flash NLP Engine for automated cybercrime triage & severity calculation.',
  '• Real-time heuristic Phishing & Malicious URL Scanner with threat breakdown & 0-100 risk score.',
  '• Multi-Lingual Indian AI Chatbot supporting 11 regional languages (Hindi, Marathi, Hinglish, Tamil, etc.).',
  '• Visual Analytics Intelligence Center with interactive Recharts (pie, bar, area charts).',
  '• Automated Legal-Grade PDF Incident Report Generation compliant with forensic documentation.',
  '• Strict Role-Based Access Control (RBAC) across Citizen, Investigator, and Administrator roles.',
  '• Fail-Safe Multi-Model Fallback & Local Emergency Knowledge Base ensuring 100% demo uptime.'
];

let hy = 470;
highlights.forEach(h => {
  doc.fillColor('#334155').fontSize(10).font('Helvetica').text(h, 70, hy, { width: 455, lineGap: 3 });
  hy += 34;
});

// ─────────────────────────────────────────────────────────────
// PAGE 2: EXECUTIVE SUMMARY & PROBLEM STATEMENT
// ─────────────────────────────────────────────────────────────
doc.addPage();
doc.rect(50, 40, 495, 30).fill('#0f172a');
doc.fillColor('#ffffff').fontSize(13).font('Helvetica-Bold').text('CHAPTER 1: EXECUTIVE SUMMARY & PROBLEM CONTEXT', 60, 48);

doc.fillColor('#0f172a').fontSize(12).font('Helvetica-Bold').text('1.1 Introduction', 50, 90);
doc.fillColor('#334155').fontSize(10).font('Helvetica').text(
  'India has witnessed an unprecedented surge in digital transactions and online interactions, accompanied by a sharp rise in cybercrimes including UPI fraud, phishing lures, identity theft, and extortion scams. In critical situations, victims often face severe anxiety and delay due to cumbersome reporting systems, language barriers, and lack of technical knowledge regarding threat classification.',
  50, 108, { width: 495, align: 'justify', lineGap: 3 }
);

doc.fillColor('#0f172a').fontSize(12).font('Helvetica-Bold').text('1.2 Limitations of Legacy Portals', 50, 180);
doc.fillColor('#334155').fontSize(10).font('Helvetica').text(
  'Traditional complaint portals function purely as static digital filing cabinets with severe shortcomings:\n' +
  '1. Passive Record-Keeping: No intelligent analysis of incident narratives or severity triage.\n' +
  '2. Language Divide: Portals are predominantly in English, alienating rural and non-English speaking citizens.\n' +
  '3. Lack of Preventive Tools: Citizens have no mechanism to test suspicious links before falling victim.\n' +
  '4. No Actionable Guidance: Victims are not provided immediate "Golden Hour" guidance (e.g. freeze accounts, call 1930).\n' +
  '5. Poor Visibility: Administrators lack interactive visual dashboards to identify emerging crime hotspots.',
  50, 198, { width: 495, lineGap: 3 }
);

doc.fillColor('#0f172a').fontSize(12).font('Helvetica-Bold').text('1.3 The CyberShield Solution', 50, 320);
doc.fillColor('#334155').fontSize(10).font('Helvetica').text(
  'CyberShield re-engineers cybercrime management by placing an active AI intelligence layer between the citizen and law enforcement. By combining Google Gemini 3.8 Flash with modern full-stack web engineering, the platform auto-categorizes crimes, detects phishing vectors, communicates in 11 Indian languages, and generates official PDF case dossiers.',
  50, 338, { width: 495, align: 'justify', lineGap: 3 }
);

doc.rect(50, 430, 495, 140).fill('#e0f2fe').strokeColor('#0284c7').lineWidth(1).stroke();
doc.fillColor('#0369a1').fontSize(11).font('Helvetica-Bold').text('CYBERSHIELD OBJECTIVES & IMPACT MATRIX', 65, 445);
doc.fillColor('#0f172a').fontSize(9).font('Helvetica').text(
  '• Reduce Complaint Filing Friction: Cut down reporting time from 15 minutes to under 2 minutes with AI.\n' +
  '• Immediate Threat Mitigation: Warn citizens about malicious URLs before credentials are compromised.\n' +
  '• Inclusive Accessibility: Empower non-English speakers across India via native regional AI.\n' +
  '• Accelerated Police Investigation: Provide officers with structured threat indicators & priority scores.\n' +
  '• Evidentiary Integrity: Supply standardized PDF case receipts suitable for legal and institutional records.',
  65, 470, { lineGap: 4 }
);

// ─────────────────────────────────────────────────────────────
// PAGE 3: TECHNICAL ARCHITECTURE & MODULES
// ─────────────────────────────────────────────────────────────
doc.addPage();
doc.rect(50, 40, 495, 30).fill('#0f172a');
doc.fillColor('#ffffff').fontSize(13).font('Helvetica-Bold').text('CHAPTER 2: CORE MODULES & AI INNOVATIONS', 60, 48);

doc.fillColor('#0f172a').fontSize(11).font('Helvetica-Bold').text('Module 1: AI Complaint Auto-Classification Engine', 50, 90);
doc.fillColor('#334155').fontSize(9.5).font('Helvetica').text(
  'Integrated directly into the complaint form, this module takes raw natural language text from the victim and sends it to Gemini 3.8 Flash. The AI extracts structured JSON containing the crime category, a severity score (1-10), priority rating (Critical, High, Medium, Low), key entities (scam phone numbers, bank accounts, UPI IDs), and threat indicators, instantly pre-filling the form.',
  50, 106, { width: 495, lineGap: 2.5 }
);

doc.fillColor('#0f172a').fontSize(11).font('Helvetica-Bold').text('Module 2: Real-Time Phishing URL Scanner (/tools/url-scanner)', 50, 175);
doc.fillColor('#334155').fontSize(9.5).font('Helvetica').text(
  'A dedicated defensive tool accessible to citizens and officers. The user inputs any suspicious hyperlink. The scanner evaluates domain syntax, deceptive keywords mimicking financial institutions, typosquatting, and risky top-level domains (TLDs). It outputs an animated Risk Score (0-100) and explicit action advice.',
  50, 191, { width: 495, lineGap: 2.5 }
);

doc.fillColor('#0f172a').fontSize(11).font('Helvetica-Bold').text('Module 3: Multi-Lingual Indian AI Chatbot (11 Languages)', 50, 260);
doc.fillColor('#334155').fontSize(9.5).font('Helvetica').text(
  'A floating assistant available on all screens supporting English, Hindi, Hinglish, Marathi, Bengali, Tamil, Telugu, Gujarati, Kannada, Malayalam, and Punjabi. The chatbot switches greetings and localized quick prompts dynamically. Equipped with fallback safety protocols, it instructs victims on freezing accounts and calling National Cyber Helpline 1930.',
  50, 276, { width: 495, lineGap: 2.5 }
);

doc.fillColor('#0f172a').fontSize(11).font('Helvetica-Bold').text('Module 4: Admin Visual Analytics Control Center (Recharts)', 50, 345);
doc.fillColor('#334155').fontSize(9.5).font('Helvetica').text(
  'Transforms administrative oversight from static text into real-time visual intelligence: Pie/Donut Chart for crime category distribution, Bar Chart for complaint status progression, and Smooth Gradient Area Chart for monthly crime vs. resolution velocity.',
  50, 361, { width: 495, lineGap: 2.5 }
);

doc.fillColor('#0f172a').fontSize(11).font('Helvetica-Bold').text('Module 5: Forensic PDF Case Report Generator (PDFKit)', 50, 420);
doc.fillColor('#334155').fontSize(9.5).font('Helvetica').text(
  'Generates formatted, tamper-evident PDF case receipts. Features official header branding, unique Case Tracking ID (CS-2026-XXXXXX), citizen identification, incident timestamp, full incident description, and legal disclaimer.',
  50, 436, { width: 495, lineGap: 2.5 }
);

// Module comparison table
doc.rect(50, 500, 495, 140).fill('#f8fafc').strokeColor('#cbd5e1').lineWidth(1).stroke();
doc.fillColor('#0f172a').fontSize(10).font('Helvetica-Bold').text('CAPABILITY COMPARISON: CYBERSHIELD vs. LEGACY SYSTEMS', 65, 515);
drawDivider(530);

doc.fillColor('#475569').fontSize(9).font('Helvetica-Bold').text('Feature', 65, 540);
doc.text('Legacy Portals', 230, 540);
doc.text('CyberShield AI (2026)', 380, 540);

const tableRows = [
  ['Threat Auto-Classification', 'None (Manual Dropdown)', 'Gemini 3.8 Flash NLP (Instant)'],
  ['Phishing URL Scanner', 'None', 'Built-in 0-100 Heuristic Risk Bar'],
  ['Multi-Lingual Chatbot', 'None / Static FAQ', '11 Indian Regional Languages'],
  ['Data Visualization', 'Plain Progress Bars', 'Interactive Recharts (Pie/Bar/Area)'],
  ['PDF Incident Reports', 'None', 'Automated One-Click PDF Export']
];

let ry = 560;
tableRows.forEach(row => {
  doc.fillColor('#334155').fontSize(8.5).font('Helvetica').text(row[0], 65, ry);
  doc.fillColor('#dc2626').text(row[1], 230, ry);
  doc.fillColor('#16a34a').font('Helvetica-Bold').text(row[2], 380, ry);
  ry += 16;
});

// ─────────────────────────────────────────────────────────────
// PAGE 4: DATABASE SCHEMAS, SECURITY & TEAM ROLES
// ─────────────────────────────────────────────────────────────
doc.addPage();
doc.rect(50, 40, 495, 30).fill('#0f172a');
doc.fillColor('#ffffff').fontSize(13).font('Helvetica-Bold').text('CHAPTER 3: DATA ARCHITECTURE, SECURITY & TEAM WORK', 60, 48);

doc.fillColor('#0f172a').fontSize(11).font('Helvetica-Bold').text('3.1 Database Schema Architecture (MongoDB / Mongoose)', 50, 90);
doc.fillColor('#334155').fontSize(9).font('Helvetica').text(
  '• User Schema: name, email (unique), password (bcrypt hash, 12 rounds), phone, role (citizen, investigator, admin), isActive, timestamps.\n' +
  '• Complaint Schema: trackingId (unique index CS-YYYY-XXXXXX), citizenId (ref User), title, description, category, status, priority, incidentDate, rejectionReason.\n' +
  '• Investigation Schema: complaintId (ref Complaint, unique), investigatorId (ref User), status, findings, notes array (content, addedBy, addedAt), communications array.\n' +
  '• Notification Schema: userId, type, title, message, relatedComplaint, isRead, createdAt.',
  50, 105, { width: 495, lineGap: 3 }
);

doc.fillColor('#0f172a').fontSize(11).font('Helvetica-Bold').text('3.2 Security, RBAC & Protection Controls', 50, 185);
doc.fillColor('#334155').fontSize(9).font('Helvetica').text(
  '• JWT Authentication: Stateless JSON Web Tokens with 24-hour expiration stored in localStorage with Axios request interceptors.\n' +
  '• Role-Based Route Guarding: ProtectedRoute in React & authorize() middleware in Express strictly restrict endpoints per role.\n' +
  '• HTTP Security Headers: Express Helmet enabled for CSP, HSTS, and XSS protection; CORS restricted to verified client origins.\n' +
  '• Fail-Safe Multi-Model Fallback: Graceful degradation logic ensures that cloud model demand spikes do not disrupt critical emergency advice.',
  50, 200, { width: 495, lineGap: 3 }
);

doc.fillColor('#0f172a').fontSize(11).font('Helvetica-Bold').text('3.3 4-Member Team Work Division (Presentation Assignment)', 50, 280);

const teamWork = [
  { role: 'Member 1: Frontend & UI/UX', desc: 'Developed React 19 UI, Framer Motion Landing Page, multi-step complaint filing forms, Recharts analytics, and responsive navigation across all three role dashboards.' },
  { role: 'Member 2: Backend & AI Engineering', desc: 'Engineered Express REST APIs, Google Gemini 3.8 Flash AI pipeline, URL threat scanner logic, multilingual chatbot engine, and multi-model fallback handling.' },
  { role: 'Member 3: Database & PDF Generation', desc: 'Designed MongoDB schemas, optimized Mongoose indexing, built database seeder scripts, and developed server-side legal PDF generation using PDFKit.' },
  { role: 'Member 4: Auth, Security & Deployment', desc: 'Implemented JWT authentication, bcrypt encryption, RBAC authorization middleware, Helmet headers, CORS policies, and automated one-click startup scripts.' }
];

let ty = 300;
teamWork.forEach(m => {
  doc.rect(50, ty, 495, 42).fill('#f8fafc').strokeColor('#cbd5e1').lineWidth(1).stroke();
  doc.fillColor('#0284c7').fontSize(9.5).font('Helvetica-Bold').text(m.role, 60, ty + 7);
  doc.fillColor('#334155').fontSize(8.5).font('Helvetica').text(m.desc, 60, ty + 22, { width: 475 });
  ty += 48;
});

// Presentation viva advice block
doc.rect(50, 510, 495, 170).fill('#0f172a');
doc.fillColor('#38bdf8').fontSize(11).font('Helvetica-Bold').text('PRESENTATION & VIVA DEFENSE CHECKLIST', 65, 525);
doc.fillColor('#ffffff').fontSize(8.5).font('Helvetica').text(
  '1. Emphasize Active AI Intelligence: Highlight that CyberShield actively calculates threat severity, unlike passive portals.\n' +
  '2. Demo the Phishing Scanner Live: Paste a test phishing link to show the 0-100 risk score and domain heuristics in real-time.\n' +
  '3. Demonstrate Regional Languages: Switch the chatbot to Hindi or Marathi and show how it guides victims to Helpline 1930.\n' +
  '4. Export Official PDF: Open a case and click "Download PDF" to show legal-grade evidence documentation.\n' +
  '5. Highlight Architecture & Scalability: Explain how the MERN + Gemini stack scales horizontally across police stations.',
  65, 545, { lineGap: 5 }
);

// Footer
doc.fillColor('#94a3b8').fontSize(8).text('CyberShield AI Capstone Project Report | Certified Complete & Ready for Presentation (2026)', 50, 750, { align: 'center', width: 495 });

doc.end();

writeStream.on('finish', () => {
  const stats = fs.statSync(outputPath);
  console.log('Project Report PDF Generated Successfully!');
  console.log('Location:', outputPath);
  console.log('Size:', stats.size, 'bytes');
});
