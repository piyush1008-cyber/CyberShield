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
      <div className="bg-white border border-slate-200 rounded-3xl p-8 lg:p-10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">what can I do for you today?</span> 👋
          </h1>
          <p className="text-slate-600 mt-4 text-lg lg:text-xl font-medium max-w-2xl">
            Here's an overview of your cyber crime complaints. Stay informed and track your reports securely.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Cases" value={stats.total} icon={HiOutlineClipboardList} color="blue" />
        <StatsCard title="Active Cases" value={stats.active} icon={HiOutlineClock} color="amber" />
        <StatsCard title="Resolved" value={stats.resolved} icon={HiOutlineCheckCircle} color="green" />
        <StatsCard title="Pending Review" value={stats.pending} icon={HiOutlineExclamation} color="purple" />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link
          to="/citizen/file-complaint"
          className="group bg-white border border-slate-200 rounded-3xl p-8 
            hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl shadow-sm">
              📝
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">File New Complaint</h3>
              <p className="text-base text-slate-500 mt-1 font-medium">Report a cyber crime incident securely</p>
            </div>
          </div>
        </Link>

        <Link
          to="/citizen/track"
          className="group bg-white border border-slate-200 rounded-3xl p-8 
            hover:border-purple-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-3xl shadow-sm">
              🔍
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 group-hover:text-purple-700 transition-colors">Track by ID</h3>
              <p className="text-base text-slate-500 mt-1 font-medium">Check status with your tracking ID</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Complaints */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-200 bg-slate-50">
          <h2 className="text-xl font-bold text-slate-900">Recent Complaints</h2>
          <Link to="/citizen/my-complaints" className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors bg-blue-50 px-4 py-2 rounded-lg">
            View all →
          </Link>
        </div>

        {complaints.length === 0 ? (
          <div className="p-16 text-center">
            <p className="text-slate-600 text-xl font-semibold mb-3">No complaints filed yet</p>
            <p className="text-slate-500 text-base mb-6">Start by filing your first cyber crime complaint</p>
            <Link
              to="/citizen/file-complaint"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-md"
            >
              📝 File Complaint
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-sm font-bold text-slate-500 uppercase tracking-wider bg-slate-50">
                  <th className="px-8 py-4">Tracking ID</th>
                  <th className="px-8 py-4">Title</th>
                  <th className="px-8 py-4">Category</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {complaints.map((c) => (
                  <tr key={c._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-4">
                      <Link to={`/citizen/complaints/${c._id}`} className="text-blue-600 hover:text-blue-700 font-mono font-bold text-base">
                        {c.trackingId}
                      </Link>
                    </td>
                    <td className="px-8 py-4 text-base font-semibold text-slate-900 max-w-[250px] truncate">{c.title}</td>
                    <td className="px-8 py-4 text-base text-slate-600">{c.category}</td>
                    <td className="px-8 py-4"><StatusBadge status={c.status} /></td>
                    <td className="px-8 py-4 text-base text-slate-500 font-medium">
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
