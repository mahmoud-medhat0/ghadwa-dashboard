import React from 'react';
import { AdminFormModal } from '../../Modals';
import { Category } from '../../../types';

interface CategoryFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    currentCat: Category | null;
    formData: any;
    setFormData: (data: any) => void;
}

export const CategoryFormModal: React.FC<CategoryFormModalProps> = ({
    isOpen, onClose, onSubmit, currentCat,
    formData, setFormData
}) => {
    return (
        <AdminFormModal isOpen={isOpen} onClose={onClose} title={currentCat ? "تعديل القسم الحالي" : "إضافة قسم وتخصص جديد"} onSubmit={onSubmit}>
            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest pr-1">اسم القسم (التخصص)</label>
                    <input
                        type="text"
                        placeholder="مثال: مشويات، محاشي، فطار فلاحي"
                        className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-gray-100 text-gray-800 font-bold outline-none focus:bg-white focus:border-primary transition-all shadow-inner text-lg"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest pr-1">أيقونة القسم (كود FontAwesome)</label>
                    <div className="flex gap-4">
                        <div className="flex-1 relative">
                            <i className={`fa-solid ${formData.icon} absolute left-5 top-1/2 -translate-y-1/2 text-primary text-xl`}></i>
                            <input
                                type="text"
                                placeholder="مثال: fa-fire"
                                className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-gray-100 text-gray-800 font-bold outline-none focus:bg-white focus:border-primary transition-all shadow-inner pl-14"
                                value={formData.icon}
                                onChange={e => setFormData({ ...formData, icon: e.target.value })}
                                required
                            />
                        </div>
                        <div className="w-16 h-16 bg-primary/5 rounded-2xl border border-primary/10 flex items-center justify-center text-primary text-2xl" title="معاينة الأيقونة">
                            <i className={`fa-solid ${formData.icon}`}></i>
                        </div>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-2 mt-2">
                        <i className="fa-solid fa-circle-info text-blue-500 mt-0.5"></i>
                        <p className="text-[10px] text-blue-700 font-bold leading-relaxed">
                            يمكنك الحصول على أسماء الأيقونات من موقع FontAwesome (مثال: fa-pizza-slice, fa-burger, fa-bowl-food).
                        </p>
                    </div>
                </div>
            </div>
        </AdminFormModal>
    );
};
