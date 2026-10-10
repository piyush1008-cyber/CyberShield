import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { complaintAPI, investigationAPI } from '../../services/api';
import { StatusBadge, PriorityBadge, LoadingSpinner } from '../../components';
import { HiOutlineDownload } from 'react-icons/hi';
import toast from 'react-hot-toast';

const CaseDetail = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [investigation, setInvestigation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloadingPDF, setDownloadingPDF] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [newPriority, setNewPriority] = useState('');
  const [resolveModal, setResolveModal] = useState({ open: false, scammerDetails: '', legalSections: '' });

  const handleDownloadPDF = async () => {
    setDownloadingPDF(true);
    try {
      const res = await complaintAPI.downloadPDF(id);
      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `CyberShield_Case_${complaint?.trackingId || id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Official Case Report PDF downloaded!');
    } catch {
      toast.error('Failed to download PDF');
    } finally {
      setDownloadingPDF(false);
    }
  };

  useEffect(() => { fetchDetails(); }, [id]);

  const fetchDetails = async () => {
    try {
      const cRes = await complaintAPI.getById(id);
      setComplaint(cRes.data.data);
      setNewPriority(cRes.data.data.priority);
      try {
        const iRes = await investigationAPI.get(id);
        setInvestigation(iRes.data.data);
      } catch {}
    } catch { toast.error('Failed to load case'); }
    finally { setLoading(false); }
  };

  const addNote = async () => {
    if (!newNote.trim()) return;
    try {
      await investigationAPI.addNote(id, { content: newNote });
      setNewNote('');
      toast.success('Note added');
      fetchDetails();
    } catch { toast.error('Failed to add note'); }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      await investigationAPI.sendMessage(id, { message: newMessage });
      setNewMessage('');
      toast.success('Message sent');
      fetchDetails();
    } catch { toast.error('Failed to send message'); }
  };

  const updateStatus = async (targetStatus) => {
    if (targetStatus === 'Resolved' && !resolveModal.open) {
      setResolveModal({ open: true, scammerDetails: complaint.scammerDetails || '', legalSections: complaint.legalSections || '' });
      return;
    }
    try {
      const payload = { status: targetStatus };
      if (targetStatus === 'Resolved') {
        payload.scammerDetails = resolveModal.scammerDetails;
        payload.legalSections = resolveModal.legalSections;
      }
      await complaintAPI.updateStatus(id, payload);
      toast.success(`Status updated to ${targetStatus}`);
      setResolveModal({ open: false, scammerDetails: '', legalSections: '' });
      fetchDetails();
    } catch { toast.error('Failed to update status'); }
  };

  const updatePriority = async () => {
    try {
      await investigationAPI.updatePriority(id, { priority: newPriority });
      toast.success(`Priority updated to ${newPriority}`);
      fetchDetails();
    } catch { toast.error('Failed to update priority'); }
  };

  if (loading) return <LoadingSpinner />;
  if (!complaint) return <div className="text-slate-400 text-center py-12">Case not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-400">
        <Link to="/investigator/cases" className="hover:text-blue-400">My Cases</Link>
        <span>›</span>
        <span className="text-white">{complaint.trackingId}</span>
      </div>

      {/* Header */}
      <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-white">{complaint.title}</h1>
            <p className="text-sm text-slate-400 font-mono mt-1">{complaint.trackingId}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownloadPDF}
              disabled={downloadingPDF}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-semibold rounded-lg transition-all shadow-md shadow-blue-500/20 active:scale-95 disabled:opacity-50"
            >
              <HiOutlineDownload className="w-4 h-4" />
              {downloadingPDF ? 'Generating...' : 'Download PDF Report'}
            </button>
            {complaint.digitalHash && (
              <div title={`SHA-256 Hash: ${complaint.digitalHash}`} className="flex items-center gap-1.5 px-2 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-semibold cursor-help">
                🔒 Tamper-Proof (Sec 65B)
              </div>
            )}
            <PriorityBadge priority={complaint.priority} />
            <StatusBadge status={complaint.status} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Complaint Info */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">📄 Complaint Details</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div><p className="text-xs text-slate-500 uppercase">Citizen</p><p className="text-sm text-white mt-1">{complaint.citizenId?.name}</p></div>
              <div><p className="text-xs text-slate-500 uppercase">Email</p><p className="text-sm text-white mt-1">{complaint.citizenId?.email}</p></div>
              <div><p className="text-xs text-slate-500 uppercase">Category</p><p className="text-sm text-white mt-1">{complaint.category}</p></div>
              <div><p className="text-xs text-slate-500 uppercase">Incident Date</p><p className="text-sm text-white mt-1">{new Date(complaint.incidentDate).toLocaleDateString()}</p></div>
            </div>
            <div><p className="text-xs text-slate-500 uppercase mb-2">Description</p><p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{complaint.description}</p></div>
          </div>

          {/* Investigation Notes */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">📋 Investigation Notes</h2>
            <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
              {investigation?.notes?.length > 0 ? investigation.notes.map((note, i) => (
                <div key={i} className="bg-[#0F172A] border border-[#334155] rounded-lg p-3">
                  <p className="text-sm text-slate-300">{note.content}</p>
                  <p className="text-[10px] text-slate-500 mt-2">{new Date(note.addedAt).toLocaleString()}</p>
                </div>
              )) : <p className="text-slate-500 text-sm text-center py-4">No notes yet</p>}
            </div>
            <div className="flex gap-2">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add investigation note..."
                rows={2}
                className="flex-1 px-4 py-2.5 bg-[#0F172A] border border-[#334155] rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
              />
              <button onClick={addNote} className="self-end px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-500 text-sm transition-colors">
                Add Note
              </button>
            </div>
          </div>

          {/* Communication */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">💬 Communication with Citizen</h2>
            <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
              {investigation?.communications?.length > 0 ? investigation.communications.map((msg, i) => (
                <div key={i} className={`flex ${msg.senderRole === 'investigator' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-4 py-2.5 rounded-xl text-sm ${msg.senderRole === 'investigator' ? 'bg-cyan-600/20 text-cyan-100 border border-cyan-500/20' : 'bg-[#334155] text-slate-200'}`}>
                    <p className="text-[10px] text-slate-500 mb-1">{msg.senderRole === 'investigator' ? '👮 You' : '👤 Citizen'}</p>
                    <p>{msg.message}</p>
                    <p className="text-[10px] text-slate-500 mt-1">{new Date(msg.sentAt).toLocaleString()}</p>
                  </div>
                </div>
              )) : <p className="text-slate-500 text-sm text-center py-4">No messages yet</p>}
            </div>
            <div className="flex gap-2">
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2.5 bg-[#0F172A] border border-[#334155] rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              <button onClick={sendMessage} className="px-4 py-2.5 bg-cyan-600 text-white rounded-xl hover:bg-cyan-500 text-sm transition-colors">Send</button>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Actions */}
        <div className="space-y-4">
          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-3">Case Conclusion</h3>
            <div className="space-y-2">
              <button
                onClick={() => updateStatus('Resolved')}
                className="w-full py-2 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded-lg hover:bg-emerald-600/30 text-sm transition-colors font-medium"
              >
                ✓ Mark as Solved
              </button>
              <button
                onClick={() => updateStatus('Unsolved')}
                className="w-full py-2 bg-amber-600/20 text-amber-400 border border-amber-500/30 rounded-lg hover:bg-amber-600/30 text-sm transition-colors font-medium"
              >
                ❓ Mark as Unsolved
              </button>
              <button
                onClick={() => updateStatus('Closed')}
                className="w-full py-2 bg-slate-600/20 text-slate-400 border border-slate-500/30 rounded-lg hover:bg-slate-600/30 text-sm transition-colors font-medium"
              >
                ✕ Close Case
              </button>
            </div>
          </div>

          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-3">Set Priority</h3>
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
              className="w-full px-3 py-2 bg-[#0F172A] border border-[#334155] rounded-lg text-sm text-white mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              {['Low', 'Medium', 'High', 'Critical'].map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <button
              onClick={updatePriority}
              className="w-full py-2 bg-amber-600/20 text-amber-400 border border-amber-500/30 rounded-lg hover:bg-amber-600/30 text-sm transition-colors"
            >
              Update Priority
            </button>
          </div>

          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-2">Quick Info</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-400">Filed</span><span className="text-white">{new Date(complaint.createdAt).toLocaleDateString()}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Updated</span><span className="text-white">{new Date(complaint.updatedAt).toLocaleDateString()}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Notes</span><span className="text-white">{investigation?.notes?.length || 0}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Messages</span><span className="text-white">{investigation?.communications?.length || 0}</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Resolve Modal */}
      {resolveModal.open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl w-full max-w-lg p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-2">✅ Resolve Case: Final Report</h3>
            <p className="text-sm text-slate-400 mb-6">Enter the final findings to generate the official citizen report.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Scammer / Culprit Details</label>
                <textarea
                  value={resolveModal.scammerDetails}
                  onChange={(e) => setResolveModal({ ...resolveModal, scammerDetails: e.target.value })}
                  placeholder="E.g., Bank Account holder 'Rahul Kumar', IP address trace..."
                  rows={3}
                  className="w-full px-3 py-2 bg-[#0F172A] border border-[#334155] rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Applicable Legal Sections (Indian Law)</label>
                <input
                  type="text"
                  value={resolveModal.legalSections}
                  onChange={(e) => setResolveModal({ ...resolveModal, legalSections: e.target.value })}
                  placeholder="E.g., Section 420 IPC, Section 66D IT Act"
                  className="w-full px-3 py-2 bg-[#0F172A] border border-[#334155] rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setResolveModal({ ...resolveModal, open: false })}
                  className="flex-1 py-2.5 bg-[#334155] text-slate-300 rounded-xl hover:bg-[#475569] transition-colors text-sm font-semibold">
                  Cancel
                </button>
                <button onClick={() => updateStatus('Resolved')}
                  className="flex-1 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-xl hover:from-emerald-500 hover:to-teal-400 transition-all text-sm font-semibold shadow-lg shadow-emerald-600/20">
                  Submit Final Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseDetail;
