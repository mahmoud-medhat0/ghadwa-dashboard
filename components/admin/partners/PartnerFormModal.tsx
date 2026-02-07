import React from 'react';
import { AdminFormModal } from '../../Modals';
import { ImageUpload } from '../ImageUpload';

interface PartnerFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    formData: any;
    setFormData: (data: any) => void;
}

export const PartnerFormModal: React.FC<PartnerFormModalProps> = ({
    isOpen, onClose, onSubmit, formData, setFormData
}) => {
    return (
        <AdminFormModal isOpen={isOpen} onClose={onClose} title="إضافة شريك جديد" onSubmit={onSubmit}>
            <div className="space-y-4">
                <ImageUpload
                    label="لوجو الشريك"
                    value={formData.logo}
                    onChange={(url) => setFormData({ ...formData, logo: url })}
                />
                <input type="text" placeholder="اسم الشريك" className="w-full p-3 bg-gray-50 rounded-xl border" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
            </div>
        </AdminFormModal>
    );
};
