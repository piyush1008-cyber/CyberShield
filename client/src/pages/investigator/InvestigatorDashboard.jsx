import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '../../components';
import InvestigatorHome from './InvestigatorHome';
import AssignedCases from './AssignedCases';
import CaseDetail from './CaseDetail';

const investigatorNav = [
  { path: '/investigator/dashboard', label: 'Dashboard', icon: 'home', end: true },
  { path: '/investigator/cases', label: 'My Cases', icon: 'folder' },
  { path: '/investigator/messages', label: 'Messages', icon: 'chat' },
];

const InvestigatorDashboard = () => (
  <Routes>
    <Route element={<DashboardLayout navItems={investigatorNav} />}>
      <Route path="dashboard" element={<InvestigatorHome />} />
      <Route path="cases" element={<AssignedCases />} />
      <Route path="cases/:id" element={<CaseDetail />} />
      <Route path="messages" element={<div className="text-slate-400">Messages — integrated in Case Detail view</div>} />
    </Route>
  </Routes>
);

export default InvestigatorDashboard;
