import React from 'react';
import { AdminFormModal } from '../../Modals';
import { ImageUpload } from '../ImageUpload';
import { MenuItem, Chef, Category } from '../../../types';

interface MealFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    currentMeal: MenuItem | null;
    formData: any;
    setFormData: (data: any) => void;
    categories: Category[];
    chefs: Chef[];
}

export const MealFormModal: React.FC<MealFormModalProps> = ({
    isOpen, onClose, onSubmit, currentMeal,
    formData, setFormData, categories, chefs
}) => {
    return (
        <AdminFormModal isOpen={isOpen} onClose={onClose} title={currentMeal ? "تعديل الوجبة" : "إضافة وجبة جديدة"} onSubmit={onSubmit}>
            <div className="space-y-4">
                {/* Image Upload Area */}
                <ImageUpload
                    label="صورة الوجبة"
                    value={formData.img}
                    onChange={(url) => setFormData({ ...formData, img: url })}
                />

                <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pr-1">اسم الوجبة</label>
                    <input type="text" placeholder="مثال: محشي ورق عنب" className="w-full p-3.5 bg-gray-50 rounded-2xl border border-gray-200 text-gray-800 font-bold outline-none focus:bg-white focus:border-primary transition-all shadow-inner" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pr-1">وصف الوجبة</label>
                    <textarea
                        placeholder="اكتب مكونات الوجبة وتفاصيلها..."
                        className="w-full p-3.5 bg-gray-50 rounded-2xl border border-gray-200 text-gray-800 font-bold outline-none focus:bg-white focus:border-primary transition-all shadow-inner h-24 resize-none"
                        value={formData.desc}
                        onChange={e => setFormData({ ...formData, desc: e.target.value })}
                        required
                    ></textarea>
                    <p className="text-[9px] text-gray-400 font-bold mr-1">سيظهر هذا الوصف للعملاء في الكارد الأساسي.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pr-1">السعر (ج.م)</label>
                        <input type="number" placeholder="150" className="w-full p-3.5 bg-gray-50 rounded-2xl border border-gray-200 text-gray-800 font-bold outline-none focus:bg-white focus:border-primary transition-all shadow-inner" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pr-1">وقت التحضير</label>
                        <input type="text" placeholder="45 دقيقة" className="w-full p-3.5 bg-gray-50 rounded-2xl border border-gray-200 text-gray-800 font-bold outline-none focus:bg-white focus:border-primary transition-all shadow-inner" value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} required />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pr-1">القسم</label>
                        <select
                            className="w-full p-3.5 bg-gray-50 rounded-2xl border border-gray-200 text-gray-800 font-bold outline-none focus:bg-white focus:border-primary transition-all shadow-inner"
                            value={formData.category}
                            onChange={e => {
                                const selectedCat = categories.find(c => c.name === e.target.value);
                                setFormData({
                                    ...formData,
                                    category: e.target.value,
                                    categoryId: selectedCat?.id
                                });
                            }}
                            required
                        >
                            <option value="" disabled>اختر القسم</option>
                            {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pr-1">الشيف المسئول</label>
                        <select
                            className="w-full p-3.5 bg-gray-50 rounded-2xl border border-gray-200 text-gray-800 font-bold outline-none focus:bg-white focus:border-primary transition-all shadow-inner"
                            value={formData.chef}
                            onChange={e => {
                                const selectedChef = chefs.find(c => c.name === e.target.value);
                                setFormData({
                                    ...formData,
                                    chef: e.target.value,
                                    chefId: selectedChef?.id
                                });
                            }}
                            required
                        >
                            <option value="" disabled>اختر الشيف</option>
                            {chefs.map(chef => <option key={chef.id} value={chef.name}>{chef.name}</option>)}
                        </select>
                    </div>
                </div>
                <div className="space-y-2 pt-2 border-t border-gray-100">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pr-1">تصنيفات إضافية (اختياري)</label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer bg-green-50 px-4 py-2 rounded-xl border border-green-100 hover:bg-green-100 transition-all">
                            <input
                                type="checkbox"
                                className="accent-green-600 w-4 h-4"
                                checked={formData.tags?.includes('healthy')}
                                onChange={e => {
                                    const currentTags = formData.tags || [];
                                    if (e.target.checked) {
                                        setFormData({ ...formData, tags: [...currentTags, 'healthy'] });
                                    } else {
                                        setFormData({ ...formData, tags: currentTags.filter((t: string) => t !== 'healthy') });
                                    }
                                }}
                            />
                            <span className="text-sm font-bold text-green-700">هيلثي & دايت 🥗</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer bg-blue-50 px-4 py-2 rounded-xl border border-blue-100 hover:bg-blue-100 transition-all">
                            <input
                                type="checkbox"
                                className="accent-blue-600 w-4 h-4"
                                checked={formData.tags?.includes('frozen')}
                                onChange={e => {
                                    const currentTags = formData.tags || [];
                                    if (e.target.checked) {
                                        setFormData({ ...formData, tags: [...currentTags, 'frozen'] });
                                    } else {
                                        setFormData({ ...formData, tags: currentTags.filter((t: string) => t !== 'frozen') });
                                    }
                                }}
                            />
                            <span className="text-sm font-bold text-blue-700">مجمدات وتجهيز ❄️</span>
                        </label>
                    </div>
                </div>
            </div>
        </AdminFormModal>
    );
};
