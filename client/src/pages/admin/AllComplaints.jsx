import { useState, useEffect } from 'react';
import { complaintAPI, adminAPI } from '../../services/api';
import { StatusBadge, PriorityBadge, LoadingSpinner } from '../../components';
import toast from 'react-hot-toast';

const AllComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [investigators, setInvestigators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ status: '', category: '' });
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });
  const [assignModal, setAssignModal] = useState({ open: false, complaintId: null, investigatorId: '', priority: 'Medium' });

  useEffect(() => { fetchComplaints(); fetchInvestigators(); }, [page, filter]);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 10, ...filter };
      Object.keys(params).forEach(k => !params[k] && delete params[k]);
      const res = await complaintAPI.getAll(params);
      setComplaints(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const fetchInvestigators = async () => {
    try {
      const res = await adminAPI.getUsers({ role: 'investigator', limit: 100 });
      setInvestigators(res.data.data);
    } catch {}
  };

  const handleAssign = async () => {
    if (!assignModal.investigatorId) { toast.error('Select an investigator'); return; }
    try {
      await adminAPI.assignInvestigator(assignModal.complaintId, {
        investigatorId: assignModal.investigatorId,
        priority: assignModal.priority
      });
      toast.success('Investigator assigned!');
      setAssignModal({ open: false, complaintId: null, investigatorId: '', priority: 'Medium' });
      fetchComplaints();
    } catch (err) { toast.error(err.response?.data?.message || 'Assignment failed'); }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await complaintAPI.updateStatus(id, { status });
      toast.success(`Status updated to ${status}`);
      fetchComplaints();
    } catch { toast.error('Failed to update'); }
  };

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">📋 All Complaints</h1>
        <p className="text-slate-400 mt-1">{pagination.total} total</p></div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select value={filter.status} onChange={(e) => { setFilter({ ...filter, status: e.target.value }); setPage(1); }}
          className="px-3 py-2 bg-[#1E293B] border border-[#334155] rounded-lg text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50">
          <option value="">All Statuses</option>
          {['Submitted', 'Under Review', 'Assigned', 'Under Investigation', 'Resolved', 'Closed', 'Rejected'].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={filter.category} onChange={(e) => { setFilter({ ...filter, category: e.target.value }); setPage(1); }}
          className="px-3 py-2 bg-[#1E293B] border border-[#334155] rounded-lg text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50">
          <option value="">All Categories</option>
          {['Financial Fraud', 'Identity Theft', 'Online Harassment / Cyberbullying', 'Phishing / Social Engineering', 'Ransomware / Malware Attack', 'Data Breach', 'Online Scam', 'Other'].map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#1E293B] border border-[#334155] rounded-xl overflow-hidden">
        {loading ? <LoadingSpinner /> : complaints.length === 0 ? (
          <div className="p-12 text-center text-slate-500">No complaints found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider border-b border-[#334155]">
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Citizen</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Priority</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#334155]">
                {complaints.map(c => (
                  <tr key={c._id} className="hover:bg-[#334155]/30 transition-colors">
                    <td className="px-4 py-3 text-blue-400 font-mono text-sm">{c.trackingId}</td>
                    <td className="px-4 py-3 text-sm text-slate-300">{c.citizenId?.name || 'N/A'}</td>
                    <td className="px-4 py-3 text-sm text-white truncate max-w-[150px]">{c.title}</td>
                    <td className="px-4 py-3 text-sm text-slate-300">{c.category}</td>
                    <td className="px-4 py-3"><PriorityBadge priority={c.priority} /></td>
                    <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {(c.status === 'Submitted' || c.status === 'Under Review') && (
                          <>
                            <button onClick={() => setAssignModal({ open: true, complaintId: c._id, investigatorId: '', priority: c.priority })}
                              className="px-2 py-1 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded text-xs hover:bg-blue-600/30 transition-colors">
                              Assign
                            </button>
                            <button onClick={() => handleStatusChange(c._id, 'Rejected')}
                              className="px-2 py-1 bg-red-600/20 text-red-400 border border-red-500/30 rounded text-xs hover:bg-red-600/30 transition-colors">
                              Reject
                            </button>
                          </>
                        )}
                        {c.status === 'Submitted' && (
                          <button onClick={() => handleStatusChange(c._id, 'Under Review')}
                            className="px-2 py-1 bg-amber-600/20 text-amber-400 border border-amber-500/30 rounded text-xs hover:bg-amber-600/30 transition-colors">
                            Review
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            className="px-3 py-1.5 bg-[#1E293B] border border-[#334155] rounded-lg text-sm text-slate-300 disabled:opacity-40 hover:bg-[#334155]">← Prev</button>
          <span className="text-sm text-slate-400">Page {page} of {pagination.pages}</span>
          <button onClick={() => setPage(p => Math.min(pagination.pages, p + 1))} disabled={page === pagination.pages}
            className="px-3 py-1.5 bg-[#1E293B] border border-[#334155] rounded-lg text-sm text-slate-300 disabled:opacity-40 hover:bg-[#334155]">Next →</button>
        </div>
      )}

      {/* Assign Modal */}
      {assignModal.open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-lg font-semibold text-white mb-4">📌 Assign Investigator</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-300 mb-2">Select Investigator</label>
                <select
                  value={assignModal.investigatorId}
                  onChange={(e) => setAssignModal({ ...assignModal, investigatorId: e.target.value })}
                  className="w-full px-3 py-2.5 bg-[#0F172A] border border-[#334155] rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  <option value="">Choose investigator...</option>
                  {investigators.filter(inv => inv.isActive).map(inv => (
                    <option key={inv._id} value={inv._id}>{inv.name} — {inv.email}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-2">Priority</label>
                <select
                  value={assignModal.priority}
                  onChange={(e) => setAssignModal({ ...assignModal, priority: e.target.value })}
                  className="w-full px-3 py-2.5 bg-[#0F172A] border border-[#334155] rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  {['Low', 'Medium', 'High', 'Critical'].map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setAssignModal({ ...assignModal, open: false })}
                  className="flex-1 py-2.5 bg-[#334155] text-slate-300 rounded-xl hover:bg-[#475569] transition-colors text-sm">
                  Cancel
                </button>
                <button onClick={handleAssign}
                  className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:from-blue-500 hover:to-cyan-400 transition-all text-sm shadow-lg shadow-blue-600/20">
                  ✅ Assign Case
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllComplaints;
