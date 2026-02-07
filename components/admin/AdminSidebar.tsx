
import React from 'react';
import { NavLink } from 'react-router-dom';

interface AdminSidebarProps {
    onLogout: () => void;
    activePage?: string; // Kept for backward compatibility if needed, but styling uses NavLink
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ onLogout }) => {

    const getLinkClass = ({ isActive }: { isActive: boolean }) =>
        `relative w-full flex items-center gap-3.5 px-6 py-3.5 transition-all duration-200 font-medium text-sm
        ${isActive
            ? 'text-white bg-primary shadow-sm rounded-xl'
            : 'text-gray-400 hover:text-gray-100 hover:bg-gray-800 rounded-xl'}`;

    return (
        <div className="hidden md:flex w-72 sidebar-gradient text-white min-h-screen fixed right-0 top-0 z-50 flex-col px-6 py-8">
            <div className="px-2 pb-8 mb-4 border-b border-gray-700/50">
                <h1 className="font-black text-3xl tracking-tighter text-white">غدوة.</h1>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-1 pl-1">Admin Dashboard</p>
            </div>

            <nav className="flex-1 space-y-2 mt-2 overflow-y-auto custom-scrollbar py-2">
                <div className="px-6 py-2 text-[10px] font-black text-gray-500 uppercase tracking-widest">نظرة عامة</div>
                <NavLink to="/admin/dashboard" className={getLinkClass}>
                    <i className="fa-solid fa-chart-pie w-5"></i> الرئيسية
                </NavLink>
                <NavLink to="/admin/orders" className={getLinkClass}>
                    <i className="fa-solid fa-list-check w-5"></i> الطلبات
                </NavLink>

                <div className="px-6 py-2 mt-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">إدارة المحتوى</div>

                <NavLink to="/admin/categories" className={getLinkClass}>
                    <i className="fa-solid fa-tags w-5"></i> الأقسام
                </NavLink>
                <NavLink to="/admin/meals" className={getLinkClass}>
                    <i className="fa-solid fa-utensils w-5"></i> الوجبات
                </NavLink>
                <NavLink to="/admin/bestsellers" className={getLinkClass}>
                    <i className="fa-solid fa-crown w-5"></i> الأكثر طلباً
                </NavLink>
                <NavLink to="/admin/chefs" className={getLinkClass}>
                    <i className="fa-solid fa-users w-5"></i> الشيفات
                </NavLink>
                <NavLink to="/admin/offers" className={getLinkClass}>
                    <i className="fa-solid fa-percent w-5"></i> العروض
                </NavLink>
                <NavLink to="/admin/boxes" className={getLinkClass}>
                    <i className="fa-solid fa-box-open w-5"></i> البوكسات
                </NavLink>
                <NavLink to="/admin/frozen" className={getLinkClass}>
                    <i className="fa-solid fa-snowflake w-5"></i> المجمدات
                </NavLink>
                <NavLink to="/admin/partners" className={getLinkClass}>
                    <i className="fa-solid fa-handshake w-5"></i> الشركاء
                </NavLink>

                <div className="px-6 py-2 mt-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">النظام</div>

                <NavLink to="/admin/promos" className={getLinkClass}>
                    <i className="fa-solid fa-ticket w-5"></i> الكوبونات
                </NavLink>
                <NavLink to="/admin/menu-upload" className={getLinkClass}>
                    <i className="fa-solid fa-file-pdf w-5"></i> المنيو
                </NavLink>
            </nav>
            <div className="p-4 border-t border-white/10 bg-black/20">
                <button onClick={onLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-red-400 bg-white/5 hover:bg-red-500/10 hover:text-red-500 transition-all font-bold text-sm group">
                    <i className="fa-solid fa-right-from-bracket group-hover:-translate-x-1 transition-transform"></i> تسجيل خروج
                </button>
            </div>
        </div>
    );
};
