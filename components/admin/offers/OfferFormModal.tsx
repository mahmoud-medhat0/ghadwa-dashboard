import React from 'react';
import { AdminFormModal } from '../../Modals';
import { ImageUpload } from '../ImageUpload';
import { MenuItem, Chef } from '../../../types';

interface OfferFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    currentOffer: MenuItem | null;
    formData: any;
    setFormData: (data: any) => void;
    chefs: Chef[];
}

export const OfferFormModal: React.FC<OfferFormModalProps> = ({
    isOpen, onClose, onSubmit, currentOffer,
    formData, setFormData, chefs
}) => {
    return (
        <AdminFormModal isOpen={isOpen} onClose={onClose} title={currentOffer ? "تعديل عرض" : "إضافة عرض"} onSubmit={onSubmit}>
            <div className="space-y-4">
                <ImageUpload
                    label="صورة العرض"
                    value={formData.img}
                    onChange={(url) => setFormData({ ...formData, img: url })}
                />

                <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pr-1">اسم العرض</label>
                    <input type="text" placeholder="اسم العرض" className="w-full p-3 bg-gray-50 rounded-xl border text-gray-800 font-bold outline-none" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pr-1">السعر الجديد</label>
                        <input type="number" placeholder="السعر الجديد" className="w-full p-3 bg-gray-50 rounded-xl border text-gray-800 font-bold outline-none" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pr-1">السعر القديم</label>
                        <input type="number" placeholder="السعر القديم" className="w-full p-3 bg-gray-50 rounded-xl border text-gray-800 font-bold outline-none" value={formData.oldPrice} onChange={e => setFormData({ ...formData, oldPrice: e.target.value })} required />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pr-1">نسبة الخصم</label>
                        <input type="text" placeholder="الخصم (مثلاً 25%)" className="w-full p-3 bg-gray-50 rounded-xl border text-gray-800 font-bold outline-none" value={formData.discount} onChange={e => setFormData({ ...formData, discount: e.target.value })} required />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pr-1">تاريخ الانتهاء</label>
                        <input type="datetime-local" className="w-full p-3 bg-gray-50 rounded-xl border text-gray-800 font-bold outline-none" value={formData.expiryDate} onChange={e => setFormData({ ...formData, expiryDate: e.target.value })} required />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pr-1">الشيف</label>
                    <select className="w-full p-3 bg-gray-50 rounded-xl border font-bold text-gray-800 outline-none" value={formData.chef} onChange={e => setFormData({ ...formData, chef: e.target.value })} required>
                        <option value="" disabled>اختر الشيف</option>
                        {chefs.map(chef => <option key={chef.id} value={chef.name}>{chef.name}</option>)}
                    </select>
                </div>
            </div>
        </AdminFormModal>
    );
};
