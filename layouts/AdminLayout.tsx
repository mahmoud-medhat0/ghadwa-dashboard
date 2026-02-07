
import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { useAuth } from '../contexts/AuthContext';

export const AdminLayout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    // Get current page name from path
    const path = location.pathname.split('/').pop() || 'dashboard';
    const activePage = `admin-${path}`;

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div className="min-h-screen bg-background flex" dir="rtl">
            <AdminSidebar activePage={activePage} onLogout={handleLogout} />
            <main className="flex-1 md:mr-72 relative transition-all duration-300">
                <div className="glass-card sticky top-4 z-40 mx-8 mt-4 rounded-2xl flex justify-between items-center px-6 py-4 mb-8">
                    <div className="flex items-center gap-2 text-secondary">
                        <i className="fa-solid fa-house-user text-primary"></i>
                        <span className="text-sm font-bold opacity-60">لوحة التحكم</span>
                        <span className="text-gray-300">/</span>
                        <span className="text-sm font-bold capitalize">{path.replace('-', ' ')}</span>
                    </div>
                </div>

                <div className="px-8 pb-12 w-full">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
