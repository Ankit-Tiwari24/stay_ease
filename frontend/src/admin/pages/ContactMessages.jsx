import React, { useState, useEffect } from 'react';
import { Mail, Trash2, Calendar, Loader2, MessageSquare, Search } from 'lucide-react';
import { adminService } from '../services/adminService';

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMessages = async () => {
    try {
      const data = await adminService.getContacts();
      setMessages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await adminService.deleteContact(id);
        setMessages(messages.filter(m => m.id !== id));
      } catch (err) {
        alert('Failed to delete message');
      }
    }
  };

  const filteredMessages = messages.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
      <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-4">Retrieving Inquiries...</p>
    </div>
  );

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div className="space-y-1">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Contact Messages</h2>
          <p className="text-gray-500 text-lg font-medium">Respond and manage community inquiries.</p>
        </div>
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search by sender or content..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-white rounded-3xl border border-gray-100 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-gray-900"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredMessages.map((m) => (
          <div key={m.id} className="bg-white rounded-[40px] p-10 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-xl hover:border-blue-100 transition-all border-l-8 border-l-blue-600 group">
             <div className="space-y-6">
                <div className="flex items-start justify-between">
                   <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 font-black tracking-widest uppercase">
                         {m.name[0]}
                      </div>
                      <div className="space-y-0.5">
                         <h4 className="text-xl font-black text-gray-900 tracking-tight uppercase leading-tight">{m.name}</h4>
                         <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                            <Mail size={12} className="text-blue-500" />
                            {m.email}
                         </div>
                      </div>
                   </div>
                   <button 
                     onClick={() => handleDelete(m.id)}
                     className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-95"
                   >
                     <Trash2 size={20} />
                   </button>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-3xl relative">
                   <div className="absolute -top-2 left-6 px-3 bg-white border border-gray-100 rounded-lg text-[10px] uppercase font-black tracking-widest text-blue-600 shadow-sm">
                      Original Message
                   </div>
                   <p className="text-gray-600 leading-relaxed font-medium">
                      {m.message}
                   </p>
                </div>
             </div>

             <div className="mt-8 pt-8 border-t border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-black uppercase text-gray-400 tracking-widest">
                   <Calendar size={14} className="text-blue-500" />
                   {new Date(m.created_at).toLocaleString()}
                </div>
                <div className="flex items-center gap-1.5 py-1 px-3 bg-blue-50 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-700 border border-blue-100">
                   <MessageSquare size={12} />
                   Awaiting Personnel
                </div>
             </div>
          </div>
        ))}
        
        {filteredMessages.length === 0 && (
           <div className="col-span-full p-32 text-center space-y-6 bg-white rounded-[60px] border-2 border-dashed border-gray-100">
              <div className="w-32 h-32 bg-gray-50 mx-auto rounded-full flex items-center justify-center text-gray-200">
                 <MessageSquare size={64} strokeWidth={1.5} />
              </div>
              <div className="space-y-2">
                 <p className="text-gray-900 font-black uppercase tracking-widest text-lg">Communication Silo Empty</p>
                 <p className="text-gray-400 font-bold tracking-tight">No active inquiries match your current parameters.</p>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default ContactMessages;
