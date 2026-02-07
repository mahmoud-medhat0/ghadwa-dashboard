import React from 'react';
import { MenuItem } from '../../../types';

interface OfferTableProps {
    offers: MenuItem[];
    onEdit: (offer: MenuItem) => void;
    onDelete: (id: number) => void;
}

export const OfferTable: React.FC<OfferTableProps> = ({ offers, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-right">
                <thead className="bg-gray-50 border-b">
                    <tr className="text-gray-700 font-bold">
                        <th className="p-4">الصورة</th>
                        <th className="p-4">العرض</th>
                        <th className="p-4">السعر</th>
                        <th className="p-4">الشيف</th>
                        <th className="p-4">إجراءات</th>
                    </tr>
                </thead>
                <tbody className="divide-y text-gray-800 font-bold">
                    {offers.map(offer => (
                        <tr key={offer.id} className="hover:bg-gray-50">
                            <td className="p-4"><img src={offer.img || 'https://via.placeholder.com/150'} className="w-16 h-12 rounded object-cover" /></td>
                            <td className="p-4">
                                <p className="font-bold text-gray-900">{offer.name}</p>
                                <span className="text-[10px] bg-red-100 text-red-600 px-2 rounded">{offer.discount}</span>
                            </td>
                            <td className="p-4">
                                <span className="text-green-600 font-bold">{offer.price}</span>
                                <span className="text-gray-400 text-xs line-through mx-1">{offer.oldPrice}</span>
                            </td>
                            <td className="p-4 text-sm text-gray-600">{offer.chef}</td>
                            <td className="p-4 flex gap-2">
                                <button onClick={() => onEdit(offer)} className="text-blue-500 bg-blue-50 p-2 rounded-lg"><i className="fa-solid fa-pen"></i></button>
                                <button onClick={() => onDelete(offer.id)} className="text-red-500 bg-red-50 p-2 rounded-lg"><i className="fa-solid fa-trash"></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
