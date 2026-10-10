const StatsCard = ({ title, value, icon: Icon, color = 'blue', trend, subtitle }) => {
  const colorMap = {
    blue: { icon: 'bg-blue-100 text-blue-600', trendOk: 'text-blue-600', border: 'border-slate-200' },
    green: { icon: 'bg-emerald-100 text-emerald-600', trendOk: 'text-emerald-600', border: 'border-slate-200' },
    amber: { icon: 'bg-amber-100 text-amber-600', trendOk: 'text-amber-600', border: 'border-slate-200' },
    red: { icon: 'bg-red-100 text-red-600', trendOk: 'text-red-600', border: 'border-slate-200' },
    purple: { icon: 'bg-purple-100 text-purple-600', trendOk: 'text-purple-600', border: 'border-slate-200' },
    cyan: { icon: 'bg-cyan-100 text-cyan-600', trendOk: 'text-cyan-600', border: 'border-slate-200' }
  };

  const c = colorMap[color] || colorMap.blue;

  return (
    <div className={`bg-white border ${c.border} rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden group`}>
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">{title}</p>
          <p className="text-4xl font-extrabold text-slate-900 mt-2">{value}</p>
          {subtitle && <p className="text-sm text-slate-500 mt-2 font-medium">{subtitle}</p>}
          {trend && (
            <p className={`text-sm mt-3 font-semibold ${trend > 0 ? c.trendOk : 'text-red-600'}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
            </p>
          )}
        </div>
        {Icon && (
          <div className={`w-14 h-14 ${c.icon} rounded-xl flex items-center justify-center`}>
            <Icon className="w-7 h-7" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
