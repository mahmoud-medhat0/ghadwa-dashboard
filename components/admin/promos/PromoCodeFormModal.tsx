import React from 'react';
import { AdminFormModal } from '../../Modals';

interface PromoCodeFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    formData: any;
    setFormData: (data: any) => void;
}

export const PromoCodeFormModal: React.FC<PromoCodeFormModalProps> = ({
    isOpen, onClose, onSubmit, formData, setFormData
}) => {
    return (
        <AdminFormModal isOpen={isOpen} onClose={onClose} title="إضافة كوبون جديد" onSubmit={onSubmit}>
            <div className="space-y-4">
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500">كود الخصم</label>
                    <input type="text" placeholder="مثال: SAVE20" className="w-full p-3 bg-gray-50 rounded-xl border uppercase font-mono" value={formData.code} onChange={e => setFormData({ ...formData, code: e.target.value.toUpperCase() })} required />
                </div>
                <div className="flex gap-4">
                    <div className="flex-1 space-y-1">
                        <label className="text-xs font-bold text-gray-500">القيمة</label>
                        <input type="number" placeholder="القيمة" className="w-full p-3 bg-gray-50 rounded-xl border" value={formData.value} onChange={e => setFormData({ ...formData, value: e.target.value })} required />
                    </div>
                    <div className="flex-1 space-y-1">
                        <label className="text-xs font-bold text-gray-500">النوع</label>
                        <select className="w-full p-3 bg-gray-50 rounded-xl border" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                            <option value="percentage">نسبة مئوية (%)</option>
                            <option value="fixed">مبلغ ثابت (ج.م)</option>
                        </select>
                    </div>
                </div>
            </div>
        </AdminFormModal>
    );
};
