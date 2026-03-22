import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit2, Trash2, MapPin, 
  Star, Loader2, X, Camera 
} from 'lucide-react';
import { adminService } from '../services/adminService';

const HotelManage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);
  const [formData, setFormData] = useState({
    name: '', location: '', price: '', 
    star_rating: '', description: '', available: true
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const fetchHotels = async () => {
    try {
      const data = await adminService.getHotels();
      setHotels(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const resetForm = () => {
    setFormData({ name: '', location: '', price: '', star_rating: '', description: '', available: true });
    setImageFile(null);
    setPreview(null);
    setEditingHotel(null);
    setIsModalOpen(false);
  };

  const openEditModal = (hotel) => {
    setEditingHotel(hotel);
    setFormData({
      name: hotel.name,
      location: hotel.location,
      price: hotel.price,
      star_rating: hotel.star_rating,
      description: hotel.description || '',
      available: hotel.available
    });
    setPreview(hotel.image ? (hotel.image.startsWith('http') ? hotel.image : `http://127.0.0.1:8000${hotel.image}`) : null);
    setIsModalOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (imageFile) data.append('image', imageFile);

    try {
      await adminService.saveHotel(data, editingHotel?.id);
      fetchHotels();
      resetForm();
    } catch (err) {
      alert('Error saving hotel');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this hotel?')) {
      try {
        await adminService.deleteHotel(id);
        setHotels(hotels.filter(h => h.id !== id));
      } catch (err) {
        alert('Error deleting hotel');
      }
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
      <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-4">Inventory Audit In Progress...</p>
    </div>
  );

  return (
    <div className="space-y-10 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Hotel Management</h2>
          <p className="text-gray-500 text-lg font-medium">Control the StayEase luxury property portfolio.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-8 rounded-2xl shadow-lg shadow-blue-200 uppercase tracking-widest text-xs transition-all active:scale-95"
        >
          <Plus size={18} /> Add New Property
        </button>
      </div>

      <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-4 text-xs font-extrabold text-gray-400 uppercase">PROPERTY</th>
                <th className="px-8 py-4 text-xs font-extrabold text-gray-400 uppercase text-center">RATE</th>
                <th className="px-8 py-4 text-xs font-extrabold text-gray-400 uppercase text-center">RATING</th>
                <th className="px-8 py-4 text-xs font-extrabold text-gray-400 uppercase text-center">AVAILABILITY</th>
                <th className="px-8 py-4 text-xs font-extrabold text-gray-400 uppercase text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {hotels.map((h) => (
                <tr key={h.id} className="hover:bg-gray-50 group transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 bg-gray-100 rounded-xl overflow-hidden shadow-sm">
                        <img 
                          src={h.image ? (h.image.startsWith('http') ? h.image : `http://127.0.0.1:8000${h.image}`) : "/placeholder-hotel.jpg"} 
                          alt={h.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 uppercase tracking-tight">{h.name}</p>
                        <div className="flex items-center gap-1 text-[10px] text-gray-500 font-bold">
                          <MapPin size={10} className="text-blue-500" /> {h.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <p className="text-sm font-black text-gray-900 tracking-tight">₹{h.price}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">per night</p>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <div className="flex items-center justify-center gap-1.5 text-amber-500 font-black text-sm">
                      <Star size={16} fill="currentColor" strokeWidth={0} /> {h.star_rating}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      h.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {h.available ? 'Active' : 'Offline'}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2">
                       <button onClick={() => openEditModal(h)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit2 size={16} /></button>
                       <button onClick={() => handleDelete(h.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-md" onClick={resetForm}></div>
          <div className="bg-white w-full max-w-4xl rounded-[40px] shadow-2xl relative z-10 p-10 mt-auto mb-auto">
             <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-50">
                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
                  {editingHotel ? 'Refine Property' : 'Host New Property'}
                </h3>
                <button onClick={resetForm} className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"><X size={24} /></button>
             </div>
             
             <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left: Image Upload & Preview */}
                <div className="space-y-6">
                   <div className="aspect-[4/3] bg-gray-50 rounded-3xl overflow-hidden border-2 border-dashed border-gray-200 group relative">
                      {preview ? (
                        <img src={preview} alt="Upload Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                           <Camera size={48} />
                           <p className="mt-4 font-black uppercase tracking-widest text-[10px]">Upload High-Res Asset</p>
                        </div>
                      )}
                      <label className="absolute inset-0 cursor-pointer bg-gray-900/0 hover:bg-gray-900/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-all font-bold text-white uppercase text-xs">
                         Change Image
                         <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                      </label>
                   </div>
                   <p className="text-xs text-center text-gray-400 font-medium">Recommended: 1200x800px or larger. Max size 2MB.</p>
                </div>

                {/* Right: Details */}
                <div className="space-y-5">
                   <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Property Name</label>
                      <input 
                        type="text" 
                        required 
                        className="w-full px-5 py-3.5 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 transition-all outline-none font-bold"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                   </div>
                   <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Primary Location</label>
                      <input 
                        type="text" 
                        required 
                        className="w-full px-5 py-3.5 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 transition-all outline-none font-bold"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                      />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                         <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Base Rate (₹)</label>
                         <input 
                           type="number" 
                           required 
                           className="w-full px-5 py-3.5 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 transition-all outline-none font-bold"
                           value={formData.price}
                           onChange={(e) => setFormData({...formData, price: e.target.value})}
                         />
                      </div>
                      <div className="space-y-1.5">
                         <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Star Rating</label>
                         <input 
                           type="number" 
                           step="0.1" 
                           max="5" 
                           required 
                           className="w-full px-5 py-3.5 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 transition-all outline-none font-bold"
                           value={formData.star_rating}
                           onChange={(e) => setFormData({...formData, star_rating: e.target.value})}
                         />
                      </div>
                   </div>
                   <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Description (Markdown Supported)</label>
                      <textarea 
                        className="w-full px-5 py-3.5 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 transition-all outline-none font-medium text-sm h-32"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                      ></textarea>
                   </div>
                   <button 
                     type="submit" 
                     className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-100 uppercase tracking-widest text-xs transition-all active:scale-[0.98]"
                   >
                     {editingHotel ? 'Publish Updates' : 'Launch Property'}
                   </button>
                </div>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelManage;
