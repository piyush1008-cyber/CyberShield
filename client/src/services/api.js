// API service for making HTTP requests to the CyberShield backend
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor — attach JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle token expiry
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ============ AUTH APIs ============
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

// ============ COMPLAINT APIs ============
export const complaintAPI = {
  create: (data) => api.post('/complaints', data),
  getAll: (params) => api.get('/complaints', { params }),
  getById: (id) => api.get(`/complaints/${id}`),
  track: (trackingId) => api.get(`/complaints/track/${trackingId}`),
  update: (id, data) => api.put(`/complaints/${id}`, data),
  updateStatus: (id, data) => api.put(`/complaints/${id}/status`, data),
};

// ============ INVESTIGATION APIs ============
export const investigationAPI = {
  get: (complaintId) => api.get(`/investigations/${complaintId}`),
  addNote: (complaintId, data) => api.post(`/investigations/${complaintId}/notes`, data),
  updatePriority: (complaintId, data) => api.put(`/investigations/${complaintId}/priority`, data),
  sendMessage: (complaintId, data) => api.post(`/investigations/${complaintId}/communicate`, data),
};

// ============ ADMIN APIs ============
export const adminAPI = {
  getUsers: (params) => api.get('/admin/users', { params }),
  createUser: (data) => api.post('/admin/users', data),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  assignInvestigator: (complaintId, data) => api.put(`/admin/complaints/${complaintId}/assign`, data),
  getStats: () => api.get('/admin/stats'),
  getReports: (params) => api.get('/admin/reports', { params }),
};

// ============ NOTIFICATION APIs ============
export const notificationAPI = {
  getAll: (params) => api.get('/notifications', { params }),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
  markAllAsRead: () => api.put('/notifications/read-all'),
};

export default api;
