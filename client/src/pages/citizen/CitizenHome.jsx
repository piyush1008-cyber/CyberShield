import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { complaintAPI } from '../../services/api';
import { StatsCard, StatusBadge, LoadingSpinner } from '../../components';
import { HiOutlineClipboardList, HiOutlineCheckCircle, HiOutlineClock, HiOutlineExclamation } from 'react-icons/hi';

const CitizenHome = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, active: 0, resolved: 0, pending: 0 });

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await complaintAPI.getAll({ limit: 5 });
      const data = res.data.data;
      setComplaints(data);

      const all = res.data.pagination.total;
      const active = data.filter(c => ['Assigned', 'Under Investigation'].includes(c.status)).length;
      const resolved = data.filter(c => ['Resolved', 'Closed'].includes(c.status)).length;
      const pending = data.filter(c => ['Submitted', 'Under Review'].includes(c.status)).length;
      setStats({ total: all, active, resolved, pending });
    } catch (error) {
      console.error('Failed to fetch complaints:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner text="Loading dashboard..." />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Welcome back, <span className="text-blue-400">{user?.name?.split(' ')[0]}</span> 👋
        </h1>
        <p className="text-slate-400 mt-1">Here's an overview of your cyber crime complaints</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Cases" value={stats.total} icon={HiOutlineClipboardList} color="blue" />
        <StatsCard title="Active Cases" value={stats.active} icon={HiOutlineClock} color="amber" />
        <StatsCard title="Resolved" value={stats.resolved} icon={HiOutlineCheckCircle} color="green" />
        <StatsCard title="Pending Review" value={stats.pending} icon={HiOutlineExclamation} color="purple" />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/citizen/file-complaint"
          className="group bg-gradient-to-br from-blue-600/20 to-cyan-600/10 border border-blue-500/20 rounded-xl p-5 
            hover:from-blue-600/30 hover:to-cyan-600/20 transition-all duration-300 hover:scale-[1.02]"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-blue-500/25">
              📝
            </div>
            <div>
              <h3 className="text-white font-semibold group-hover:text-blue-300 transition-colors">File New Complaint</h3>
              <p className="text-sm text-slate-400">Report a cyber crime incident</p>
            </div>
          </div>
        </Link>

        <Link
          to="/citizen/track"
          className="group bg-gradient-to-br from-violet-600/20 to-purple-600/10 border border-violet-500/20 rounded-xl p-5 
            hover:from-violet-600/30 hover:to-purple-600/20 transition-all duration-300 hover:scale-[1.02]"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-violet-500/25">
              🔍
            </div>
            <div>
              <h3 className="text-white font-semibold group-hover:text-violet-300 transition-colors">Track by ID</h3>
              <p className="text-sm text-slate-400">Check status with your tracking ID</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Complaints */}
      <div className="bg-[#1E293B] border border-[#334155] rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#334155]">
          <h2 className="text-lg font-semibold text-white">Recent Complaints</h2>
          <Link to="/citizen/my-complaints" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
            View all →
          </Link>
        </div>

        {complaints.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-slate-500 text-lg mb-2">No complaints filed yet</p>
            <p className="text-slate-600 text-sm mb-4">Start by filing your first cyber crime complaint</p>
            <Link
              to="/citizen/file-complaint"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors text-sm"
            >
              📝 File Complaint
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  <th className="px-5 py-3">Tracking ID</th>
                  <th className="px-5 py-3">Title</th>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#334155]">
                {complaints.map((c) => (
                  <tr key={c._id} className="hover:bg-[#334155]/30 transition-colors">
                    <td className="px-5 py-3">
                      <Link to={`/citizen/complaints/${c._id}`} className="text-blue-400 hover:text-blue-300 font-mono text-sm">
                        {c.trackingId}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-sm text-white max-w-[200px] truncate">{c.title}</td>
                    <td className="px-5 py-3 text-sm text-slate-300">{c.category}</td>
                    <td className="px-5 py-3"><StatusBadge status={c.status} /></td>
                    <td className="px-5 py-3 text-sm text-slate-400">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
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

export default CitizenHome;
