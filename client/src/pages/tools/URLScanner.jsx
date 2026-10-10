import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { aiAPI } from '../../services/api';
import { HiSearch, HiShieldCheck, HiExclamation, HiX, HiExternalLink } from 'react-icons/hi';

const riskColors = {
  'Safe': { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', bar: 'bg-emerald-500' },
  'Low Risk': { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', bar: 'bg-green-500' },
  'Suspicious': { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', bar: 'bg-amber-500' },
  'Dangerous': { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', bar: 'bg-red-500' },
  'Critical': { bg: 'bg-red-700/10', border: 'border-red-700/30', text: 'text-red-300', bar: 'bg-red-700' },
};

const URLScanner = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleScan = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await aiAPI.scanURL({ url: url.trim() });
      setResult(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Scan failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const colors = result ? (riskColors[result.risk_level] || riskColors['Suspicious']) : null;

  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-12 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 mb-6">
            <HiShieldCheck className="w-4 h-4 text-red-400" />
            <span className="text-sm text-red-300">AI-Powered Threat Detection</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Phishing URL Scanner
            </span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Paste any suspicious URL below. Our AI analyzes it in real-time for phishing, malware, typosquatting, and other threats.
          </p>
        </motion.div>
      </div>

      {/* Scanner Input */}
      <div className="max-w-3xl mx-auto px-6">
        <form onSubmit={handleScan} className="flex gap-3">
          <div className="flex-1 relative">
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://suspicious-website.com/login..."
              className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/25 transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-8 rounded-xl transition-all flex items-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <HiShieldCheck className="w-5 h-5" />
                Scan
              </>
            )}
          </button>
        </form>

        {/* Error */}
        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3">
            <HiExclamation className="w-5 h-5 text-red-400 flex-shrink-0" />
            <span className="text-red-300 text-sm">{error}</span>
          </motion.div>
        )}

        {/* Loading */}
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 text-center">
            <div className="inline-flex items-center gap-3 bg-slate-800/60 rounded-xl px-6 py-4 border border-slate-700/50">
              <div className="w-5 h-5 border-2 border-indigo-400/30 border-t-indigo-400 rounded-full animate-spin" />
              <span className="text-slate-300">AI is analyzing the URL...</span>
            </div>
          </motion.div>
        )}

        {/* Results */}
        <AnimatePresence>
          {result && colors && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 space-y-4"
            >
              {/* Risk Level Header */}
              <div className={`${colors.bg} ${colors.border} border rounded-2xl p-6`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl ${colors.bar} flex items-center justify-center`}>
                      {result.is_phishing ? <HiExclamation className="w-6 h-6 text-white" /> : <HiShieldCheck className="w-6 h-6 text-white" />}
                    </div>
                    <div>
                      <div className={`text-xl font-bold ${colors.text}`}>{result.risk_level}</div>
                      <div className="text-slate-400 text-sm">Risk Score: {result.risk_score}/100</div>
                    </div>
                  </div>
                  <button onClick={() => setResult(null)} className="text-slate-500 hover:text-white transition-colors">
                    <HiX className="w-5 h-5" />
                  </button>
                </div>

                {/* Risk Bar */}
                <div className="h-3 bg-slate-800/60 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.risk_score}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={`h-full ${colors.bar} rounded-full`}
                  />
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Threats */}
                <div className="bg-slate-800/40 border border-slate-700/30 rounded-xl p-5">
                  <h3 className="text-white font-semibold mb-3">🔍 Threats Detected</h3>
                  {result.threats_detected?.length > 0 ? (
                    <ul className="space-y-2">
                      {result.threats_detected.map((t, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                          <HiExclamation className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-slate-500 text-sm">No threats detected</p>
                  )}
                </div>

                {/* Domain Analysis */}
                <div className="bg-slate-800/40 border border-slate-700/30 rounded-xl p-5">
                  <h3 className="text-white font-semibold mb-3">🌐 Domain Analysis</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Domain</span>
                      <span className="text-white font-mono">{result.domain_analysis?.domain}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Typosquatting</span>
                      <span className={result.domain_analysis?.is_typosquatting ? 'text-red-400' : 'text-green-400'}>
                        {result.domain_analysis?.is_typosquatting ? 'Detected' : 'Not Detected'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Phishing</span>
                      <span className={result.is_phishing ? 'text-red-400' : 'text-green-400'}>
                        {result.is_phishing ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Malware</span>
                      <span className={result.is_malware ? 'text-red-400' : 'text-green-400'}>
                        {result.is_malware ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendation */}
              <div className="bg-slate-800/40 border border-slate-700/30 rounded-xl p-5">
                <h3 className="text-white font-semibold mb-2">💡 Recommendation</h3>
                <p className="text-slate-300 text-sm">{result.recommendation}</p>
              </div>

              {/* Details */}
              <div className="bg-slate-800/40 border border-slate-700/30 rounded-xl p-5">
                <h3 className="text-white font-semibold mb-2">📋 Analysis Details</h3>
                <p className="text-slate-300 text-sm">{result.details}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="h-20" />
    </div>
  );
};

export default URLScanner;
