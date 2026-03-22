const BASE_URL = 'http://127.0.0.1:8000/api/admin';

const getAuthHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
  'Content-Type': 'application/json'
});

export const adminService = {
  // Statistics
  getStats: async () => {
    const response = await fetch(`${BASE_URL}/stats/`, { headers: getAuthHeaders() });
    if (!response.ok) throw new Error('Failed to fetch stats');
    return response.json();
  },

  // Users
  getUsers: async () => {
    const response = await fetch(`${BASE_URL}/users/`, { headers: getAuthHeaders() });
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },
  deleteUser: async (id) => {
    const response = await fetch(`${BASE_URL}/users/${id}/`, { 
      method: 'DELETE', 
      headers: getAuthHeaders() 
    });
    if (!response.ok) throw new Error('Failed to delete user');
  },

  // Hotels
  getHotels: async () => {
    const response = await fetch(`${BASE_URL}/hotels/`, { headers: getAuthHeaders() });
    if (!response.ok) throw new Error('Failed to fetch hotels');
    return response.json();
  },
  saveHotel: async (hotelData, id = null) => {
    const isFormData = hotelData instanceof FormData;
    const headers = { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` };
    if (!isFormData) headers['Content-Type'] = 'application/json';

    const method = id ? 'PATCH' : 'POST';
    const url = id ? `${BASE_URL}/hotels/${id}/` : `${BASE_URL}/hotels/`;
    
    const response = await fetch(url, {
      method,
      headers,
      body: isFormData ? hotelData : JSON.stringify(hotelData)
    });
    if (!response.ok) throw new Error('Failed to save hotel');
    return response.json();
  },
  deleteHotel: async (id) => {
    const response = await fetch(`${BASE_URL}/hotels/${id}/`, { 
      method: 'DELETE', 
      headers: getAuthHeaders() 
    });
    if (!response.ok) throw new Error('Failed to delete hotel');
  },

  // Bookings
  getBookings: async () => {
    const response = await fetch(`${BASE_URL}/bookings/`, { headers: getAuthHeaders() });
    if (!response.ok) throw new Error('Failed to fetch bookings');
    return response.json();
  },
  updateBookingStatus: async (id, status) => {
    const response = await fetch(`${BASE_URL}/bookings/${id}/`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status })
    });
    if (!response.ok) throw new Error('Failed to update booking');
    return response.json();
  },

  // Contact Messages
  getContacts: async () => {
    const response = await fetch(`${BASE_URL}/contacts/`, { headers: getAuthHeaders() });
    if (!response.ok) throw new Error('Failed to fetch contact messages');
    return response.json();
  },
  deleteContact: async (id) => {
    const response = await fetch(`${BASE_URL}/contacts/${id}/`, { 
      method: 'DELETE', 
      headers: getAuthHeaders() 
    });
    if (!response.ok) throw new Error('Failed to delete message');
  }
};
