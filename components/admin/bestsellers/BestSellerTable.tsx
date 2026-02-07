import React from 'react';
import { MenuItem } from '../../../types';

interface BestSellerTableProps {
    bestSellers: MenuItem[];
    onEdit: (item: MenuItem) => void;
    onDelete: (id: number) => void;
}

export const BestSellerTable: React.FC<BestSellerTableProps> = ({ bestSellers, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-right">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
                            <th className="p-6">الصورة</th>
                            <th className="p-6">الوجبة</th>
                            <th className="p-6">السعر</th>
                            <th className="p-6">التقييم / الوقت</th>
                            <th className="p-6">الشيف</th>
                            <th className="p-6">إجراءات</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-800 font-bold">
                        {bestSellers.map(item => (
                            <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="p-6">
                                    <div className="w-16 h-16 rounded-2xl bg-gray-100 overflow-hidden shadow-sm border-2 border-white">
                                        <img src={item.img || 'https://via.placeholder.com/40'} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                </td>
                                <td className="p-6">
                                    <div className="font-black text-gray-900 text-lg group-hover:text-primary transition-colors">{item.name}</div>
                                    <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded">{item.category}</span>
                                </td>
                                <td className="p-6 text-primary font-black text-xl">{item.price} ج.م</td>
                                <td className="p-6">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs text-yellow-600 flex items-center gap-1"><i className="fa-solid fa-star"></i> {item.rating || 4.9}</span>
                                        <span className="text-[10px] text-gray-400 flex items-center gap-1"><i className="fa-solid fa-clock"></i> {item.time || '45 د'}</span>
                                    </div>
                                </td>
                                <td className="p-6 text-sm text-gray-600 font-bold">شيف {item.chef}</td>
                                <td className="p-6">
                                    <div className="flex gap-2">
                                        <button onClick={() => onEdit(item)} className="text-blue-500 bg-blue-50 w-10 h-10 rounded-xl hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center shadow-sm"><i className="fa-solid fa-pen text-xs"></i></button>
                                        <button
                                            type="button"
                                            onClick={() => onDelete(item.id)}
                                            className="text-red-500 bg-red-50 w-10 h-10 rounded-xl hover:bg-red-600 hover:text-white transition-all flex items-center justify-center shadow-sm"
                                        >
                                            <i className="fa-solid fa-trash text-xs"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {bestSellers.length === 0 && (
                <div className="text-center py-24">
                    <p className="text-gray-400 font-bold">لا توجد وجبات مميزة مضافة حالياً</p>
                </div>
            )}
        </div>
    );
};
