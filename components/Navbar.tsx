
import React, { useState, useEffect } from 'react';
import { ContactSettings } from '../types';
import { GHADWA_LOGO_URL } from './UIHelpers';

interface NavbarProps {
    onNavigate: (page: string) => void;
    currentPage: string;
    cartCount: number;
    favoritesCount: number;
    onOpenCart: () => void;
    onOpenAuth: () => void;
    onOpenMenu: () => void;
    isLoggedIn: boolean;
    onLogout: () => void;
    isAdmin: boolean;
    contactSettings?: ContactSettings;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage, cartCount, favoritesCount, onOpenCart, onOpenAuth, onOpenMenu, isLoggedIn, onLogout, isAdmin, contactSettings }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const whatsappNumber = contactSettings?.whatsapp || "201109318581";
    const brandLogo = contactSettings?.logoUrl || GHADWA_LOGO_URL;

    const navLinks = [
        { name: 'الرئيسية', id: 'home', type: 'page', icon: 'fa-house' },
        { name: 'الشيفات', id: 'chefs', type: 'section', icon: 'fa-hat-chef' },
        { name: 'العروض', id: 'weekly-offers', type: 'section', icon: 'fa-fire' },
        { name: 'المنيو', id: 'menu', type: 'section', icon: 'fa-utensils' },
        { name: 'تتبع طلبك', id: 'track-order', type: 'page', icon: 'fa-truck-fast' },
    ];

    const handleAction = (item: any) => {
        setMobileMenuOpen(false);
        if (item.type === 'page') {
            onNavigate(item.id);
        } else {
            if (currentPage !== 'home') {
                onNavigate('home');
                setTimeout(() => {
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            } else {
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    return (
        <nav className={`fixed w-full z-[100] transition-all duration-700 ${scrolled ? 'top-0 py-2' : 'top-0 py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex justify-between items-center rounded-[2.5rem] transition-all duration-500 border border-transparent ${
                    scrolled 
                    ? 'bg-white/80 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.1)] border-white/40 px-6 py-2' 
                    : 'bg-transparent px-2 py-2'
                }`}>
                    
                    {/* Brand Logo Identity - Increased Sizing */}
                    <div className="flex items-center gap-4 cursor-pointer group" onClick={() => onNavigate('home')}>
                        <div className={`relative transition-all duration-500 ${scrolled ? 'w-32 md:w-40' : 'w-48 md:w-56'} h-16 md:h-20 flex items-center justify-center group-hover:scale-105`}>
                            <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <img 
                                src={brandLogo} 
                                alt="غدوة" 
                                className="max-h-full w-full object-contain relative z-10 drop-shadow-2xl" 
                                style={{ 
                                    filter: scrolled ? 'none' : 'brightness(0) saturate(100%) invert(21%) sepia(21%) saturate(2975%) hue-rotate(334deg) brightness(91%) contrast(92%)',
                                    transition: 'filter 0.5s ease'
                                }}
                            />
                        </div>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex items-center bg-gray-50/40 backdrop-blur-md rounded-2xl px-2 py-1.5 border border-black/5 shadow-inner">
                        {navLinks.map(link => {
                            const isActive = currentPage === link.id;
                            return (
                                <button 
                                    key={link.id} 
                                    onClick={() => handleAction(link)}
                                    className={`px-6 py-2.5 rounded-xl font-black text-xs transition-all duration-500 relative group flex items-center gap-2 ${
                                        isActive ? 'text-primary bg-white shadow-md' : 'text-gray-500 hover:text-gray-900'
                                    }`}
                                >
                                    <i className={`fa-solid ${link.icon} text-[10px] ${isActive ? 'text-primary' : 'text-gray-300 group-hover:text-primary/50'}`}></i>
                                    {link.name}
                                    {isActive && (
                                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_15px_#8B2525]"></span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Action Center */}
                    <div className="flex items-center gap-3">
                        {/* WhatsApp - Direct Support */}
                        <a 
                            href={`https://wa.me/${whatsappNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:flex relative w-11 h-11 rounded-2xl items-center justify-center transition-all duration-500 border border-black/5 bg-white text-[#25D366] group hover:bg-[#25D366] hover:text-white active:scale-90 shadow-sm"
                            title="تواصل واتساب"
                        >
                            <i className="fa-brands fa-whatsapp text-xl group-hover:rotate-12 transition-transform"></i>
                        </a>

                        {/* Admin Badge */}
                        {isAdmin && (
                            <button 
                                onClick={() => onNavigate('admin-dashboard')} 
                                className="hidden md:flex items-center justify-center w-11 h-11 bg-gray-900 text-white rounded-2xl hover:bg-primary transition-all shadow-xl hover:shadow-primary/20 active:scale-90 group"
                                title="لوحة التحكم"
                            >
                                <i className="fa-solid fa-bolt-lightning text-xs group-hover:rotate-12 transition-transform"></i>
                            </button>
                        )}

                        {/* Favorites */}
                        <button 
                            onClick={() => onNavigate('favorites')} 
                            className={`relative w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-500 border border-black/5 bg-white group hover:border-primary/20 active:scale-90 ${favoritesCount > 0 ? 'text-primary shadow-md' : 'text-gray-400'}`}
                        >
                            <i className={`${favoritesCount > 0 ? 'fa-solid' : 'fa-regular'} fa-heart text-lg group-hover:scale-110 transition-transform`}></i>
                            {favoritesCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white animate-pop-up">
                                    {favoritesCount}
                                </span>
                            )}
                        </button>

                        {/* Shopping Bag */}
                        <button 
                            onClick={onOpenCart} 
                            className="relative h-11 px-4 md:px-7 rounded-2xl bg-gray-900 text-white flex items-center gap-3 hover:bg-primary transition-all duration-500 shadow-2xl shadow-black/10 active:scale-95 group overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            <i className="fa-solid fa-basket-shopping text-base group-hover:animate-bounce"></i>
                            <span className="hidden md:block text-[11px] font-black uppercase tracking-[0.2em]">السلة</span>
                            <div className="h-4 w-px bg-white/20 hidden md:block"></div>
                            <span className="text-[11px] font-black bg-white/10 px-2 py-1 rounded-lg min-w-[24px]">
                                {cartCount}
                            </span>
                        </button>

                        {/* Mobile Toggle */}
                        <button 
                            className="lg:hidden w-11 h-11 bg-white border border-black/5 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all hover:bg-gray-50 active:scale-90" 
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <span className={`h-0.5 bg-gray-900 rounded-full transition-all duration-300 ${mobileMenuOpen ? 'w-5 rotate-45 translate-y-2' : 'w-5'}`}></span>
                            <span className={`h-0.5 bg-gray-900 rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'w-4'}`}></span>
                            <span className={`h-0.5 bg-gray-900 rounded-full transition-all duration-300 ${mobileMenuOpen ? 'w-5 -rotate-45 -translate-y-2' : 'w-3'}`}></span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden fixed inset-x-4 top-24 bg-white/95 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_40px_120px_rgba(0,0,0,0.2)] p-8 animate-pop-up border border-white/50 z-50">
                    <div className="grid grid-cols-2 gap-3 mb-8">
                        {navLinks.map(link => (
                            <button 
                                key={link.id} 
                                onClick={() => handleAction(link)}
                                className={`flex flex-col items-center justify-center gap-4 p-6 rounded-3xl border transition-all duration-300 ${
                                    currentPage === link.id 
                                    ? 'bg-primary text-white border-primary shadow-xl shadow-primary/20' 
                                    : 'bg-gray-50 text-gray-900 border-gray-100 hover:bg-gray-100'
                                }`}
                            >
                                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${currentPage === link.id ? 'bg-white/20' : 'bg-white shadow-sm'}`}>
                                    <i className={`fa-solid ${link.icon} text-base`}></i>
                                </div>
                                <span className="font-black text-[10px] uppercase tracking-tighter">{link.name}</span>
                            </button>
                        ))}
                    </div>
                    
                    <a 
                        href={`https://wa.me/${whatsappNumber}`} 
                        className="flex items-center justify-center gap-4 bg-[#25D366] text-white w-full py-5 rounded-[2rem] font-black shadow-2xl shadow-green-500/20 active:scale-95 transition-all"
                    >
                        <i className="fa-brands fa-whatsapp text-2xl"></i>
                        دعم فني مباشر
                    </a>
                </div>
            )}
        </nav>
    );
};
