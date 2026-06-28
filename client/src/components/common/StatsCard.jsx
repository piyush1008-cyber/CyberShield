const StatsCard = ({ title, value, icon: Icon, color = 'blue', trend, subtitle }) => {
  const colorMap = {
    blue: { bg: 'from-blue-600/20 to-blue-600/5', border: 'border-blue-500/20', text: 'text-blue-400', icon: 'from-blue-500 to-blue-600' },
    green: { bg: 'from-emerald-600/20 to-emerald-600/5', border: 'border-emerald-500/20', text: 'text-emerald-400', icon: 'from-emerald-500 to-emerald-600' },
    amber: { bg: 'from-amber-600/20 to-amber-600/5', border: 'border-amber-500/20', text: 'text-amber-400', icon: 'from-amber-500 to-amber-600' },
    red: { bg: 'from-red-600/20 to-red-600/5', border: 'border-red-500/20', text: 'text-red-400', icon: 'from-red-500 to-red-600' },
    purple: { bg: 'from-violet-600/20 to-violet-600/5', border: 'border-violet-500/20', text: 'text-violet-400', icon: 'from-violet-500 to-violet-600' },
    cyan: { bg: 'from-cyan-600/20 to-cyan-600/5', border: 'border-cyan-500/20', text: 'text-cyan-400', icon: 'from-cyan-500 to-cyan-600' }
  };

  const c = colorMap[color] || colorMap.blue;

  return (
    <div className={`bg-gradient-to-br ${c.bg} border ${c.border} rounded-xl p-5 hover:scale-[1.02] transition-all duration-300`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400 font-medium">{title}</p>
          <p className="text-3xl font-bold text-white mt-1">{value}</p>
          {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
          {trend && (
            <p className={`text-xs mt-2 ${trend > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
            </p>
          )}
        </div>
        {Icon && (
          <div className={`w-10 h-10 bg-gradient-to-br ${c.icon} rounded-lg flex items-center justify-center`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
