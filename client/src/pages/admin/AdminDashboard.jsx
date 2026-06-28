import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '../../components';
import AdminHome from './AdminHome';
import AllComplaints from './AllComplaints';
import ManageUsers from './ManageUsers';

const adminNav = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: 'home', end: true },
  { path: '/admin/complaints', label: 'All Complaints', icon: 'clipboard' },
  { path: '/admin/users', label: 'Manage Users', icon: 'users' },
];

const AdminDashboard = () => (
  <Routes>
    <Route element={<DashboardLayout navItems={adminNav} />}>
      <Route path="dashboard" element={<AdminHome />} />
      <Route path="complaints" element={<AllComplaints />} />
      <Route path="users" element={<ManageUsers />} />
    </Route>
  </Routes>
);

export default AdminDashboard;
