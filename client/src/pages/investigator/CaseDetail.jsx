import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { complaintAPI, investigationAPI } from '../../services/api';
import { StatusBadge, PriorityBadge, LoadingSpinner } from '../../components';
import toast from 'react-hot-toast';

const CaseDetail = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [investigation, setInvestigation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [newPriority, setNewPriority] = useState('');

  useEffect(() => { fetchDetails(); }, [id]);

  const fetchDetails = async () => {
    try {
      const cRes = await complaintAPI.getById(id);
      setComplaint(cRes.data.data);
      setNewStatus(cRes.data.data.status);
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

  const updateStatus = async () => {
    try {
      await complaintAPI.updateStatus(id, { status: newStatus });
      toast.success(`Status updated to ${newStatus}`);
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
          <div className="flex items-center gap-3">
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
            <h3 className="text-sm font-semibold text-white mb-3">Update Status</h3>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full px-3 py-2 bg-[#0F172A] border border-[#334155] rounded-lg text-sm text-white mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              {['Assigned', 'Under Investigation', 'Resolved', 'Closed'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <button
              onClick={updateStatus}
              className="w-full py-2 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-600/30 text-sm transition-colors"
            >
              Update Status
            </button>
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
    </div>
  );
};

export default CaseDetail;
