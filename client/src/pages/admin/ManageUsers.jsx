import { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import { LoadingSpinner } from '../../components';
import toast from 'react-hot-toast';
import { HiOutlineSearch, HiOutlinePencil, HiOutlineTrash, HiOutlinePlus, HiOutlineX } from 'react-icons/hi';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ role: '', search: '' });
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });
  const [modal, setModal] = useState({ open: false, mode: 'create', user: null });
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', role: 'investigator' });

  useEffect(() => { fetchUsers(); }, [page, filter]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 10, ...filter };
      Object.keys(params).forEach(k => !params[k] && delete params[k]);
      const res = await adminAPI.getUsers(params);
      setUsers(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const openCreateModal = () => {
    setFormData({ name: '', email: '', phone: '', password: '', role: 'investigator' });
    setModal({ open: true, mode: 'create', user: null });
  };

  const openEditModal = (user) => {
    setFormData({ name: user.name, email: user.email, phone: user.phone || '', role: user.role, password: '' });
    setModal({ open: true, mode: 'edit', user });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email) { toast.error('Name and email are required'); return; }
    try {
      if (modal.mode === 'create') {
        if (!formData.password) { toast.error('Password is required'); return; }
        await adminAPI.createUser(formData);
        toast.success('User created!');
      } else {
        const data = { ...formData };
        if (!data.password) delete data.password;
        await adminAPI.updateUser(modal.user._id, data);
        toast.success('User updated!');
      }
      setModal({ open: false, mode: 'create', user: null });
      fetchUsers();
    } catch (err) { toast.error(err.response?.data?.message || 'Operation failed'); }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Deactivate ${name}'s account?`)) return;
    try {
      await adminAPI.deleteUser(id);
      toast.success('Account deactivated');
      fetchUsers();
    } catch { toast.error('Failed to deactivate'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><h1 className="text-2xl font-bold text-white">👥 Manage Users</h1>
          <p className="text-slate-400 mt-1">{pagination.total} total users</p></div>
        <button onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-xl 
            hover:from-blue-500 hover:to-cyan-400 transition-all shadow-lg shadow-blue-600/20 text-sm">
          <HiOutlinePlus className="w-4 h-4" /> Add User
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text" value={filter.search}
            onChange={(e) => { setFilter({ ...filter, search: e.target.value }); setPage(1); }}
            placeholder="Search users..."
            className="pl-10 pr-4 py-2 bg-[#1E293B] border border-[#334155] rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-64"
          />
        </div>
        <select value={filter.role} onChange={(e) => { setFilter({ ...filter, role: e.target.value }); setPage(1); }}
          className="px-3 py-2 bg-[#1E293B] border border-[#334155] rounded-lg text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50">
          <option value="">All Roles</option>
          <option value="citizen">Citizen</option>
          <option value="investigator">Investigator</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#1E293B] border border-[#334155] rounded-xl overflow-hidden">
        {loading ? <LoadingSpinner /> : users.length === 0 ? (
          <div className="p-12 text-center text-slate-500">No users found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider border-b border-[#334155]">
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Phone</th>
                  <th className="px-5 py-3">Role</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Joined</th>
                  <th className="px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#334155]">
                {users.map(u => (
                  <tr key={u._id} className="hover:bg-[#334155]/30 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                          {u.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm text-white font-medium">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-300">{u.email}</td>
                    <td className="px-5 py-4 text-sm text-slate-400">{u.phone || '—'}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold capitalize
                        ${u.role === 'admin' ? 'bg-red-500/15 text-red-400 border border-red-500/30' :
                          u.role === 'investigator' ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' :
                          'bg-slate-500/15 text-slate-400 border border-slate-500/30'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${u.isActive ? 'text-emerald-400' : 'text-red-400'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${u.isActive ? 'bg-emerald-400' : 'bg-red-400'}`} />
                        {u.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-400">{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <button onClick={() => openEditModal(u)} className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded transition-colors">
                          <HiOutlinePencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(u._id, u.name)} className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors">
                          <HiOutlineTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            className="px-3 py-1.5 bg-[#1E293B] border border-[#334155] rounded-lg text-sm text-slate-300 disabled:opacity-40 hover:bg-[#334155]">← Prev</button>
          <span className="text-sm text-slate-400">Page {page} of {pagination.pages}</span>
          <button onClick={() => setPage(p => Math.min(pagination.pages, p + 1))} disabled={page === pagination.pages}
            className="px-3 py-1.5 bg-[#1E293B] border border-[#334155] rounded-lg text-sm text-slate-300 disabled:opacity-40 hover:bg-[#334155]">Next →</button>
        </div>
      )}

      {/* Create/Edit Modal */}
      {modal.open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">{modal.mode === 'create' ? '➕ Create User' : '✏️ Edit User'}</h3>
              <button onClick={() => setModal({ ...modal, open: false })} className="text-slate-400 hover:text-white"><HiOutlineX className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              {[
                { name: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
                { name: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com' },
                { name: 'phone', label: 'Phone', type: 'tel', placeholder: '9876543210' },
                ...(modal.mode === 'create' ? [{ name: 'password', label: 'Password', type: 'password', placeholder: 'Min 8 characters' }] : []),
              ].map(f => (
                <div key={f.name}>
                  <label className="block text-sm text-slate-300 mb-1">{f.label}</label>
                  <input type={f.type} value={formData[f.name]} onChange={(e) => setFormData({ ...formData, [f.name]: e.target.value })}
                    placeholder={f.placeholder}
                    className="w-full px-3 py-2.5 bg-[#0F172A] border border-[#334155] rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                </div>
              ))}
              <div>
                <label className="block text-sm text-slate-300 mb-1">Role</label>
                <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2.5 bg-[#0F172A] border border-[#334155] rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                  <option value="citizen">Citizen</option>
                  <option value="investigator">Investigator</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setModal({ ...modal, open: false })}
                  className="flex-1 py-2.5 bg-[#334155] text-slate-300 rounded-xl hover:bg-[#475569] transition-colors text-sm">Cancel</button>
                <button onClick={handleSubmit}
                  className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:from-blue-500 hover:to-cyan-400 transition-all text-sm shadow-lg shadow-blue-600/20">
                  {modal.mode === 'create' ? 'Create' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
