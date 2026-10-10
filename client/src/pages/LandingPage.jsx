import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  HiShieldCheck, HiSearch, HiPhone, HiExclamation,
  HiClipboardCheck, HiDocumentText, HiUserGroup,
  HiOutlineExternalLink, HiLockClosed, HiArrowRight,
  HiCheckCircle, HiInformationCircle
} from 'react-icons/hi';

const LandingPage = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [activeTab, setActiveTab] = useState('advisories');

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
      {/* ─── 1. TOP TRICOLOR BAND ─── */}
      <div className="h-1.5 w-full flex">
        <div className="h-full w-1/3 bg-[#FF9933]" />
        <div className="h-full w-1/3 bg-white" />
        <div className="h-full w-1/3 bg-[#138808]" />
      </div>

      {/* ─── 2. GOVERNMENT UTILITY HEADER ─── */}
      <div className="bg-[#0A192F] text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="font-semibold tracking-wide text-white">भारत सरकार</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-200">Government of India</span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-300">गृह मंत्रालय (Ministry of Home Affairs)</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-amber-400 font-semibold bg-amber-950/40 px-2.5 py-0.5 rounded border border-amber-800/60">
              <HiPhone className="w-3.5 h-3.5 animate-pulse text-amber-300" />
              <span>National Cyber Helpline: 1930 (Toll Free)</span>
            </div>
            <span className="hidden sm:inline text-slate-400">{currentDate}</span>
          </div>
        </div>
      </div>

      {/* ─── 3. OFFICIAL LOGO & TITLE BANNER ─── */}
      <header className="bg-white border-b border-slate-200 shadow-sm py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center md:text-left">
            {/* National Emblem Crest Style Icon */}
            <div className="w-14 h-14 bg-[#0A2540] rounded-xl flex items-center justify-center text-white shadow-md border-2 border-amber-500/40 flex-shrink-0">
              <HiShieldCheck className="w-9 h-9 text-amber-400" />
            </div>
            <div>
              <div className="text-xs font-semibold tracking-wider text-[#0A2540] uppercase">
                राष्ट्रीय साइबर अपराध रिपोर्टिंग एवं विश्लेषण पोर्टल
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#0A2540] tracking-tight">
                National Cyber Crime Reporting Portal
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                CyberShield Initiative • AI-Driven Incident Redressal & Digital Forensic Intelligence
              </p>
            </div>
          </div>

          {/* Quick Access Badges */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-[11px] text-slate-500">Financial Fraud Helpline</div>
              <div className="text-lg font-bold text-red-600 font-mono tracking-wider">1930</div>
            </div>
            <Link
              to="/login"
              className="bg-[#0A2540] hover:bg-[#13335A] text-white text-xs font-semibold px-4 py-2.5 rounded shadow transition-all flex items-center gap-1.5 border border-slate-700"
            >
              <HiLockClosed className="w-4 h-4 text-amber-400" />
              Officer / User Login
            </Link>
          </div>
        </div>
      </header>

      {/* ─── 4. OFFICIAL PRIMARY NAVIGATION BAR ─── */}
      <nav className="bg-[#0A2540] text-white text-xs font-semibold border-b border-[#0D3055] sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between overflow-x-auto">
          <div className="flex items-center space-x-1 py-1">
            <Link to="/" className="px-3.5 py-2.5 rounded bg-blue-900/60 text-white font-bold flex items-center gap-1">
              Home
            </Link>
            <Link to="/citizen/file-complaint" className="px-3.5 py-2.5 rounded hover:bg-white/10 transition-colors whitespace-nowrap">
              File a Complaint
            </Link>
            <Link to="/citizen/track" className="px-3.5 py-2.5 rounded hover:bg-white/10 transition-colors whitespace-nowrap">
              Track Complaint
            </Link>
            <Link to="/tools/url-scanner" className="px-3.5 py-2.5 rounded hover:bg-white/10 transition-colors text-amber-300 whitespace-nowrap flex items-center gap-1">
              <HiSearch className="w-3.5 h-3.5" /> Check Suspect URL
            </Link>
            <a href="#advisories" className="px-3.5 py-2.5 rounded hover:bg-white/10 transition-colors whitespace-nowrap">
              Citizen Advisories
            </a>
            <a href="#stats" className="px-3.5 py-2.5 rounded hover:bg-white/10 transition-colors whitespace-nowrap">
              Portal Statistics
            </a>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-slate-300 text-[11px]">
            <span>Emergency: Dial <strong>112</strong> / <strong>1930</strong></span>
          </div>
        </div>
      </nav>

      {/* ─── 5. EMERGENCY CITIZEN ALERT TICKER ─── */}
      <div className="bg-red-50 border-y border-red-200 text-red-900 px-4 sm:px-8 py-2 text-xs flex items-center gap-3">
        <span className="bg-red-700 text-white font-bold px-2 py-0.5 rounded text-[10px] tracking-wider uppercase flex-shrink-0 flex items-center gap-1">
          <HiExclamation className="w-3.5 h-3.5" /> Alert
        </span>
        <div className="overflow-hidden whitespace-nowrap flex-1 font-medium text-slate-800">
          <span className="inline-block animate-marquee">
            📢 <strong>CITIZEN ADVISORY:</strong> Beware of "Digital Arrest" calls impersonating CBI, Police, or Customs officers. Police never conducts arrests via WhatsApp or Skype. For financial frauds, immediately call <strong>1930</strong> within 2 hours to freeze stolen funds. Never download remote access software like AnyDesk or TeamViewer on unknown requests.
          </span>
        </div>
      </div>

      {/* ─── 6. PRIMARY SERVICE MODULES (Exact cybercrime.gov.in structure) ─── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 flex-1">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-[#0A2540] border-l-4 border-amber-500 pl-3 uppercase tracking-wide">
            Citizen Services & Incident Reporting
          </h2>
          <p className="text-xs text-slate-500 mt-1 pl-4">
            Select the appropriate category below to lodge your formal cyber complaint or utilize investigative verification tools.
          </p>
        </div>

        {/* 4 Official Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Service 1: Women & Children */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col justify-between border-t-4 border-t-pink-600">
            <div>
              <div className="w-12 h-12 bg-pink-50 text-pink-700 rounded-lg flex items-center justify-center text-2xl mb-3 font-bold">
                👩‍👧
              </div>
              <h3 className="font-bold text-[#0A2540] text-sm leading-snug">
                Crime Against Women & Children
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Report incidents involving online harassment, cyberstalking, non-consensual imagery, and extortion with high-priority handling.
              </p>
            </div>
            <Link
              to="/citizen/file-complaint"
              className="mt-5 w-full text-center bg-pink-700 hover:bg-pink-800 text-white font-semibold py-2 px-3 rounded text-xs transition-colors flex items-center justify-center gap-1"
            >
              File Priority Report <HiArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Service 2: Financial & Other Cyber Crimes (AI Powered) */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col justify-between border-t-4 border-t-[#0A2540]">
            <div>
              <div className="w-12 h-12 bg-blue-50 text-[#0A2540] rounded-lg flex items-center justify-center text-2xl mb-3 font-bold">
                💳
              </div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.2 rounded uppercase">AI Assisted</span>
              </div>
              <h3 className="font-bold text-[#0A2540] text-sm leading-snug">
                Financial Fraud & Other Cyber Crimes
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Report UPI fraud, credit/debit card theft, ransomware attacks, identity theft, and online scams. Powered by Gemini AI auto-classification.
              </p>
            </div>
            <Link
              to="/citizen/file-complaint"
              className="mt-5 w-full text-center bg-[#0A2540] hover:bg-[#13335A] text-white font-semibold py-2 px-3 rounded text-xs transition-colors flex items-center justify-center gap-1"
            >
              Report Cybercrime <HiArrowRight className="w-3.5 h-3.5" />
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
                Verify the live investigation stage of your submitted complaint using your official tracking reference number (CS-2026-XXXXXX).
              </p>
            </div>
            <Link
              to="/citizen/track"
              className="mt-5 w-full text-center bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-2 px-3 rounded text-xs transition-colors flex items-center justify-center gap-1"
            >
              Track Investigation <HiArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Service 4: Suspect URL Verification (AI Threat Scanner) */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col justify-between border-t-4 border-t-amber-600">
            <div>
              <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-lg flex items-center justify-center text-2xl mb-3 font-bold">
                🛡️
              </div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded uppercase">Real-Time Threat Tool</span>
              </div>
              <h3 className="font-bold text-[#0A2540] text-sm leading-snug">
                Check & Scan Suspect Link
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Check suspicious SMS links, bank phishing domains, or malicious URLs against heuristic threat databases before clicking.
              </p>
            </div>
            <Link
              to="/tools/url-scanner"
              className="mt-5 w-full text-center bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-3 rounded text-xs transition-colors flex items-center justify-center gap-1"
            >
              Verify Suspect URL <HiArrowRight className="w-3.5 h-3.5" />
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
                Financial Cybercrime Emergency Golden Hours
              </div>
              <h3 className="text-lg font-bold">
                Toll Free Cyber Fraud Helpline: 1930
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Operated under the Citizen Financial Cyber Fraud Reporting and Management System (CFCFRMS). Call within 2 hours of transaction for immediate fund freeze.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              to="/citizen/file-complaint"
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-5 py-2.5 rounded shadow transition-colors"
            >
              Report Immediately
            </Link>
          </div>
        </div>

        {/* ─── 8. CITIZEN ADVISORIES & RECENT THREAT BULLETINS ─── */}
        <section id="advisories" className="mt-10">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-6">
            <div>
              <h2 className="text-lg font-bold text-[#0A2540] border-l-4 border-amber-500 pl-3 uppercase tracking-wide">
                Latest Cyber Threat Advisories & Public Warnings
              </h2>
              <p className="text-xs text-slate-500 mt-1 pl-4">
                Official advisories issued for citizen awareness to counter prevailing fraud typologies in India.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Advisory 1 */}
            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm hover:border-slate-300 transition-colors">
              <div className="text-[10px] font-bold text-red-600 uppercase tracking-wide mb-1 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-600" /> Critical Advisory
              </div>
              <h4 className="font-bold text-sm text-[#0A2540] mb-2">
                "Digital Arrest" Extortion Calls
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fraudsters posing as police or court officials call via video call claiming an illegal courier was found in your name and demand immediate bail transfer. Remember: No law enforcement agency conducts arrests online.
              </p>
              <div className="mt-3 text-[11px] font-semibold text-blue-700 flex items-center gap-1">
                Immediate Action: Disconnect and call 1930
              </div>
            </div>

            {/* Advisory 2 */}
            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm hover:border-slate-300 transition-colors">
              <div className="text-[10px] font-bold text-amber-600 uppercase tracking-wide mb-1 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-600" /> High Alert
              </div>
              <h4 className="font-bold text-sm text-[#0A2540] mb-2">
                Electricity Bill Disconnection SMS
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Scam messages stating "Your power will be disconnected at 9:30 PM due to unpaid bill" with a malicious phone number or APK attachment. Do not call numbers provided in SMS or download unknown files.
              </p>
              <div className="mt-3 text-[11px] font-semibold text-blue-700 flex items-center gap-1">
                Immediate Action: Pay only on official DISCOM app
              </div>
            </div>

            {/* Advisory 3 */}
            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm hover:border-slate-300 transition-colors">
              <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wide mb-1 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-600" /> Awareness Bulletin
              </div>
              <h4 className="font-bold text-sm text-[#0A2540] mb-2">
                Work From Home / YouTube Likes Scams
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Victims are lured into Telegram groups with promises of earning ₹2000 daily by liking videos or rating hotels, later trapped into depositing large sums under cryptocurrency pretext.
              </p>
              <div className="mt-3 text-[11px] font-semibold text-blue-700 flex items-center gap-1">
                Immediate Action: Never transfer funds for "tasks"
              </div>
            </div>
          </div>
        </section>

        {/* ─── 9. NATIONAL PORTAL STATISTICS ─── */}
        <section id="stats" className="mt-12 bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
          <h2 className="text-base font-bold text-[#0A2540] border-l-4 border-amber-500 pl-3 uppercase tracking-wide mb-6">
            National CyberShield Portal Performance Metrics
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-slate-100">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0A2540] font-mono">2,400+</div>
              <div className="text-xs text-slate-500 mt-1 uppercase tracking-wide font-medium">Registered Citizens</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 font-mono">650+</div>
              <div className="text-xs text-slate-500 mt-1 uppercase tracking-wide font-medium">Cases Registered</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono">480+</div>
              <div className="text-xs text-slate-500 mt-1 uppercase tracking-wide font-medium">Resolved Cases</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-mono">11</div>
              <div className="text-xs text-slate-500 mt-1 uppercase tracking-wide font-medium">Indian Languages Supported</div>
            </div>
          </div>
        </section>

        {/* ─── 10. LEGAL & PROCEDURE STEPS ─── */}
        <section className="mt-10 bg-slate-100/70 rounded-lg p-6 border border-slate-200">
          <h3 className="font-bold text-[#0A2540] text-sm uppercase tracking-wide mb-3">
            Workflow for Reporting Cyber Crime on CyberShield
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs text-slate-700">
            <div className="bg-white p-3.5 rounded border border-slate-200">
              <span className="font-bold text-blue-900 block mb-1">Step 1: Citizen Registration</span>
              Provide basic verification details and log into the citizen redressal interface.
            </div>
            <div className="bg-white p-3.5 rounded border border-slate-200">
              <span className="font-bold text-blue-900 block mb-1">Step 2: AI Assisted Narrative</span>
              Input incident details. The Gemini NLP engine automatically categorizes and computes threat severity.
            </div>
            <div className="bg-white p-3.5 rounded border border-slate-200">
              <span className="font-bold text-blue-900 block mb-1">Step 3: Police Case Assignment</span>
              The incident is assigned to designated cyber cell investigators with an official Tracking ID.
            </div>
            <div className="bg-white p-3.5 rounded border border-slate-200">
              <span className="font-bold text-blue-900 block mb-1">Step 4: Formal PDF Acknowledgement</span>
              Download an official digitally-stamped case receipt compliant with evidentiary requirements.
            </div>
          </div>
        </section>
      </main>

      {/* ─── 11. OFFICIAL GOVERNMENT FOOTER ─── */}
      <footer className="bg-[#0A192F] text-slate-300 text-xs border-t-4 border-amber-500 mt-12 pt-8 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <HiShieldCheck className="w-6 h-6 text-amber-400" />
              <span className="font-bold text-white text-sm">CyberShield India</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              National Cybercrime Reporting & Redressal Platform. Developed to provide seamless reporting access to citizens across India.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">Quick Navigation</h4>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
              <li><Link to="/citizen/file-complaint" className="hover:text-amber-400">File Online Complaint</Link></li>
              <li><Link to="/citizen/track" className="hover:text-amber-400">Track Complaint Status</Link></li>
              <li><Link to="/tools/url-scanner" className="hover:text-amber-400">Suspect Link Verification</Link></li>
              <li><Link to="/login" className="hover:text-amber-400">Authorized Officer Login</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">Emergency Helplines</h4>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
              <li>Cyber Financial Fraud: <strong className="text-white">1930</strong></li>
              <li>National Emergency: <strong className="text-white">112</strong></li>
              <li>Women Helpline: <strong className="text-white">1091</strong></li>
              <li>Childline Service: <strong className="text-white">1098</strong></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">Compliance & Disclaimers</h4>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              This portal is designed in compliance with the National Cyber Crime Reporting Portal guidelines (Ministry of Home Affairs). False reporting of complaints is a punishable offense under the Indian Penal Code and Information Technology Act.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-4 px-4 sm:px-8 text-center text-[10px] text-slate-500">
          <p>© 2026 CyberShield National Cyber Portal. All rights reserved. Designed for Cyber Safe Bharat.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
