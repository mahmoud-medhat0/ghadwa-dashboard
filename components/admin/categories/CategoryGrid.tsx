import React from 'react';
import { Category } from '../../../types';

interface CategoryGridProps {
    categories: Category[];
    onEdit: (cat: Category) => void;
    onDelete: (id: number) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ categories, onEdit, onDelete }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map(cat => (
                <div key={cat.id} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm relative group hover:shadow-xl hover:border-primary/20 transition-all duration-500 overflow-hidden flex flex-col justify-between min-h-[180px]">
                    {/* Decorative background circle */}
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

                    <div className="flex items-center gap-5 relative z-10">
                        <div className="w-16 h-16 bg-gray-50 text-primary rounded-3xl flex items-center justify-center text-3xl shadow-inner border border-gray-100 group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                            <i className={`fa-solid ${cat.icon || 'fa-utensils'}`}></i>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-black text-gray-900 text-xl group-hover:text-primary transition-colors">{cat.name}</h3>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1 bg-gray-50 px-2 py-0.5 rounded w-fit">ID: #{cat.id}</p>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-dashed border-gray-100 flex gap-3 relative z-10">
                        <button
                            onClick={() => onEdit(cat)}
                            className="flex-1 py-3 bg-blue-50 text-blue-600 rounded-xl font-black text-[11px] hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 shadow-sm"
                        >
                            <i className="fa-solid fa-pen"></i> تعديل
                        </button>
                        <button
                            onClick={() => onDelete(cat.id)}
                            className="flex-1 py-3 bg-red-50 text-red-500 rounded-xl font-black text-[11px] hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2 shadow-sm"
                        >
                            <i className="fa-solid fa-trash"></i> حذف
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};
