import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import CyberSOSModal from '../common/CyberSOSModal';
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
  const [sosModalOpen, setSosModalOpen] = useState(false);

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
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 
          transform transition-transform duration-300 ease-in-out flex flex-col
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo */}
        <div className="h-20 flex items-center gap-4 px-6 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-blue-500/20">
            CS
          </div>
          <span className="text-xl font-extrabold text-slate-900 tracking-tight">CyberShield</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto lg:hidden text-slate-500 hover:text-slate-900"
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
                  `flex items-center gap-4 px-4 py-3.5 rounded-xl text-base font-semibold transition-all duration-300
                  ${isActive
                    ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
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
        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-slate-900 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">{user?.name}</p>
              <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 font-medium transition-colors"
          >
            <HiOutlineLogout className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-20 bg-white/90 backdrop-blur-2xl border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30 shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-slate-500 hover:text-slate-900 p-1"
          >
            <HiOutlineMenu className="w-6 h-6" />
          </button>

          <div className="flex-1" />

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSosModalOpen(true)}
              className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 font-bold px-4 py-2 rounded-xl transition-colors border border-red-200 mr-2 shadow-sm"
            >
              <span className="animate-pulse">🚨</span>
              <span className="hidden sm:inline">Cyber SOS</span>
            </button>

            <button className="relative p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
              <HiOutlineBell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="relative">
              <button
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
              >
                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-sm">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <span className="text-base font-semibold text-slate-800 hidden sm:block">{user?.name}</span>
              </button>

              {profileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-50">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-sm font-bold text-slate-900">{user?.name}</p>
                    <p className="text-xs text-slate-500">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 mt-1 text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-2"
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

      {/* Cyber SOS Modal */}
      <CyberSOSModal isOpen={sosModalOpen} onClose={() => setSosModalOpen(false)} />
    </div>
  );
};

export default DashboardLayout;
