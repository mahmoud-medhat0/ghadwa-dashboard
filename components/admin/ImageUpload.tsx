import React, { useRef, useState } from 'react';
import { uploadImage } from '../../services/api';

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    label?: string;
    className?: string;
    folder?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, label = "صورة", className = "", folder = "general" }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setIsLoading(true);
            setError(null);

            try {
                // Determine folder based on context if needed, but 'general' or specific folder passed via props is fine
                const url = await uploadImage(file, folder);
                onChange(url);
            } catch (err: any) {
                console.error("Upload failed:", err);
                setError("فشل رفع الصورة. تأكد من الإعدادات.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className={`space-y-2 ${className}`}>
            <label className="block text-sm font-bold text-gray-700">{label}</label>
            <div
                onClick={() => fileInputRef.current?.click()}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className={`
                    relative w-full h-48 rounded-xl border-2 border-dashed transition-all cursor-pointer overflow-hidden flex flex-col items-center justify-center gap-3
                    ${value ? 'border-primary/20 bg-primary/5' : 'border-gray-300 hover:border-primary hover:bg-gray-50'}
                    ${error ? 'border-red-300 bg-red-50' : ''}
                `}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                />

                {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
                        <div className="flex flex-col items-center gap-2">
                            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
                            <p className="text-xs text-primary font-bold">جاري الرفع...</p>
                        </div>
                    </div>
                ) : value ? (
                    <>
                        <img src={value} alt="Preview" className="w-full h-full object-cover" />
                        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
                            <button
                                onClick={handleRemove}
                                className="bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-transform hover:scale-110"
                            >
                                <i className="fa-solid fa-trash-can"></i>
                            </button>
                            <span className="text-white font-bold text-sm absolute bottom-4">تغيير الصورة</span>
                        </div>
                    </>
                ) : (
                    <div className="text-center p-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400 mb-2 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            <i className="fa-solid fa-cloud-arrow-up text-xl"></i>
                        </div>
                        <p className="text-gray-500 text-sm font-medium">اضغط لرفع صورة</p>
                        <p className="text-gray-400 text-xs mt-1">PNG, JPG up to 5MB</p>
                    </div>
                )}

                {error && (
                    <div className="absolute bottom-2 left-0 right-0 text-center text-[10px] text-red-500 font-bold px-2">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};
