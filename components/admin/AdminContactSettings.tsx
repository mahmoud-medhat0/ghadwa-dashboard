
import React, { useState, useEffect } from 'react';
import { ContactSettings } from '../../types';
import { AdminFormModal } from '../Modals';
import { GHADWA_LOGO_URL } from '../UIHelpers';

interface AdminContactSettingsProps {
    settings: ContactSettings;
    onUpdate: (settings: ContactSettings) => void;
}

export const AdminContactSettings: React.FC<AdminContactSettingsProps> = ({ settings, onUpdate }) => {
    const [formData, setFormData] = useState<ContactSettings>(settings);
    const [successMessage, setSuccessMessage] = useState('');
    const [isActivating, setIsActivating] = useState(false);
    const [isLogoProcessing, setIsLogoProcessing] = useState(false);

    useEffect(() => {
        setFormData(settings);
    }, [settings]);

    const compressImage = (file: File, maxSize: number = 500): Promise<string> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > maxSize) {
                            height *= maxSize / width;
                            width = maxSize;
                        }
                    } else {
                        if (height > maxSize) {
                            width *= maxSize / height;
                            height = maxSize;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0, width, height);
                    resolve(canvas.toDataURL('image/png', 0.8));
                };
            };
        });
    };

    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIsLogoProcessing(true);
            try {
                const compressedBase64 = await compressImage(file, 400);
                setFormData(prev => ({ ...prev, logoUrl: compressedBase64 }));
            } catch (err) {
                console.error("Logo upload failed", err);
            } finally {
                setIsLogoProcessing(false);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate(formData);
        setSuccessMessage('تم تحديث الإعدادات والهوية بنجاح ✅');
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const handleSendActivation = async () => {
        setIsActivating(true);
        // Mock delay to simulate network request
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsActivating(false);

        // Always succeed in mock mode
        alert('🚀 تم إرسال رسالة التفعيل بنجاح! (محاكاة)');
    };

    return (
        <div className="space-y-6 animate-fade-in-up pb-12">
            <div className="flex justify-between items-center bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-3xl font-black text-gray-900">الإعدادات العامة ⚙️</h2>
                    <p className="text-gray-500 text-sm font-bold mt-1">تحديث الهوية، بيانات الاتصال، والإشعارات</p>
                </div>

                <button
                    onClick={handleSendActivation}
                    disabled={isActivating}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-sm transition-all shadow-lg ${isActivating ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700 shadow-green-200 active:scale-95'
                        }`}
                >
                    {isActivating ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-envelope-circle-check"></i>}
                    {isActivating ? 'جاري الإرسال...' : 'تفعيل إشعارات الطلبات'}
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Brand Identity Section */}
                <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-8 h-8 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center text-xs shadow-sm"><i className="fa-solid fa-pen-nib"></i></div>
                        <h3 className="font-black text-lg text-gray-900">هوية الموقع (Logo)</h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Upload Logo */}
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-3xl p-6 bg-gray-50 hover:bg-gray-100 transition-all cursor-pointer relative min-h-[200px]">
                            {isLogoProcessing ? (
                                <i className="fa-solid fa-spinner animate-spin text-primary text-3xl"></i>
                            ) : (
                                <>
                                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-gray-300 mb-3 shadow-sm">
                                        <i className="fa-solid fa-cloud-arrow-up text-2xl"></i>
                                    </div>
                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest text-center">اضغط لتغيير الشعار</p>
                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/png" onChange={handleLogoUpload} />
                                </>
                            )}
                        </div>

                        {/* Logo Previews */}
                        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                                <p className="text-[9px] font-black text-gray-400 uppercase mb-3">المعاينة على الهيدر</p>
                                <div className="bg-white rounded-xl h-24 flex items-center justify-center p-4 shadow-inner border border-white">
                                    <img src={formData.logoUrl || GHADWA_LOGO_URL} className="max-h-full w-auto object-contain" alt="Header Preview" />
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                                <p className="text-[9px] font-black text-gray-400 uppercase mb-3">المعاينة على الفوتر</p>
                                <div className="bg-[#0b0f1a] rounded-xl h-24 flex items-center justify-center p-4 shadow-inner">
                                    <img src={formData.logoUrl || GHADWA_LOGO_URL} className="max-h-full w-auto object-contain brightness-0 invert opacity-90" alt="Footer Preview" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Information Section */}
                <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-xs shadow-sm"><i className="fa-solid fa-headset"></i></div>
                        <h3 className="font-black text-lg text-gray-900">بيانات التواصل والفرع</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pr-2">رقم الهاتف الأساسي</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary focus:ring-0 outline-none transition-all font-bold text-gray-800 shadow-inner"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pr-2">رقم الواتساب (للاستلام)</label>
                            <input
                                type="text"
                                name="whatsapp"
                                value={formData.whatsapp}
                                onChange={handleChange}
                                className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary focus:ring-0 outline-none transition-all font-bold text-gray-800 shadow-inner"
                            />
                        </div>
// ... (inputs for email and URLs context)
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pr-2">بريد استقبال الطلبات</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email || ''}
                                onChange={handleChange}
                                dir="ltr"
                                className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary focus:ring-0 outline-none transition-all font-bold text-gray-800 shadow-inner text-right"
                                placeholder="example@ghadwa.com"
                            />
                        </div>
// ...
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pr-2">Facebook URL</label>
                                <input type="text" name="facebookUrl" value={formData.facebookUrl || ''} onChange={handleChange} dir="ltr" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary outline-none transition-all font-bold text-[11px] text-gray-800 shadow-inner text-right" placeholder="https://facebook.com/..." />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pr-2">Instagram URL</label>
                                <input type="text" name="instagramUrl" value={formData.instagramUrl || ''} onChange={handleChange} dir="ltr" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary outline-none transition-all font-bold text-[11px] text-gray-800 shadow-inner text-right" placeholder="https://instagram.com/..." />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pr-2">TikTok URL</label>
                                <input type="text" name="tiktokUrl" value={formData.tiktokUrl || ''} onChange={handleChange} dir="ltr" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary outline-none transition-all font-bold text-[11px] text-gray-800 shadow-inner text-right" placeholder="https://tiktok.com/..." />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pr-2">LinkedIn URL</label>
                                <input type="text" name="linkedinUrl" value={formData.linkedinUrl || ''} onChange={handleChange} dir="ltr" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary outline-none transition-all font-bold text-[11px] text-gray-800 shadow-inner text-right" placeholder="https://linkedin.com/..." />
                            </div>
                        </div>
                    </div>

                    <div className="pt-10 flex flex-col md:flex-row items-center gap-6">
                        <button type="submit" className="w-full md:w-auto bg-primary text-white px-12 py-4 rounded-2xl font-black text-base hover:bg-[#6b1c1c] transition-all shadow-xl shadow-primary/20 active:scale-95 flex items-center justify-center gap-3">
                            <i className="fa-solid fa-cloud-arrow-up"></i>
                            حفظ كافة التغييرات
                        </button>
                        {successMessage && <span className="text-green-600 font-black animate-fade-in flex items-center gap-2 bg-green-50 px-4 py-2 rounded-xl border border-green-100"><i className="fa-solid fa-circle-check"></i> {successMessage}</span>}
                    </div>
                </div>
            </form>
        </div>
    );
};
