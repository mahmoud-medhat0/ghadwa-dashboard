import React from 'react';
import { AdminFormModal } from '../../Modals';
import { MenuItem, Chef } from '../../../types';

interface BestSellerFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    currentItem: MenuItem | null;
    formData: any;
    setFormData: (data: any) => void;
    chefs: Chef[];
    handleFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isProcessing: boolean;
}

export const BestSellerFormModal: React.FC<BestSellerFormModalProps> = ({
    isOpen, onClose, onSubmit, currentItem,
    formData, setFormData, chefs, handleFile, isProcessing
}) => {
    return (
        <AdminFormModal isOpen={isOpen} onClose={onClose} title={currentItem ? "تعديل وجبة مميزة" : "إضافة وجبة مميزة"} onSubmit={onSubmit}>
            <div className="space-y-6">
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-[2rem] p-6 bg-gray-50 hover:bg-gray-100 transition-colors relative group shadow-inner">
                    {isProcessing ? (
                        <div className="w-16 h-16 flex items-center justify-center text-primary mb-2"><i className="fa-solid fa-spinner animate-spin text-3xl"></i></div>
                    ) : formData.img ? (
                        <img src={formData.img} className="w-28 h-28 object-cover rounded-[1.5rem] shadow-md mb-2" />
                    ) : (
                        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-gray-300 mb-2 shadow-sm"><i className="fa-solid fa-cloud-arrow-up text-2xl"></i></div>
                    )}
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{isProcessing ? 'جاري ضغط الصورة...' : 'رفع صورة الوجبة'}</p>
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleFile} disabled={isProcessing} />
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pr-1">اسم الوجبة</label>
                    <input type="text" placeholder="اسم الوجبة" className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-200 text-gray-800 font-bold outline-none focus:bg-white focus:border-primary transition-all shadow-inner text-lg" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pr-1">السعر</label>
                        <input type="number" placeholder="السعر" className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-200 text-gray-800 font-bold outline-none focus:bg-white focus:border-primary transition-all shadow-inner" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pr-1">التصنيف</label>
                        <input type="text" placeholder="مثال: محاشي" className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-200 text-gray-800 font-bold outline-none focus:bg-white focus:border-primary transition-all shadow-inner" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} required />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pr-1">التقييم (مثلاً 4.9)</label>
                        <input type="number" step="0.1" max="5" min="1" className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-200 text-gray-800 font-bold outline-none focus:bg-white focus:border-primary transition-all shadow-inner" value={formData.rating} onChange={e => setFormData({ ...formData, rating: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pr-1">وقت التحضير (مثلاً 45 د)</label>
                        <input type="text" placeholder="45 د" className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-200 text-gray-800 font-bold outline-none focus:bg-white focus:border-primary transition-all shadow-inner" value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} required />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pr-1">الشيف</label>
                    <select
                        className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-200 font-bold text-gray-800 outline-none focus:bg-white focus:border-primary transition-all shadow-inner"
                        value={formData.chef}
                        onChange={e => setFormData({ ...formData, chef: e.target.value })}
                        required
                    >
                        <option value="" disabled>اختر الشيف</option>
                        {chefs.map(chef => (
                            <option key={chef.id} value={chef.name}>{chef.name}</option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pr-1">وصف الوجبة</label>
                    <textarea placeholder="وصف سريع للوجبة..." className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-200 h-32 text-gray-800 font-bold outline-none focus:bg-white focus:border-primary transition-all resize-none shadow-inner" value={formData.desc} onChange={e => setFormData({ ...formData, desc: e.target.value })} required></textarea>
                </div>
            </div>
        </AdminFormModal>
    );
};
