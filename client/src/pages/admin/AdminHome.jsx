import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../../services/api';
import { StatsCard, StatusBadge, LoadingSpinner } from '../../components';
import { HiOutlineUsers, HiOutlineClipboardList, HiOutlineClock, HiOutlineCheckCircle } from 'react-icons/hi';

const AdminHome = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await adminAPI.getStats();
        setStats(res.data.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchStats();
  }, []);

  if (loading) return <LoadingSpinner text="Loading analytics..." />;

  const pendingCount = stats?.complaints?.byStatus?.find(s => s._id === 'Submitted')?.count || 0;
  const resolvedCount = stats?.complaints?.byStatus?.find(s => s._id === 'Resolved')?.count || 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">⚙️ Admin Control Center</h1>
        <p className="text-slate-400 mt-1">System overview and management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Users" value={stats?.users?.total || 0} icon={HiOutlineUsers} color="blue" subtitle={`${stats?.users?.citizens || 0} citizens, ${stats?.users?.investigators || 0} investigators`} />
        <StatsCard title="Total Complaints" value={stats?.complaints?.total || 0} icon={HiOutlineClipboardList} color="purple" />
        <StatsCard title="Pending Review" value={pendingCount} icon={HiOutlineClock} color="amber" />
        <StatsCard title="Resolved" value={resolvedCount} icon={HiOutlineCheckCircle} color="green" />
      </div>

      {/* Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Complaints by Category */}
        <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Complaints by Category</h2>
          <div className="space-y-3">
            {stats?.complaints?.byCategory?.map((cat, i) => {
              const total = stats?.complaints?.total || 1;
              const pct = Math.round((cat.count / total) * 100);
              const colors = ['bg-blue-500', 'bg-violet-500', 'bg-cyan-500', 'bg-amber-500', 'bg-emerald-500', 'bg-red-500', 'bg-orange-500', 'bg-pink-500'];
              return (
                <div key={i}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-slate-300 truncate mr-2">{cat._id}</span>
                    <span className="text-slate-400">{cat.count} ({pct}%)</span>
                  </div>
                  <div className="h-2 bg-[#334155] rounded-full overflow-hidden">
                    <div className={`h-full ${colors[i % colors.length]} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            }) || <p className="text-slate-500 text-sm">No data yet</p>}
          </div>
        </div>

        {/* Complaints by Status */}
        <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Complaints by Status</h2>
          <div className="space-y-3">
            {stats?.complaints?.byStatus?.map((st, i) => {
              const total = stats?.complaints?.total || 1;
              const pct = Math.round((st.count / total) * 100);
              return (
                <div key={i} className="flex items-center justify-between bg-[#0F172A] border border-[#334155] rounded-lg p-3">
                  <StatusBadge status={st._id} />
                  <div className="flex items-center gap-3">
                    <span className="text-white font-semibold">{st.count}</span>
                    <span className="text-slate-500 text-sm">({pct}%)</span>
                  </div>
                </div>
              );
            }) || <p className="text-slate-500 text-sm">No data yet</p>}
          </div>
        </div>
      </div>

      {/* Recent Complaints */}
      <div className="bg-[#1E293B] border border-[#334155] rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#334155]">
          <h2 className="text-lg font-semibold text-white">Recent Complaints (Pending Review)</h2>
          <Link to="/admin/complaints" className="text-sm text-blue-400 hover:text-blue-300">View all →</Link>
        </div>
        {stats?.recentComplaints?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  <th className="px-5 py-3">ID</th>
                  <th className="px-5 py-3">Citizen</th>
                  <th className="px-5 py-3">Title</th>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#334155]">
                {stats.recentComplaints.map(c => (
                  <tr key={c._id} className="hover:bg-[#334155]/30 transition-colors">
                    <td className="px-5 py-3 text-blue-400 font-mono text-sm">{c.trackingId}</td>
                    <td className="px-5 py-3 text-sm text-slate-300">{c.citizenId?.name || 'N/A'}</td>
                    <td className="px-5 py-3 text-sm text-white truncate max-w-[200px]">{c.title}</td>
                    <td className="px-5 py-3 text-sm text-slate-300">{c.category}</td>
                    <td className="px-5 py-3"><StatusBadge status={c.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500">No recent complaints</div>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
