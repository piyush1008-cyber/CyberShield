import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { complaintAPI } from '../../services/api';
import { StatusBadge, PriorityBadge, LoadingSpinner } from '../../components';

const AssignedCases = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const params = filter ? { status: filter, limit: 50 } : { limit: 50 };
        const res = await complaintAPI.getAll(params);
        setCases(res.data.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchCases();
  }, [filter]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">📁 My Cases</h1>
        <p className="text-slate-400 mt-1">{cases.length} cases assigned</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {['', 'Assigned', 'Under Investigation', 'Resolved', 'Closed'].map(s => (
          <button
            key={s}
            onClick={() => { setFilter(s); setLoading(true); }}
            className={`px-3 py-1.5 rounded-lg text-sm transition-all
              ${filter === s ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'bg-[#1E293B] text-slate-400 border border-[#334155] hover:bg-[#334155]'}`}
          >
            {s || 'All'}
          </button>
        ))}
      </div>

      <div className="bg-[#1E293B] border border-[#334155] rounded-xl overflow-hidden">
        {loading ? <LoadingSpinner /> : cases.length === 0 ? (
          <div className="p-12 text-center text-slate-500">No cases found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider border-b border-[#334155]">
                  <th className="px-5 py-3">Tracking ID</th>
                  <th className="px-5 py-3">Title</th>
                  <th className="px-5 py-3">Citizen</th>
                  <th className="px-5 py-3">Priority</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#334155]">
                {cases.map(c => (
                  <tr key={c._id} className="hover:bg-[#334155]/30 transition-colors">
                    <td className="px-5 py-4">
                      <Link to={`/investigator/cases/${c._id}`} className="text-blue-400 hover:text-blue-300 font-mono text-sm font-medium">{c.trackingId}</Link>
                    </td>
                    <td className="px-5 py-4 text-sm text-white max-w-[180px] truncate">{c.title}</td>
                    <td className="px-5 py-4 text-sm text-slate-300">{c.citizenId?.name || 'N/A'}</td>
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
    </div>
  );
};

export default AssignedCases;
