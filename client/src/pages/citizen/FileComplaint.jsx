import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { complaintAPI, aiAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { HiOutlineDocumentText, HiOutlinePhotograph, HiOutlineCheckCircle, HiSparkles } from 'react-icons/hi';

const categories = [
  'Financial Fraud', 'Identity Theft', 'Online Harassment / Cyberbullying',
  'Phishing / Social Engineering', 'Ransomware / Malware Attack',
  'Data Breach', 'Online Scam', 'Other'
];

const FileComplaint = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [formData, setFormData] = useState({
    title: '', description: '', category: '', incidentDate: ''
  });
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const navigate = useNavigate();

  const handleAIClassify = async () => {
    if (!formData.description || formData.description.length < 20) {
      toast.error('Please write at least 20 characters to use AI classification');
      return;
    }
    setAiLoading(true);
    try {
      const res = await aiAPI.classify({ title: formData.title, description: formData.description });
      const data = res.data.data;
      setAiResult(data);
      if (data.category) {
        setFormData(prev => ({ ...prev, category: data.category }));
      }
      toast.success(`AI classified as: ${data.category} (${data.priority} priority)`);
    } catch (err) {
      toast.error('AI classification failed. You can still select manually.');
    } finally {
      setAiLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep1 = () => {
    if (!formData.title || !formData.category || !formData.incidentDate) {
      toast.error('Please fill all required fields');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.description) {
      toast.error('Please provide a description');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await complaintAPI.create(formData);
      setTrackingId(res.data.data.trackingId);
      setStep(3);
      toast.success('Complaint filed successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit complaint');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { num: 1, label: 'Details', icon: HiOutlineDocumentText },
    { num: 2, label: 'Description', icon: HiOutlinePhotograph },
    { num: 3, label: 'Confirmation', icon: HiOutlineCheckCircle }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-2">📝 File New Complaint</h1>
      <p className="text-slate-400 mb-6">Report a cyber crime incident in 3 easy steps</p>

      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-8 px-4">
        {steps.map((s, i) => (
          <div key={s.num} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300
                ${step >= s.num
                  ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-[#1E293B] border border-[#334155] text-slate-500'
                }`}>
                {step > s.num ? '✓' : s.num}
              </div>
              <span className={`text-xs mt-2 font-medium ${step >= s.num ? 'text-blue-400' : 'text-slate-500'}`}>
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-full h-0.5 mx-4 mt-[-20px] ${step > s.num ? 'bg-blue-500' : 'bg-[#334155]'}`} style={{ minWidth: '60px' }} />
            )}
          </div>
        ))}
      </div>

      <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6">
        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Complaint Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Unauthorized bank transaction"
                className="w-full px-4 py-3 bg-[#0F172A] border border-[#334155] rounded-xl text-white placeholder-slate-500 
                  focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Crime Category <span className="text-red-400">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#0F172A] border border-[#334155] rounded-xl text-white 
                  focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all appearance-none"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Date of Incident <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                name="incidentDate"
                value={formData.incidentDate}
                onChange={handleChange}
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 bg-[#0F172A] border border-[#334155] rounded-xl text-white 
                  focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => validateStep1() && setStep(2)}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-xl 
                  hover:from-blue-500 hover:to-cyan-400 transition-all shadow-lg shadow-blue-600/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                Next Step →
              </button>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Detailed Description <span className="text-red-400">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                placeholder="Describe the incident in detail — what happened, when, how you were affected..."
                className="w-full px-4 py-3 bg-[#0F172A] border border-[#334155] rounded-xl text-white placeholder-slate-500 
                  focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none"
              />
              <p className="text-xs text-slate-500 mt-1">{formData.description.length}/5000 characters</p>
            </div>

            <div className="bg-[#0F172A] border border-dashed border-[#475569] rounded-xl p-6 text-center">
              <HiOutlinePhotograph className="w-10 h-10 text-slate-500 mx-auto mb-2" />
              <p className="text-sm text-slate-400">Evidence upload will be available after submission</p>
              <p className="text-xs text-slate-500 mt-1">Supports: Images, PDFs, Documents (Max 10MB each)</p>
            </div>

            {/* AI Classification Button */}
            <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/20 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <HiSparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">AI Auto-Classification</p>
                    <p className="text-slate-400 text-xs">Let AI analyze and categorize your complaint</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAIClassify}
                  disabled={aiLoading || !formData.description}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-all flex items-center gap-2"
                >
                  {aiLoading ? (
                    <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Analyzing...</>
                  ) : (
                    <><HiSparkles className="w-4 h-4" /> AI Classify</>
                  )}
                </button>
              </div>

              {/* AI Results */}
              {aiResult && (
                <div className="mt-4 bg-[#0F172A] border border-[#334155] rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    <HiSparkles className="w-4 h-4 text-purple-400" />
                    <span className="text-purple-400 text-sm font-semibold">AI Analysis Results</span>
                    <span className="text-xs text-slate-500 ml-auto">{Math.round((aiResult.confidence || 0) * 100)}% confidence</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-slate-800/60 rounded-lg px-3 py-2">
                      <span className="text-slate-400 text-xs">Category</span>
                      <p className="text-white font-medium">{aiResult.category}</p>
                    </div>
                    <div className="bg-slate-800/60 rounded-lg px-3 py-2">
                      <span className="text-slate-400 text-xs">Priority</span>
                      <p className={`font-medium ${aiResult.priority === 'Critical' ? 'text-red-400' : aiResult.priority === 'High' ? 'text-orange-400' : aiResult.priority === 'Medium' ? 'text-amber-400' : 'text-green-400'}`}>{aiResult.priority}</p>
                    </div>
                    <div className="bg-slate-800/60 rounded-lg px-3 py-2">
                      <span className="text-slate-400 text-xs">Severity</span>
                      <p className="text-white font-medium">{aiResult.severity_score}/10</p>
                    </div>
                    <div className="bg-slate-800/60 rounded-lg px-3 py-2">
                      <span className="text-slate-400 text-xs">Summary</span>
                      <p className="text-slate-300 text-xs">{aiResult.summary}</p>
                    </div>
                  </div>
                  {aiResult.threat_indicators?.length > 0 && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                      <span className="text-red-400 text-xs font-medium">⚠️ Threat Indicators:</span>
                      <p className="text-slate-300 text-xs mt-1">{aiResult.threat_indicators.join(', ')}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-between pt-2">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-2.5 bg-[#334155] text-slate-300 font-medium rounded-xl hover:bg-[#475569] transition-all"
              >
                ← Back
              </button>
              <button
                onClick={() => validateStep2() && handleSubmit()}
                disabled={loading}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-xl 
                  hover:from-blue-500 hover:to-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed 
                  transition-all shadow-lg shadow-blue-600/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting...
                  </span>
                ) : 'Submit Complaint'}
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — Confirmation */}
        {step === 3 && (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg shadow-emerald-500/25 animate-bounce">
              ✓
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Complaint Filed Successfully!</h2>
            <p className="text-slate-400 mb-6">Your complaint has been submitted and is under review</p>

            <div className="bg-[#0F172A] border border-[#334155] rounded-xl p-5 inline-block mb-6">
              <p className="text-sm text-slate-400 mb-1">Your Tracking ID</p>
              <p className="text-2xl font-bold font-mono text-blue-400">{trackingId}</p>
              <p className="text-xs text-slate-500 mt-2">Save this ID to track your complaint</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => navigate('/citizen/my-complaints')}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-xl 
                  hover:from-blue-500 hover:to-cyan-400 transition-all"
              >
                View My Complaints
              </button>
              <button
                onClick={() => { setStep(1); setFormData({ title: '', description: '', category: '', incidentDate: '' }); }}
                className="px-6 py-2.5 bg-[#334155] text-slate-300 font-medium rounded-xl hover:bg-[#475569] transition-all"
              >
                File Another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileComplaint;
