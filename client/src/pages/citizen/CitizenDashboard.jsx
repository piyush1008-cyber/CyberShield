import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '../../components';
import CitizenHome from './CitizenHome';
import FileComplaint from './FileComplaint';
import MyComplaints from './MyComplaints';
import ComplaintDetail from './ComplaintDetail';
import TrackComplaint from './TrackComplaint';
import Notifications from './Notifications';

const citizenNav = [
  { path: '/citizen/dashboard', label: 'Dashboard', icon: 'home', end: true },
  { path: '/citizen/file-complaint', label: 'File Complaint', icon: 'document' },
  { path: '/citizen/my-complaints', label: 'My Complaints', icon: 'clipboard' },
  { path: '/citizen/track', label: 'Track Complaint', icon: 'search' },
  { path: '/citizen/notifications', label: 'Notifications', icon: 'bell' },
];

const CitizenDashboard = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout navItems={citizenNav} />}>
        <Route path="dashboard" element={<CitizenHome />} />
        <Route path="file-complaint" element={<FileComplaint />} />
        <Route path="my-complaints" element={<MyComplaints />} />
        <Route path="complaints/:id" element={<ComplaintDetail />} />
        <Route path="track" element={<TrackComplaint />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>
    </Routes>
  );
};

export default CitizenDashboard;
