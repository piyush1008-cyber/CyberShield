const PriorityBadge = ({ priority }) => {
  const styles = {
    'Low': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    'Medium': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    'High': 'bg-orange-500/15 text-orange-400 border-orange-500/30',
    'Critical': 'bg-red-500/15 text-red-400 border-red-500/30'
  };

  const dots = {
    'Low': '🟢',
    'Medium': '🟡',
    'High': '🟠',
    'Critical': '🔴'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[priority] || styles['Medium']}`}>
      <span className="text-[10px]">{dots[priority] || '🟡'}</span>
      {priority}
    </span>
  );
};

export default PriorityBadge;
