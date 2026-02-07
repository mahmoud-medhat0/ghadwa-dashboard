
import React, { useState, useEffect } from 'react';
import { ContactSettings } from '../../types';
import { GHADWA_LOGO_URL } from '../UIHelpers';

interface AdminLogoSettingsProps {
    settings: ContactSettings;
    onUpdate: (settings: ContactSettings) => void;
}

export const AdminLogoSettings: React.FC<AdminLogoSettingsProps> = ({ settings, onUpdate }) => {
    const [logoPreview, setLogoPreview] = useState<string>(settings.logoUrl || GHADWA_LOGO_URL);
    const [isProcessing, setIsProcessing] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (settings.logoUrl) setLogoPreview(settings.logoUrl);
    }, [settings]);

    const compressLogo = (file: File): Promise<string> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_SIZE = 500; // اللوجو لا يحتاج أبعاد ضخمة
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_SIZE) {
                            height *= MAX_SIZE / width;
                            width = MAX_SIZE;
                        }
                    } else {
                        if (height > MAX_SIZE) {
                            width *= MAX_SIZE / height;
                            height = MAX_SIZE;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0, width, height);
                    resolve(canvas.toDataURL('image/png', 0.8)); // PNG للحفاظ على الشفافية
                };
            };
        });
    };

    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIsProcessing(true);
            try {
                const compressedBase64 = await compressLogo(file);
                setLogoPreview(compressedBase64);
                const newSettings = { ...settings, logoUrl: compressedBase64 };
                onUpdate(newSettings);
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
            } catch (err) {
                console.error("Logo upload failed", err);
            } finally {
                setIsProcessing(false);
            }
        }
    };

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex justify-between items-center bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-3xl font-black text-gray-900">إعدادات الهوية ✨</h2>
                    <p className="text-gray-500 text-sm font-bold mt-1">تحكم في شعار (Logo) البراند الخاص بك</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Upload Card */}
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-10 flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center text-primary text-3xl mb-8 shadow-inner">
                        <i className="fa-solid fa-pen-nib"></i>
                    </div>
                    
                    <h3 className="text-xl font-black text-gray-900 mb-2">تغيير الشعار</h3>
                    <p className="text-gray-400 text-xs font-bold mb-10 max-w-[280px] leading-relaxed">يرجى رفع شعار بخلفية شفافة (PNG) لضمان أفضل ظهور على كافة الخلفيات.</p>

                    <div className="relative group w-full max-w-[240px]">
                        <div className={`border-2 border-dashed border-gray-200 rounded-[2rem] p-8 bg-gray-50 group-hover:bg-gray-100 group-hover:border-primary/30 transition-all cursor-pointer relative overflow-hidden aspect-square flex items-center justify-center ${isProcessing ? 'opacity-50' : ''}`}>
                            {isProcessing ? (
                                <i className="fa-solid fa-spinner animate-spin text-primary text-3xl"></i>
                            ) : (
                                <div className="text-center">
                                    <i className="fa-solid fa-cloud-arrow-up text-gray-300 text-4xl mb-4 group-hover:scale-110 transition-transform"></i>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">اضغط للرفع</p>
                                </div>
                            )}
                            <input 
                                type="file" 
                                className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                                accept="image/*" 
                                onChange={handleLogoUpload}
                                disabled={isProcessing}
                            />
                        </div>
                    </div>
                    
                    {success && (
                        <p className="mt-6 text-green-600 font-black text-xs animate-bounce flex items-center gap-2">
                            <i className="fa-solid fa-circle-check"></i>
                            تم تحديث اللوجو بنجاح!
                        </p>
                    )}
                </div>

                {/* Preview Cards */}
                <div className="space-y-6">
                    {/* Header Preview */}
                    <div className="bg-white rounded-[2rem] border border-gray-100 p-6">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">معاينة في الهيدر (خلفية بيضاء)</p>
                        <div className="bg-white border border-gray-50 rounded-2xl p-6 flex justify-center shadow-inner">
                            <img src={logoPreview} alt="Header Preview" className="h-14 w-auto object-contain" />
                        </div>
                    </div>

                    {/* Footer Preview */}
                    <div className="bg-white rounded-[2rem] border border-gray-100 p-6">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">معاينة في الفوتر (خلفية داكنة)</p>
                        <div className="bg-[#0b0f1a] rounded-2xl p-6 flex justify-center shadow-inner">
                            <img src={logoPreview} alt="Footer Preview" className="h-14 w-auto object-contain brightness-0 invert opacity-90" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
