import React from 'react';
import { AdminFormModal } from '../../Modals';
import { ImageUpload } from '../ImageUpload';
import { Box, Chef } from '../../../types';

interface BoxFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    currentBox: Box | null;
    formData: any;
    setFormData: (data: any) => void;
    chefs: Chef[];
}

export const BoxFormModal: React.FC<BoxFormModalProps> = ({
    isOpen, onClose, onSubmit, currentBox,
    formData, setFormData, chefs
}) => {
    return (
        <AdminFormModal isOpen={isOpen} onClose={onClose} title={currentBox ? "تعديل بوكس" : "إضافة بوكس جديد"} onSubmit={onSubmit}>
            <div className="space-y-4">
                <ImageUpload
                    label="صورة البوكس"
                    value={formData.img}
                    onChange={(url) => setFormData({ ...formData, img: url })}
                />
                <input type="text" placeholder="اسم البوكس" className="w-full p-3 bg-gray-50 rounded-xl border" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                <div className="grid grid-cols-2 gap-4">
                    <input type="number" placeholder="السعر" className="w-full p-3 bg-gray-50 rounded-xl border" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required />
                    <input type="text" placeholder="عدد الأفراد" className="w-full p-3 bg-gray-50 rounded-xl border" value={formData.serves} onChange={e => setFormData({ ...formData, serves: e.target.value })} required />
                </div>
                <select className="w-full p-3 bg-gray-50 rounded-xl border font-bold" value={formData.chef} onChange={e => setFormData({ ...formData, chef: e.target.value })} required>
                    <option value="" disabled>اختر الشيف</option>
                    {chefs.map(chef => <option key={chef.id} value={chef.name}>{chef.name}</option>)}
                </select>
                <textarea placeholder="مكونات البوكس (افصل بينهم بفاصلة ,)" className="w-full p-3 bg-gray-50 rounded-xl border h-24" value={formData.itemsString} onChange={e => setFormData({ ...formData, itemsString: e.target.value })} required></textarea>
            </div>
        </AdminFormModal>
    );
};
