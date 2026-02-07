import React from 'react';
import { PromoCode } from '../../../types';

interface PromoCodeListProps {
    promoCodes: PromoCode[];
    onDelete: (id: number) => void;
    onAdd: () => void;
}

export const PromoCodeList: React.FC<PromoCodeListProps> = ({ promoCodes, onDelete, onAdd }) => {
    return (
        <>
            <div className="flex justify-end">
                <button onClick={onAdd} className="bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-[#6b1c1c] transition flex items-center gap-2">
                    <i className="fa-solid fa-plus"></i> إضافة كوبون
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-right">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 text-gray-700 font-bold">التاريخ</th>
                            <th className="p-4 text-gray-700 font-bold">الكود</th>
                            <th className="p-4 text-gray-700 font-bold">القيمة</th>
                            <th className="p-4 text-gray-700 font-bold">إجراءات</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y text-gray-800">
                        {promoCodes.map(promo => (
                            <tr key={promo.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 text-xs text-gray-500">{promo.createdAt}</td>
                                <td className="p-4 font-mono font-bold text-primary">{promo.code}</td>
                                <td className="p-4 font-bold">{promo.value} {promo.type === 'percentage' ? '%' : 'ج.م'}</td>
                                <td className="p-4">
                                    <button
                                        onClick={() => onDelete(promo.id)}
                                        className="text-red-500 bg-red-50 p-2 rounded-lg hover:bg-red-100 transition"
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};
