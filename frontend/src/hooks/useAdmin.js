import { useState, useEffect } from 'react';

const useAdmin = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkAdmin = async () => {
            const token = localStorage.getItem('access_token');
            if (!token) {
                setIsAdmin(false);
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('http://127.0.0.1:8000/api/auth/profile/', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.ok) {
                    await response.json();
                    // In your model, is_staff is the source of truth for admin panel access.
                    // However, we should also check the role if needed.
                    // Based on your requirements, only is_staff (admin users) can access.
                    // Django's AbstractUser has is_staff. We'll check it from the profile if it's returned.
                    // If your UserProfileSerializer does not include is_staff, we might need to add it or use 'role'.
                    // Let's assume for now role === 'manager' or we'll update the serializer.
                    // Actually, let's assume 'manager' or check if the backend allows the dashboard stats fetch.
                    
                    const statsResp = await fetch('http://127.0.0.1:8000/api/admin/stats/', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    
                    if (statsResp.ok) {
                        setIsAdmin(true);
                    } else {
                        setIsAdmin(false);
                    }
                } else {
                    setIsAdmin(false);
                }
            } catch (err) {
                setError(err);
                setIsAdmin(false);
            } finally {
                setLoading(false);
            }
        };

        checkAdmin();
    }, []);

    return { isAdmin, loading, error };
};

export default useAdmin;
