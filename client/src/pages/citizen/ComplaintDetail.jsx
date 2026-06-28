import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { complaintAPI, investigationAPI } from '../../services/api';
import { StatusBadge, PriorityBadge, LoadingSpinner } from '../../components';
import toast from 'react-hot-toast';

const ComplaintDetail = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [investigation, setInvestigation] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sendingMsg, setSendingMsg] = useState(false);

  useEffect(() => { fetchDetails(); }, [id]);

  const fetchDetails = async () => {
    try {
      const res = await complaintAPI.getById(id);
      setComplaint(res.data.data);
      try {
        const invRes = await investigationAPI.get(id);
        setInvestigation(invRes.data.data);
      } catch {}
    } catch (err) {
      toast.error('Failed to load complaint details');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    setSendingMsg(true);
    try {
      await investigationAPI.sendMessage(id, { message });
      setMessage('');
      toast.success('Message sent!');
      fetchDetails();
    } catch (err) {
      toast.error('Failed to send message');
    } finally {
      setSendingMsg(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!complaint) return <div className="text-center text-slate-400 py-12">Complaint not found</div>;

  const statusSteps = ['Submitted', 'Under Review', 'Assigned', 'Under Investigation', 'Resolved'];
  const currentStep = statusSteps.indexOf(complaint.status);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-400">
        <Link to="/citizen/my-complaints" className="hover:text-blue-400 transition-colors">My Complaints</Link>
        <span>›</span>
        <span className="text-white">{complaint.trackingId}</span>
      </div>

      {/* Header */}
      <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-xl font-bold text-white">{complaint.title}</h1>
            <p className="text-sm text-slate-400 font-mono mt-1">{complaint.trackingId}</p>
          </div>
          <div className="flex items-center gap-3">
            <PriorityBadge priority={complaint.priority} />
            <StatusBadge status={complaint.status} />
          </div>
        </div>

        {/* Status Timeline */}
        {complaint.status !== 'Rejected' && (
          <div className="flex items-center justify-between mt-6 px-2">
            {statusSteps.map((s, i) => (
              <div key={s} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold
                    ${i <= currentStep
                      ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white'
                      : 'bg-[#334155] text-slate-500'}`}>
                    {i <= currentStep ? '✓' : i + 1}
                  </div>
                  <span className={`text-[10px] mt-1 text-center ${i <= currentStep ? 'text-blue-400' : 'text-slate-500'}`}>{s}</span>
                </div>
                {i < statusSteps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-1 ${i < currentStep ? 'bg-blue-500' : 'bg-[#334155]'}`} />
                )}
              </div>
            ))}
          </div>
        )}
        {complaint.status === 'Rejected' && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm font-medium">Complaint Rejected</p>
            <p className="text-red-300/70 text-xs mt-1">{complaint.rejectionReason || 'No reason provided'}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Complaint Details</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">Category</p>
                <p className="text-sm text-white mt-1">{complaint.category}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">Incident Date</p>
                <p className="text-sm text-white mt-1">{new Date(complaint.incidentDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">Filed On</p>
                <p className="text-sm text-white mt-1">{new Date(complaint.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">Assigned To</p>
                <p className="text-sm text-white mt-1">{complaint.assignedTo?.name || 'Not yet assigned'}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Description</p>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{complaint.description}</p>
            </div>
          </div>

          {/* Communication */}
          {investigation && (
            <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">💬 Messages</h2>
              <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                {investigation.communications?.length === 0 ? (
                  <p className="text-slate-500 text-sm text-center py-4">No messages yet</p>
                ) : investigation.communications?.map((msg, i) => (
                  <div key={i} className={`flex ${msg.senderRole === 'citizen' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] px-4 py-2.5 rounded-xl text-sm
                      ${msg.senderRole === 'citizen'
                        ? 'bg-blue-600/20 text-blue-100 border border-blue-500/20'
                        : 'bg-[#334155] text-slate-200'}`}>
                      <p>{msg.message}</p>
                      <p className="text-[10px] text-slate-500 mt-1">{new Date(msg.sentAt).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2.5 bg-[#0F172A] border border-[#334155] rounded-xl text-white text-sm placeholder-slate-500
                    focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={sendingMsg || !message.trim()}
                  className="px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-500 disabled:opacity-50 transition-all text-sm"
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Investigation Notes */}
        <div className="space-y-6">
          {investigation && investigation.notes?.length > 0 && (
            <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white mb-3">📋 Investigation Notes</h3>
              <div className="space-y-3">
                {investigation.notes.map((note, i) => (
                  <div key={i} className="bg-[#0F172A] rounded-lg p-3 border border-[#334155]">
                    <p className="text-sm text-slate-300">{note.content}</p>
                    <p className="text-[10px] text-slate-500 mt-2">{new Date(note.addedAt).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetail;
