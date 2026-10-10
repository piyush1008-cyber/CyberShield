import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { complaintAPI } from '../../services/api';
import { StatsCard, StatusBadge, PriorityBadge, LoadingSpinner } from '../../components';
import { HiOutlineFolder, HiOutlineClock, HiOutlineCheckCircle, HiOutlineExclamation } from 'react-icons/hi';

const InvestigatorHome = () => {
  const { user } = useAuth();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await complaintAPI.getAll({ limit: 10 });
        setCases(res.data.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchCases();
  }, []);

  const active = cases.filter(c => ['Assigned', 'Under Investigation'].includes(c.status));
  const resolved = cases.filter(c => ['Resolved', 'Closed'].includes(c.status));
  const critical = cases.filter(c => c.priority === 'Critical');

  if (loading) return <LoadingSpinner text="Loading cases..." />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Investigation Dashboard 🔍</h1>
        <p className="text-slate-500 mt-1 font-medium">Welcome, <span className="text-blue-600 font-bold">{user?.name}</span></p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Assigned" value={cases.length} icon={HiOutlineFolder} color="blue" />
        <StatsCard title="Active Cases" value={active.length} icon={HiOutlineClock} color="amber" />
        <StatsCard title="Resolved" value={resolved.length} icon={HiOutlineCheckCircle} color="green" />
        <StatsCard title="Critical" value={critical.length} icon={HiOutlineExclamation} color="red" />
      </div>

      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 bg-slate-50">
          <h2 className="text-lg font-bold text-slate-900">Active Cases</h2>
          <Link to="/investigator/cases" className="text-sm font-semibold text-blue-600 hover:text-blue-700">View all →</Link>
        </div>
        {active.length === 0 ? (
          <div className="p-12 text-center text-slate-500">No active cases</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50">
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Priority</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {active.map(c => (
                  <tr key={c._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <Link to={`/investigator/cases/${c._id}`} className="text-blue-600 hover:text-blue-700 font-mono text-sm font-semibold">{c.trackingId}</Link>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900 truncate max-w-[200px]">{c.title}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{c.category}</td>
                    <td className="px-6 py-4"><PriorityBadge priority={c.priority} /></td>
                    <td className="px-6 py-4"><StatusBadge status={c.status} /></td>
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

export default InvestigatorHome;
