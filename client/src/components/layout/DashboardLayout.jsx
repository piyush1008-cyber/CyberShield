import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  HiOutlineHome,
  HiOutlineDocumentText,
  HiOutlineClipboardList,
  HiOutlineSearch,
  HiOutlineBell,
  HiOutlineUser,
  HiOutlineLogout,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineUsers,
  HiOutlineChartBar,
  HiOutlineDocumentReport,
  HiOutlineCog,
  HiOutlineChatAlt2,
  HiOutlineFolder
} from 'react-icons/hi';

const DashboardLayout = ({ navItems }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const iconMap = {
    home: HiOutlineHome,
    document: HiOutlineDocumentText,
    clipboard: HiOutlineClipboardList,
    search: HiOutlineSearch,
    bell: HiOutlineBell,
    user: HiOutlineUser,
    users: HiOutlineUsers,
    chart: HiOutlineChartBar,
    report: HiOutlineDocumentReport,
    settings: HiOutlineCog,
    chat: HiOutlineChatAlt2,
    folder: HiOutlineFolder
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#1E293B] border-r border-[#334155] 
          transform transition-transform duration-300 ease-in-out flex flex-col
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-[#334155]">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            CS
          </div>
          <span className="text-lg font-bold text-white tracking-tight">CyberShield</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto lg:hidden text-slate-400 hover:text-white"
          >
            <HiOutlineX className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon] || HiOutlineHome;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive
                    ? 'bg-gradient-to-r from-blue-600/20 to-cyan-600/10 text-blue-400 border border-blue-500/20'
                    : 'text-slate-400 hover:bg-[#334155]/50 hover:text-slate-200'
                  }`
                }
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-blue-500/20 text-blue-400 text-xs font-semibold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* User info at bottom */}
        <div className="p-4 border-t border-[#334155]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name}</p>
              <p className="text-xs text-slate-400 capitalize">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <HiOutlineLogout className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 bg-[#1E293B]/80 backdrop-blur-xl border-b border-[#334155] flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-slate-400 hover:text-white p-1"
          >
            <HiOutlineMenu className="w-6 h-6" />
          </button>

          <div className="flex-1" />

          <div className="flex items-center gap-3">
            <button className="relative p-2 text-slate-400 hover:text-white hover:bg-[#334155] rounded-lg transition-colors">
              <HiOutlineBell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
            </button>

            <div className="relative">
              <button
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#334155] transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <span className="text-sm text-slate-300 hidden sm:block">{user?.name}</span>
              </button>

              {profileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-[#1E293B] border border-[#334155] rounded-xl shadow-xl py-1 z-50">
                  <div className="px-4 py-2 border-b border-[#334155]">
                    <p className="text-sm font-medium text-white">{user?.name}</p>
                    <p className="text-xs text-slate-400">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2"
                  >
                    <HiOutlineLogout className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
