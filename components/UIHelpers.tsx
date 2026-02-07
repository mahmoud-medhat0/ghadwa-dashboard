
import React, { useEffect, useState } from 'react';
import { CartItem, MenuItem } from '../types';

interface AddToCartButtonProps {
    item: MenuItem;
    cart: CartItem[];
    updateQuantity: (id: number, qty: number, item?: MenuItem) => void;
    className?: string;
    disabled?: boolean;
    isLarge?: boolean;
}

export const GHADWA_LOGO_URL = "https://i.ibb.co/qY7039x/ghadwa-calligraphy-logo.png";

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ item, cart, updateQuantity, className = "", disabled = false, isLarge = false }) => {
    const cartItem = cart.find(i => i.id === item.id);
    const count = cartItem ? cartItem.quantity : 0;
    const [isAnimating, setIsAnimating] = useState(false);

    const handleAdd = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsAnimating(true);
        updateQuantity(item.id, 1, item);
        setTimeout(() => setIsAnimating(false), 300);
    };

    if (disabled) {
        return (
            <div className={`bg-gray-100 text-gray-400 rounded-2xl font-black flex items-center justify-center gap-2 border border-gray-200 py-3 cursor-not-allowed select-none ${className}`}>
                <i className="fa-solid fa-door-closed text-xs"></i>
                مغلق حالياً
            </div>
        );
    }

    if (count === 0) {
        return (
            <button
                onClick={handleAdd}
                className={`bg-primary text-white rounded-2xl font-bold hover:bg-[#6b1c1c] transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 py-3 overflow-hidden relative ${isAnimating ? 'scale-105' : ''} ${className}`}
            >
                {isAnimating ? (
                    <i className="fa-solid fa-circle-check animate-pop-up"></i>
                ) : (
                    <>
                        أضف للطلب
                        <i className="fa-solid fa-plus-circle text-lg"></i>
                    </>
                )}
            </button>
        );
    }

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className={`flex items-center justify-between bg-primary text-white rounded-2xl overflow-hidden font-bold animate-pop-up ${className} ${isLarge ? 'text-lg' : ''} !p-0 h-[48px]`}
        >
            <button
                onClick={() => updateQuantity(item.id, count + 1, item)}
                className="w-1/3 h-full flex items-center justify-center hover:bg-white/10 transition-colors"
            >
                <i className="fa-solid fa-plus"></i>
            </button>
            <span className={`w-1/3 text-center ${isLarge ? 'text-xl' : 'text-base'}`}>{count}</span>
            <button
                onClick={() => updateQuantity(item.id, count - 1, item)}
                className="w-1/3 h-full flex items-center justify-center hover:bg-white/10 transition-colors"
            >
                <i className={count === 1 ? 'fa-solid fa-trash-can' : 'fa-solid fa-minus'} ></i>
            </button>
        </div>
    );
};

import { useUIStore } from '../stores/useUIStore';

export const Toast = () => {
    const { toast, hideToast } = useUIStore();

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(hideToast, 4000);
            return () => clearTimeout(timer);
        }
    }, [toast, hideToast]);

    if (!toast) return null;

    return (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-3 px-8 py-4 rounded-3xl shadow-sm animate-pop-up border border-gray-200 ${toast.type === 'success' ? 'bg-white/90 text-gray-900' : 'bg-red-50 text-red-600 border-red-100'
            }`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                <i className={`fa-solid ${toast.type === 'success' ? 'fa-check' : 'fa-xmark'}`}></i>
            </div>
            <span className="font-bold text-sm md:text-base">{toast.message}</span>
            <button onClick={hideToast} className="mr-2 text-gray-400 hover:text-gray-900 transition">
                <i className="fa-solid fa-xmark"></i>
            </button>
        </div>
    );
};

export const StatusBadge = ({ isOpen, className = "" }: { isOpen: boolean, className?: string }) => (
    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black border backdrop-blur-md ${isOpen
        ? 'bg-green-500/10 text-green-600 border-green-500/20'
        : 'bg-red-500/10 text-red-600 border-red-500/20'
        } ${className}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
        {isOpen ? 'مفتوح للطلبات' : 'مغلق حالياً'}
    </div>
);

export const SectionHeader = ({ title, subtitle, badge }: { title: string, subtitle?: string, badge?: string }) => (
    <div className="text-center mb-12 space-y-3">
        {badge && <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-black text-[10px] tracking-widest uppercase">{badge}</span>}
        <h2 className="text-2xl md:text-4xl font-black text-gray-900">{title}</h2>
        {subtitle && <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">{subtitle}</p>}
    </div>
);

interface AdminStatsCardProps {
    title: string;
    value: string;
    icon: string;
    color: string;
}

export const AdminStatsCard: React.FC<AdminStatsCardProps> = ({ title, value, icon, color }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-200 flex items-center gap-5 hover:border-gray-300 transition-colors">
        <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl shrink-0 ${color}`}>
            <i className={icon}></i>
        </div>
        <div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">{title}</p>
            <p className="text-2xl font-black text-gray-900">{value}</p>
        </div>
    </div>
);
