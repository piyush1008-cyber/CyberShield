import { useState, useEffect } from 'react';
import { notificationAPI } from '../../services/api';
import { LoadingSpinner } from '../../components';
import toast from 'react-hot-toast';
import { HiOutlineBell, HiOutlineCheck } from 'react-icons/hi';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => { fetchNotifications(); }, []);

  const fetchNotifications = async () => {
    try {
      const res = await notificationAPI.getAll({ limit: 50 });
      setNotifications(res.data.data);
      setUnreadCount(res.data.unreadCount);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const markAsRead = async (id) => {
    try {
      await notificationAPI.markAsRead(id);
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch { toast.error('Failed to update'); }
  };

  const markAllAsRead = async () => {
    try {
      await notificationAPI.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
      toast.success('All notifications marked as read');
    } catch { toast.error('Failed to update'); }
  };

  const typeIcons = {
    complaint_submitted: '📩', complaint_under_review: '🔍', complaint_assigned: '📌',
    complaint_rejected: '❌', status_update: '🔄', new_message: '💬',
    case_resolved: '✅', case_closed: '📁', evidence_requested: '📎'
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">🔔 Notifications</h1>
          <p className="text-slate-400 mt-1">{unreadCount} unread</p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
          >
            <HiOutlineCheck className="w-4 h-4" /> Mark all read
          </button>
        )}
      </div>

      <div className="space-y-2">
        {notifications.length === 0 ? (
          <div className="bg-[#1E293B] border border-[#334155] rounded-xl p-12 text-center">
            <HiOutlineBell className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">No notifications yet</p>
          </div>
        ) : notifications.map((n) => (
          <div
            key={n._id}
            onClick={() => !n.isRead && markAsRead(n._id)}
            className={`bg-[#1E293B] border rounded-xl p-4 cursor-pointer transition-all hover:bg-[#334155]/30
              ${n.isRead ? 'border-[#334155] opacity-60' : 'border-blue-500/30 bg-blue-500/5'}`}
          >
            <div className="flex items-start gap-3">
              <span className="text-lg">{typeIcons[n.type] || '🔔'}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className={`text-sm font-medium ${n.isRead ? 'text-slate-400' : 'text-white'}`}>{n.title}</p>
                  {!n.isRead && <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />}
                </div>
                <p className="text-sm text-slate-400 mt-0.5">{n.message}</p>
                <p className="text-xs text-slate-500 mt-1">{new Date(n.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
