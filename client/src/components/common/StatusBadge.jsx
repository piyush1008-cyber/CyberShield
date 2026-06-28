const StatusBadge = ({ status }) => {
  const statusStyles = {
    'Submitted': 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    'Under Review': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    'Rejected': 'bg-red-500/15 text-red-400 border-red-500/30',
    'Assigned': 'bg-violet-500/15 text-violet-400 border-violet-500/30',
    'Under Investigation': 'bg-orange-500/15 text-orange-400 border-orange-500/30',
    'Resolved': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    'Closed': 'bg-slate-500/15 text-slate-400 border-slate-500/30',
    'Active': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    'On Hold': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    'Completed': 'bg-blue-500/15 text-blue-400 border-blue-500/30'
  };

  const statusIcons = {
    'Submitted': '📩',
    'Under Review': '🔍',
    'Rejected': '❌',
    'Assigned': '📌',
    'Under Investigation': '🔎',
    'Resolved': '✅',
    'Closed': '📁',
    'Active': '🟢',
    'On Hold': '⏸️',
    'Completed': '✔️'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusStyles[status] || 'bg-slate-500/15 text-slate-400 border-slate-500/30'}`}>
      <span className="text-[10px]">{statusIcons[status] || '•'}</span>
      {status}
    </span>
  );
};

export default StatusBadge;
