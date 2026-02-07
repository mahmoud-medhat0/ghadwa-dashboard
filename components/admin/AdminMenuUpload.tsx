import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as api from '../../services/api';
import { ContactSettings } from '../../types';
import { useMutations } from '../../hooks/useMutations';

export const AdminMenuUpload: React.FC = () => {
    const { data: settings } = useQuery({ queryKey: ['settings'], queryFn: api.fetchSettings });
    const mutations = useMutations();

    const [formData, setFormData] = useState<ContactSettings | null>(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (settings) {
            setFormData(settings);
        }
    }, [settings]);

    // دالة لضغط الصور برمجياً لتقليل حجم الـ Base64
    const compressImage = (file: File): Promise<string> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 1200; // تقليل العرض الأقصى لضمان حجم معقول
                    const MAX_HEIGHT = 1600;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0, width, height);

                    // تحويل الصورة لـ JPEG مع ضغط بنسبة 70%
                    const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
                    resolve(compressedBase64);
                };
            };
        });
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'breakfast' | 'lunch') => {
        const file = e.target.files?.[0];
        if (file && formData) {
            setIsProcessing(true);
            try {
                const compressedBase64 = await compressImage(file);
                if (type === 'breakfast') {
                    setFormData({ ...formData, breakfastMenuUrl: compressedBase64 });
                } else {
                    setFormData({ ...formData, lunchMenuUrl: compressedBase64 });
                }
            } catch (error) {
                console.error("Error compressing image:", error);
            } finally {
                setIsProcessing(false);
            }
        }
    };

    const handleViewCurrent = (url?: string) => {
        if (url) {
            const newWindow = window.open();
            newWindow?.document.write(`<img src="${url}" style="max-width:100%">`);
        } else {
            alert('لا توجد صورة حالية للمعاينة');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData) {
            mutations.updateSettingsMutation.mutate(formData);
            setSuccessMessage('تم تحديث المنيو بنجاح ✨');
            setTimeout(() => setSuccessMessage(''), 3000);
        }
    };

    if (!formData) return <div>تحميل...</div>;

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-900">إدارة المنيو القابل للتحميل 📄</h2>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="mb-8 p-4 bg-yellow-50 border border-yellow-100 rounded-2xl flex items-start gap-4">
                    <div className="w-10 h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center shrink-0 shadow-lg">
                        <i className="fa-solid fa-cloud-arrow-up"></i>
                    </div>
                    <div>
                        <h4 className="font-bold text-yellow-900 text-sm mb-1">رفع وتغيير المنيو</h4>
                        <p className="text-yellow-700 text-xs leading-relaxed font-medium">
                            تم إضافة ميزة <b>الضغط التلقائي</b> لضمان رفع المنيو بسرعة وبدون أخطاء. الصور تظهر للعملاء فور الحفظ.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Breakfast Menu Upload */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="flex items-center gap-2 text-sm font-black text-gray-700">
                                    <span className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600 text-xs">🥐</span>
                                    منيو الفطار
                                </label>
                                {formData.breakfastMenuUrl && (
                                    <button
                                        type="button"
                                        onClick={() => handleViewCurrent(formData.breakfastMenuUrl)}
                                        className="text-[10px] font-black text-blue-600 hover:underline"
                                    >
                                        معاينة الصورة الحالية
                                    </button>
                                )}
                            </div>

                            <div className={`relative group border-2 border-dashed border-gray-200 rounded-3xl p-6 bg-gray-50 flex flex-col items-center justify-center hover:bg-gray-100 transition-all cursor-pointer overflow-hidden aspect-video ${isProcessing ? 'opacity-50 cursor-wait' : ''}`}>
                                {formData.breakfastMenuUrl ? (
                                    <>
                                        <img src={formData.breakfastMenuUrl} className="absolute inset-0 w-full h-full object-cover opacity-30" />
                                        <div className="relative z-10 text-center bg-white/80 backdrop-blur-md p-5 rounded-3xl shadow-xl border border-white/50 transform group-hover:scale-110 transition-transform">
                                            <i className={`fa-solid ${isProcessing ? 'fa-spinner animate-spin' : 'fa-arrows-rotate'} text-primary text-3xl mb-3`}></i>
                                            <p className="text-[11px] font-black text-gray-900">
                                                {isProcessing ? 'جاري الضغط...' : 'اضغط لاستبدال المنيو الحالي'}
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center group-hover:scale-110 transition-transform">
                                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-gray-300 mx-auto mb-4 shadow-sm">
                                            <i className="fa-solid fa-image text-2xl"></i>
                                        </div>
                                        <p className="text-[11px] font-black text-gray-500">اختر صورة منيو الفطار</p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    className="absolute inset-0 opacity-0 cursor-pointer z-20"
                                    accept="image/*"
                                    onChange={(e) => handleFileUpload(e, 'breakfast')}
                                    disabled={isProcessing}
                                />
                            </div>
                        </div>

                        {/* Lunch Menu Upload */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="flex items-center gap-2 text-sm font-black text-gray-700">
                                    <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 text-xs">🍗</span>
                                    منيو الغداء
                                </label>
                                {formData.lunchMenuUrl && (
                                    <button
                                        type="button"
                                        onClick={() => handleViewCurrent(formData.lunchMenuUrl)}
                                        className="text-[10px] font-black text-blue-600 hover:underline"
                                    >
                                        معاينة الصورة الحالية
                                    </button>
                                )}
                            </div>

                            <div className={`relative group border-2 border-dashed border-gray-200 rounded-3xl p-6 bg-gray-50 flex flex-col items-center justify-center hover:bg-gray-100 transition-all cursor-pointer overflow-hidden aspect-video ${isProcessing ? 'opacity-50 cursor-wait' : ''}`}>
                                {formData.lunchMenuUrl ? (
                                    <>
                                        <img src={formData.lunchMenuUrl} className="absolute inset-0 w-full h-full object-cover opacity-30" />
                                        <div className="relative z-10 text-center bg-white/80 backdrop-blur-md p-5 rounded-3xl shadow-xl border border-white/50 transform group-hover:scale-110 transition-transform">
                                            <i className={`fa-solid ${isProcessing ? 'fa-spinner animate-spin' : 'fa-arrows-rotate'} text-primary text-3xl mb-3`}></i>
                                            <p className="text-[11px] font-black text-gray-900">
                                                {isProcessing ? 'جاري الضغط...' : 'اضغط لاستبدال المنيو الحالي'}
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center group-hover:scale-110 transition-transform">
                                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-gray-300 mx-auto mb-4 shadow-sm">
                                            <i className="fa-solid fa-image text-2xl"></i>
                                        </div>
                                        <p className="text-[11px] font-black text-gray-500">اختر صورة منيو الغداء</p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    className="absolute inset-0 opacity-0 cursor-pointer z-20"
                                    accept="image/*"
                                    onChange={(e) => handleFileUpload(e, 'lunch')}
                                    disabled={isProcessing}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-gray-50 flex items-center gap-4">
                        <button
                            type="submit"
                            disabled={isProcessing}
                            className="bg-primary text-white px-10 py-4 rounded-[2rem] font-black text-lg shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:bg-gray-400"
                        >
                            <i className="fa-solid fa-floppy-disk"></i>
                            تأكيد وحفظ التعديلات
                        </button>
                        {successMessage && <span className="text-green-600 font-black animate-fade-in text-sm">{successMessage}</span>}
                    </div>
                </form>
            </div>
        </div>
    );
};
