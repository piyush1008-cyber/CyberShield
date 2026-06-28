import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { complaintAPI } from '../../services/api';
import { StatusBadge, PriorityBadge, LoadingSpinner } from '../../components';

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ status: '', category: '' });
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });

  useEffect(() => { fetchComplaints(); }, [page, filter]);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 10, ...filter };
      Object.keys(params).forEach(k => !params[k] && delete params[k]);
      const res = await complaintAPI.getAll(params);
      setComplaints(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">📋 My Complaints</h1>
          <p className="text-slate-400 mt-1">{pagination.total} total complaints</p>
        </div>
        <Link
          to="/citizen/file-complaint"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-xl 
            hover:from-blue-500 hover:to-cyan-400 transition-all shadow-lg shadow-blue-600/20 text-sm"
        >
          + New Complaint
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select
          value={filter.status}
          onChange={(e) => { setFilter({ ...filter, status: e.target.value }); setPage(1); }}
          className="px-3 py-2 bg-[#1E293B] border border-[#334155] rounded-lg text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          <option value="">All Statuses</option>
          {['Submitted', 'Under Review', 'Assigned', 'Under Investigation', 'Resolved', 'Closed', 'Rejected'].map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          value={filter.category}
          onChange={(e) => { setFilter({ ...filter, category: e.target.value }); setPage(1); }}
          className="px-3 py-2 bg-[#1E293B] border border-[#334155] rounded-lg text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          <option value="">All Categories</option>
          {['Financial Fraud', 'Identity Theft', 'Online Harassment / Cyberbullying', 'Phishing / Social Engineering', 'Ransomware / Malware Attack', 'Data Breach', 'Online Scam', 'Other'].map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
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
                  <th className="px-5 py-3">Tracking ID</th>
                  <th className="px-5 py-3">Title</th>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">Priority</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Filed On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#334155]">
                {complaints.map((c) => (
                  <tr key={c._id} className="hover:bg-[#334155]/30 transition-colors">
                    <td className="px-5 py-4">
                      <Link to={`/citizen/complaints/${c._id}`} className="text-blue-400 hover:text-blue-300 font-mono text-sm font-medium">
                        {c.trackingId}
                      </Link>
                    </td>
                    <td className="px-5 py-4 text-sm text-white max-w-[200px] truncate">{c.title}</td>
                    <td className="px-5 py-4 text-sm text-slate-300">{c.category}</td>
                    <td className="px-5 py-4"><PriorityBadge priority={c.priority} /></td>
                    <td className="px-5 py-4"><StatusBadge status={c.status} /></td>
                    <td className="px-5 py-4 text-sm text-slate-400">{new Date(c.createdAt).toLocaleDateString()}</td>
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
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 bg-[#1E293B] border border-[#334155] rounded-lg text-sm text-slate-300 disabled:opacity-40 hover:bg-[#334155] transition-colors"
          >
            ← Prev
          </button>
          <span className="text-sm text-slate-400">Page {page} of {pagination.pages}</span>
          <button
            onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
            disabled={page === pagination.pages}
            className="px-3 py-1.5 bg-[#1E293B] border border-[#334155] rounded-lg text-sm text-slate-300 disabled:opacity-40 hover:bg-[#334155] transition-colors"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default MyComplaints;
