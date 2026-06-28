import { useState } from 'react';
import { complaintAPI } from '../../services/api';
import { StatusBadge, PriorityBadge } from '../../components';
import toast from 'react-hot-toast';
import { HiOutlineSearch } from 'react-icons/hi';

const TrackComplaint = () => {
  const [trackingId, setTrackingId] = useState('');
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!trackingId.trim()) { toast.error('Please enter a Tracking ID'); return; }
    setLoading(true);
    setSearched(true);
    try {
      const res = await complaintAPI.track(trackingId.trim().toUpperCase());
      setComplaint(res.data.data);
    } catch (err) {
      setComplaint(null);
      toast.error(err.response?.data?.message || 'Complaint not found');
    } finally {
      setLoading(false);
    }
  };

  const statusSteps = ['Submitted', 'Under Review', 'Assigned', 'Under Investigation', 'Resolved'];
  const currentStep = complaint ? statusSteps.indexOf(complaint.status) : -1;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">🔍 Track Your Complaint</h1>
        <p className="text-slate-400 mt-1">Enter your Tracking ID to check the current status</p>
      </div>

      <form onSubmit={handleTrack} className="flex gap-3">
        <div className="relative flex-1">
          <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="Enter Tracking ID (e.g., CS-2026-A7B3K9)"
            className="w-full pl-12 pr-4 py-3 bg-[#1E293B] border border-[#334155] rounded-xl text-white placeholder-slate-500 
              focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-mono"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-xl 
            hover:from-blue-500 hover:to-cyan-400 disabled:opacity-50 transition-all shadow-lg shadow-blue-600/20"
        >
          {loading ? 'Searching...' : 'Track'}
        </button>
      </form>

      {searched && !loading && complaint && (
        <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-6 space-y-6 animate-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-sm text-slate-400 font-mono">{complaint.trackingId}</p>
              <h2 className="text-lg font-semibold text-white">{complaint.title}</h2>
            </div>
            <div className="flex items-center gap-2">
              <PriorityBadge priority={complaint.priority} />
              <StatusBadge status={complaint.status} />
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-[#0F172A] border border-[#334155] rounded-xl p-6">
            <h3 className="text-sm font-semibold text-white mb-4">Status Timeline</h3>
            <div className="flex items-center justify-between">
              {statusSteps.map((s, i) => (
                <div key={s} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold
                      ${i <= currentStep
                        ? 'bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-md shadow-emerald-500/20'
                        : 'bg-[#334155] text-slate-500'}`}>
                      {i <= currentStep ? '✓' : i + 1}
                    </div>
                    <span className={`text-[10px] mt-1 text-center ${i <= currentStep ? 'text-emerald-400' : 'text-slate-500'}`}>{s}</span>
                  </div>
                  {i < statusSteps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-1 ${i < currentStep ? 'bg-emerald-500' : 'bg-[#334155]'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-500 uppercase">Category</p>
              <p className="text-sm text-white mt-1">{complaint.category}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase">Assigned To</p>
              <p className="text-sm text-white mt-1">{complaint.assignedTo?.name || 'Pending'}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase">Filed On</p>
              <p className="text-sm text-white mt-1">{new Date(complaint.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase">Last Updated</p>
              <p className="text-sm text-white mt-1">{new Date(complaint.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}

      {searched && !loading && !complaint && (
        <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-12 text-center">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-slate-400">No complaint found with this Tracking ID</p>
          <p className="text-sm text-slate-500 mt-1">Please check the ID and try again</p>
        </div>
      )}
    </div>
  );
};

export default TrackComplaint;
