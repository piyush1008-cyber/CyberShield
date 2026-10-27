import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  HiShieldCheck, HiSearch, HiPhone, HiExclamation,
  HiClipboardCheck, HiDocumentText, HiUserGroup,
  HiOutlineExternalLink, HiLockClosed, HiArrowRight,
  HiCheckCircle, HiInformationCircle, HiAcademicCap
} from 'react-icons/hi';

const LandingPage = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date();
    setCurrentDate(today.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }));
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans antialiased flex flex-col">
      {/* ─── 1. TOP BRAND ACCENT BAND ─── */}
      <div className="h-1.5 w-full flex">
        <div className="h-full w-1/3 bg-[#FF9933]" />
        <div className="h-full w-1/3 bg-white" />
        <div className="h-full w-1/3 bg-[#138808]" />
      </div>

      {/* ─── 2. ACADEMIC PROJECT UTILITY HEADER ─── */}
      <div className="bg-[#0A192F] text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="font-semibold tracking-wide text-white">🛡️ CyberShield</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-200">Final Year Engineering Capstone Project</span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-300">Department of Computer Science & Engineering</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-amber-400 font-semibold bg-amber-950/40 px-2.5 py-0.5 rounded border border-amber-800/60">
              <HiPhone className="w-3.5 h-3.5 animate-pulse text-amber-300" />
              <span>Emergency Helpline: 1930 (Public Safety Tip)</span>
            </div>
            <span className="hidden sm:inline text-slate-400">{currentDate}</span>
          </div>
        </div>
      </div>

      {/* ─── 3. LOGO & PROJECT TITLE BANNER ─── */}
      <header className="bg-white border-b border-slate-200 shadow-sm py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center md:text-left">
            {/* Cyber Shield Crest Icon */}
            <div className="w-14 h-14 bg-[#0A2540] rounded-xl flex items-center justify-center text-white shadow-md border-2 border-indigo-500/40 flex-shrink-0">
              <HiShieldCheck className="w-9 h-9 text-indigo-400" />
            </div>
            <div>
              <div className="text-xs font-semibold tracking-wider text-indigo-700 uppercase">
                Academic Research & Engineering Prototype (2026)
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#0A2540] tracking-tight">
                CyberShield — Cybercrime Incident Redressal Platform
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                AI-Driven Complaint Triage • Multi-Model Fallback • Real-Time URL Scanner • 11 Regional Languages
              </p>
            </div>
          </div>

          {/* Quick Access Badges */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-[11px] text-slate-500">National Cyber Helpline</div>
              <div className="text-lg font-bold text-red-600 font-mono tracking-wider">1930</div>
            </div>
            <Link
              to="/login"
              className="bg-[#0A2540] hover:bg-[#13335A] text-white text-xs font-semibold px-4 py-2.5 rounded shadow transition-all flex items-center gap-1.5 border border-slate-700"
            >
              <HiLockClosed className="w-4 h-4 text-amber-400" />
              Sign In / Portal Access
            </Link>
          </div>
        </div>
      </header>

      {/* ─── 4. PRIMARY NAVIGATION BAR ─── */}
      <nav className="bg-[#0A2540] text-white text-xs font-semibold border-b border-[#0D3055] sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between overflow-x-auto">
          <div className="flex items-center space-x-1 py-1">
            <Link to="/" className="px-3.5 py-2.5 rounded bg-blue-900/60 text-white font-bold flex items-center gap-1">
              Home
            </Link>
            <Link to="/citizen/file-complaint" className="px-3.5 py-2.5 rounded hover:bg-white/10 transition-colors whitespace-nowrap">
              File Complaint (Demo)
            </Link>
            <Link to="/citizen/track" className="px-3.5 py-2.5 rounded hover:bg-white/10 transition-colors whitespace-nowrap">
              Track Complaint
            </Link>
            <Link to="/tools/url-scanner" className="px-3.5 py-2.5 rounded hover:bg-white/10 transition-colors text-amber-300 whitespace-nowrap flex items-center gap-1">
              <HiSearch className="w-3.5 h-3.5" /> AI Phishing Scanner
            </Link>
            <a href="#advisories" className="px-3.5 py-2.5 rounded hover:bg-white/10 transition-colors whitespace-nowrap">
              Cyber Safety Advisories
            </a>
            <a href="#stats" className="px-3.5 py-2.5 rounded hover:bg-white/10 transition-colors whitespace-nowrap">
              System Metrics
            </a>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-slate-300 text-[11px]">
            <span>National Cyber Helpline: <strong>1930</strong></span>
          </div>
        </div>
      </nav>

      {/* ─── 5. PUBLIC SAFETY ALERT TICKER ─── */}
      <div className="bg-amber-50 border-y border-amber-200 text-amber-950 px-4 sm:px-8 py-2 text-xs flex items-center gap-3">
        <span className="bg-amber-700 text-white font-bold px-2 py-0.5 rounded text-[10px] tracking-wider uppercase flex-shrink-0 flex items-center gap-1">
          <HiExclamation className="w-3.5 h-3.5" /> Safety Tip
        </span>
        <div className="overflow-hidden whitespace-nowrap flex-1 font-medium text-slate-800">
          <span className="inline-block animate-marquee">
            📢 <strong>AWARENESS BULLETIN:</strong> Beware of "Digital Arrest" video calls pretending to be police or customs. Police never arrests anyone over WhatsApp or Skype. In case of financial fraud, dial <strong>1930</strong> within 2 hours to freeze accounts. Never install AnyDesk or TeamViewer on unknown calls.
          </span>
        </div>
      </div>

      {/* ─── 6. PRIMARY SERVICE MODULES ─── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 flex-1">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-[#0A2540] border-l-4 border-indigo-600 pl-3 uppercase tracking-wide">
              Cybercrime Redressal & Incident Modules
            </h2>
            <p className="text-xs text-slate-500 mt-1 pl-4">
              Explore the interactive components of the CyberShield capstone prototype.
            </p>
          </div>
          <span className="text-xs text-indigo-700 bg-indigo-50 border border-indigo-200 font-semibold px-2.5 py-1 rounded w-fit">
            🎓 Capstone Project Demonstration
          </span>
        </div>

        {/* 4 Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Service 1: Women & Children */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col justify-between border-t-4 border-t-pink-600">
            <div>
              <div className="w-12 h-12 bg-pink-50 text-pink-700 rounded-lg flex items-center justify-center text-2xl mb-3 font-bold">
                👩‍👧
              </div>
              <h3 className="font-bold text-[#0A2540] text-sm leading-snug">
                Crimes Against Women & Children
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Report online harassment, stalking, identity theft, or impersonation with high-priority triage.
              </p>
            </div>
            <Link
              to="/citizen/file-complaint"
              className="mt-5 w-full text-center bg-pink-700 hover:bg-pink-800 text-white font-semibold py-2 px-3 rounded text-xs transition-colors flex items-center justify-center gap-1"
            >
              Report Incident <HiArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Service 2: Financial & Other Cyber Crimes (AI Powered) */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col justify-between border-t-4 border-t-[#0A2540]">
            <div>
              <div className="w-12 h-12 bg-blue-50 text-[#0A2540] rounded-lg flex items-center justify-center text-2xl mb-3 font-bold">
                💳
              </div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.2 rounded uppercase">Gemini AI Auto-Triage</span>
              </div>
              <h3 className="font-bold text-[#0A2540] text-sm leading-snug">
                Financial Fraud & Digital Crimes
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Report UPI fraud, unauthorized bank debit, phishing, ransomware, or identity theft with instant AI classification.
              </p>
            </div>
            <Link
              to="/citizen/file-complaint"
              className="mt-5 w-full text-center bg-[#0A2540] hover:bg-[#13335A] text-white font-semibold py-2 px-3 rounded text-xs transition-colors flex items-center justify-center gap-1"
            >
              File Complaint <HiArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Service 3: Track Complaint Status */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col justify-between border-t-4 border-t-emerald-600">
            <div>
              <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-lg flex items-center justify-center text-2xl mb-3 font-bold">
                🔍
              </div>
              <h3 className="font-bold text-[#0A2540] text-sm leading-snug">
                Track Complaint Status
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Check the real-time lifecycle status of any lodged complaint using the unique Tracking ID (e.g., CS-2026-A7B3K9).
              </p>
            </div>
            <Link
              to="/citizen/track"
              className="mt-5 w-full text-center bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-2 px-3 rounded text-xs transition-colors flex items-center justify-center gap-1"
            >
              Track by Reference <HiArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Service 4: Suspect URL Verification (AI Threat Scanner) */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col justify-between border-t-4 border-t-amber-600">
            <div>
              <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-lg flex items-center justify-center text-2xl mb-3 font-bold">
                🛡️
              </div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded uppercase">AIML Heuristic Scanner</span>
              </div>
              <h3 className="font-bold text-[#0A2540] text-sm leading-snug">
                Phishing URL Scanner
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Analyze suspect links in real-time using UCI Machine Learning feature extraction and Google Gemini threat detection.
              </p>
            </div>
            <Link
              to="/tools/url-scanner"
              className="mt-5 w-full text-center bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-3 rounded text-xs transition-colors flex items-center justify-center gap-1"
            >
              Scan Suspect URL <HiArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* ─── 7. EMERGENCY HELPLINE CALLOUT ─── */}
        <div className="mt-8 bg-gradient-to-r from-[#0A2540] to-[#143B66] text-white rounded-lg p-6 shadow-sm border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0 animate-bounce">
              <HiPhone className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                Financial Cybercrime Emergency Protocol
              </div>
              <h3 className="text-lg font-bold">
                National Cyber Fraud Helpline: 1930
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Public awareness reminder: Call 1930 within the first 2 hours of unauthorized transaction to freeze stolen funds at the bank gateway.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              to="/citizen/file-complaint"
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-5 py-2.5 rounded shadow transition-colors"
            >
              File Demo Complaint
            </Link>
          </div>
        </div>

        {/* ─── 8. CITIZEN ADVISORIES & RECENT THREAT BULLETINS ─── */}
        <section id="advisories" className="mt-10">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-6">
            <div>
              <h2 className="text-lg font-bold text-[#0A2540] border-l-4 border-amber-500 pl-3 uppercase tracking-wide">
                Common Cyber Threat Advisories in India
              </h2>
              <p className="text-xs text-slate-500 mt-1 pl-4">
                Educational awareness summaries on prevailing digital crime typologies.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Advisory 1 */}
            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm hover:border-slate-300 transition-colors">
              <div className="text-[10px] font-bold text-red-600 uppercase tracking-wide mb-1 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-600" /> High-Risk Pattern
              </div>
              <h4 className="font-bold text-sm text-[#0A2540] mb-2">
                "Digital Arrest" Extortion Calls
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fraudsters posing as police or court officials call via video call claiming an illegal courier was found in your name. Remember: No legitimate law enforcement agency conducts arrests online.
              </p>
              <div className="mt-3 text-[11px] font-semibold text-blue-700 flex items-center gap-1">
                Action: Disconnect immediately & call 1930
              </div>
            </div>

            {/* Advisory 2 */}
            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm hover:border-slate-300 transition-colors">
              <div className="text-[10px] font-bold text-amber-600 uppercase tracking-wide mb-1 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-600" /> Smishing Alert
              </div>
              <h4 className="font-bold text-sm text-[#0A2540] mb-2">
                Electricity Bill Disconnection SMS
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Scam messages stating "Power will be cut at 9:30 PM due to unpaid bill" with a fake number or malicious APK download. Never call SMS numbers or install APKs.
              </p>
              <div className="mt-3 text-[11px] font-semibold text-blue-700 flex items-center gap-1">
                Action: Verify only on your official utility app
              </div>
            </div>

            {/* Advisory 3 */}
            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm hover:border-slate-300 transition-colors">
              <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wide mb-1 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-600" /> Social Engineering
              </div>
              <h4 className="font-bold text-sm text-[#0A2540] mb-2">
                Part-Time Work & YouTube Likes Scam
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Victims are lured into Telegram channels promising daily income for liking videos, then coerced into depositing money under fake cryptocurrency trading schemes.
              </p>
              <div className="mt-3 text-[11px] font-semibold text-blue-700 flex items-center gap-1">
                Action: Never deposit money to earn "task rewards"
              </div>
            </div>
          </div>
        </section>

        {/* ─── 9. PROJECT SYSTEM METRICS ─── */}
        <section id="stats" className="mt-12 bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
          <h2 className="text-base font-bold text-[#0A2540] border-l-4 border-indigo-600 pl-3 uppercase tracking-wide mb-6">
            CyberShield Prototype System Capabilities
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-slate-100">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0A2540] font-mono">3 Roles</div>
              <div className="text-xs text-slate-500 mt-1 uppercase tracking-wide font-medium">Citizen / Investigator / Admin</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 font-mono">30 ML Features</div>
              <div className="text-xs text-slate-500 mt-1 uppercase tracking-wide font-medium">UCI Dataset URL Attributes</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono">Sec. 65B</div>
              <div className="text-xs text-slate-500 mt-1 uppercase tracking-wide font-medium">SHA-256 Digital Tamper Hash</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-mono">11 Languages</div>
              <div className="text-xs text-slate-500 mt-1 uppercase tracking-wide font-medium">Indian Regional AI Assistant</div>
            </div>
          </div>
        </section>

        {/* ─── 10. SYSTEM WORKFLOW ─── */}
        <section className="mt-10 bg-slate-100/70 rounded-lg p-6 border border-slate-200">
          <h3 className="font-bold text-[#0A2540] text-sm uppercase tracking-wide mb-3">
            CyberShield Incident Lifecycle Workflow
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs text-slate-700">
            <div className="bg-white p-3.5 rounded border border-slate-200">
              <span className="font-bold text-blue-900 block mb-1">Step 1: Citizen Submission</span>
              Victim enters complaint details in natural language.
            </div>
            <div className="bg-white p-3.5 rounded border border-slate-200">
              <span className="font-bold text-blue-900 block mb-1">Step 2: AI Triage & 65B Hash</span>
              Gemini NLP engine classifies severity and generates a SHA-256 tamper-evident hash.
            </div>
            <div className="bg-white p-3.5 rounded border border-slate-200">
              <span className="font-bold text-blue-900 block mb-1">Step 3: Investigator Assignment</span>
              Case is assigned to an investigator with timeline audit tracking and notes.
            </div>
            <div className="bg-white p-3.5 rounded border border-slate-200">
              <span className="font-bold text-blue-900 block mb-1">Step 4: Forensic PDF Export</span>
              Download an official PDF report receipt with Tracking ID and digital hash stamp.
            </div>
          </div>
        </section>
      </main>

      {/* ─── 11. FOOTER (ACADEMIC DISCLAIMER) ─── */}
      <footer className="bg-[#0A192F] text-slate-300 text-xs border-t-4 border-indigo-600 mt-12 pt-8 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <HiShieldCheck className="w-6 h-6 text-indigo-400" />
              <span className="font-bold text-white text-sm">CyberShield</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              AI-Powered Cybercrime Redressal and Threat Intelligence Platform. Developed as a Final Year Engineering Capstone Project.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">Prototype Navigation</h4>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
              <li><Link to="/citizen/file-complaint" className="hover:text-amber-400">File Demo Complaint</Link></li>
              <li><Link to="/citizen/track" className="hover:text-amber-400">Track Complaint Status</Link></li>
              <li><Link to="/tools/url-scanner" className="hover:text-amber-400">Phishing URL Scanner</Link></li>
              <li><Link to="/login" className="hover:text-amber-400">Portal Login</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">Real Emergency Helplines</h4>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
              <li>National Cyber Helpline: <strong className="text-white">1930</strong></li>
              <li>National Emergency: <strong className="text-white">112</strong></li>
              <li>Official Portal: <a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer" className="text-indigo-400 underline">cybercrime.gov.in</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">Academic Project Disclaimer</h4>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              ⚠️ <strong>Academic Prototype Only:</strong> This software is developed purely for educational and capstone project demonstration. It is not affiliated with or endorsed by any government entity. For real cybercrime incidents, please report directly at <a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer" className="text-indigo-400 underline">cybercrime.gov.in</a> or call 1930.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-4 px-4 sm:px-8 text-center text-[10px] text-slate-500">
          <p>© 2026 CyberShield — Final Year Engineering Capstone Project. Developed by Sarthak Joshi & Team.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
