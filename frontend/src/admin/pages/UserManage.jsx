import React, { useState, useEffect } from 'react';
import { Trash2, Mail, Phone, Loader2, Search } from 'lucide-react';
import { adminService } from '../services/adminService';

const UserManage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    try {
      const data = await adminService.getUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        await adminService.deleteUser(userId);
        setUsers(users.filter(u => u.id !== userId));
      } catch (err) {
        alert('Failed to delete user');
      }
    }
  };

  const filteredUsers = users.filter(u => 
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
      <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-4">Retrieving User Accounts...</p>
    </div>
  );

  return (
    <div className="space-y-10 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">User Management</h2>
          <p className="text-gray-500 text-lg font-medium">Manage and audit all registered StayEase accounts.</p>
        </div>
        <div className="relative w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-gray-100 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>

      <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-4 text-xs font-extrabold text-gray-400 uppercase">USER</th>
                <th className="px-8 py-4 text-xs font-extrabold text-gray-400 uppercase">CONTACT</th>
                <th className="px-8 py-4 text-xs font-extrabold text-gray-400 uppercase text-center">ROLE</th>
                <th className="px-8 py-4 text-xs font-extrabold text-gray-400 uppercase text-center">JOINED</th>
                <th className="px-8 py-4 text-xs font-extrabold text-gray-400 uppercase text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50 group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold uppercase">
                        {u.username[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{u.username}</p>
                        <p className="text-xs text-gray-500">ID: #{u.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                        <Mail size={14} className="text-blue-500" /> {u.email}
                      </div>
                      {u.phone_number && (
                        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                          <Phone size={14} className="text-blue-500" /> {u.phone_number}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      u.role === 'manager' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center text-xs text-gray-400 font-bold uppercase">
                    {new Date(u.date_joined).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button 
                      onClick={() => handleDelete(u.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete User"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManage;
