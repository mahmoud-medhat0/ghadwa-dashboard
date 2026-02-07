import React, { useState, useEffect } from 'react';
import { AdminFormModal } from '../../Modals';
import { ImageUpload } from '../ImageUpload';
import { Chef, Category } from '../../../types';

interface ChefFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    initialData: Chef | null;
    categories: Category[];
    formData: any;
    setFormData: (data: any) => void;
}

export const ChefFormModal: React.FC<ChefFormModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    categories,
    formData,
    setFormData
}) => {

    // Reset form when modal opens specifically for new entries is handled by parent,
    // but we can ensure clean state here if needed.
    // Parent controls formData state to share with submission logic.

    return (
        <AdminFormModal
            isOpen={isOpen}
            onClose={onClose}
            title={initialData ? "تعديل بيانات الشيف" : "إضافة شيف جديد"}
            onSubmit={onSubmit}
        >
            <div className="grid grid-cols-2 gap-4 mb-4">
                <ImageUpload
                    label="صورة البروفايل"
                    value={formData.img}
                    onChange={(url) => setFormData({ ...formData, img: url })}
                    className="h-full"
                />
                <ImageUpload
                    label="صورة الغلاف"
                    value={formData.cover}
                    onChange={(url) => setFormData({ ...formData, cover: url })}
                    className="h-full"
                />
            </div>

            <div className="space-y-1">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pr-1">اسم الشيف</label>
                <input type="text" placeholder="مثال: ماما فاطمة" className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-gray-800 font-bold outline-none focus:bg-white focus:border-primary transition-all shadow-inner" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
            </div>

            <div className="space-y-1">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pr-1">التخصص (القسم)</label>
                <select
                    className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-gray-800 font-bold outline-none focus:bg-white focus:border-primary transition-all shadow-inner"
                    value={formData.specialty}
                    onChange={e => setFormData({ ...formData, specialty: e.target.value })}
                    required
                >
                    <option value="" disabled>اختر التخصص</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pr-1">ساعات العمل</label>
                    <input type="text" placeholder="10 ص - 10 م" className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-gray-800 font-bold outline-none focus:bg-white focus:border-primary transition-all shadow-inner" value={formData.workingHours} onChange={e => setFormData({ ...formData, workingHours: e.target.value })} required />
                </div>
                <div className="space-y-1">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pr-1">وقت التوصيل</label>
                    <input type="text" placeholder="60 دقيقة" className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-gray-800 font-bold outline-none focus:bg-white focus:border-primary transition-all shadow-inner" value={formData.deliveryTime} onChange={e => setFormData({ ...formData, deliveryTime: e.target.value })} required />
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pr-1">نبذة قصيرة</label>
                <textarea placeholder="تكلم عن خبرة الشيف..." className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 h-20 text-gray-800 font-bold outline-none focus:bg-white focus:border-primary transition-all resize-none shadow-inner" value={formData.bio} onChange={e => setFormData({ ...formData, bio: e.target.value })}></textarea>
            </div>
        </AdminFormModal>
    );
};
