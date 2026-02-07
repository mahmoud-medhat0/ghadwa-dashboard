import React from 'react';
import { MenuItem } from '../../../types';

interface MealTableProps {
    meals: MenuItem[];
    onEdit: (meal: MenuItem) => void;
    onDelete: (id: number) => void;
}

export const MealTable: React.FC<MealTableProps> = ({ meals, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-right">
                <thead className="bg-gray-50 border-b border-gray-100">
                    <tr className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
                        <th className="p-5">الصورة</th>
                        <th className="p-5">اسم الوجبة</th>
                        <th className="p-5">السعر</th>
                        <th className="p-5">القسم</th>
                        <th className="p-5">الشيف</th>
                        <th className="p-5">التصنيفات</th>
                        <th className="p-5">إجراءات</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-800 font-bold">
                    {meals.map(meal => (
                        <tr key={meal.id} className="hover:bg-gray-50 transition-colors group">
                            <td className="p-5">
                                <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden shadow-sm border border-white">
                                    {meal.img ? <img src={meal.img} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-300">🖼️</div>}
                                </div>
                            </td>
                            <td className="p-5 font-black text-gray-900 group-hover:text-primary transition-colors">{meal.name}</td>
                            <td className="p-5 text-primary font-black">{meal.price} ج.م</td>
                            <td className="p-5">
                                <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-lg text-[10px] font-black uppercase">{meal.category}</span>
                            </td>
                            <td className="p-5 text-sm text-gray-600 font-bold">شيف {meal.chef}</td>
                            <td className="p-5">
                                <div className="flex flex-wrap gap-1">
                                    {meal.tags && meal.tags.includes('healthy') && (
                                        <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded-md text-[9px] font-bold">هيلثي</span>
                                    )}
                                    {meal.tags && meal.tags.includes('frozen') && (
                                        <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-md text-[9px] font-bold">مجمدات</span>
                                    )}
                                    {(!meal.tags || (!meal.tags.includes('healthy') && !meal.tags.includes('frozen'))) && (
                                        <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md text-[9px] font-bold">وجبة عادية</span>
                                    )}
                                </div>
                            </td>
                            <td className="p-5 flex gap-2">
                                <button onClick={() => onEdit(meal)} className="text-blue-500 bg-blue-50 w-9 h-9 rounded-xl hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center shadow-sm"><i className="fa-solid fa-pen text-xs"></i></button>
                                <button
                                    onClick={() => onDelete(meal.id)}
                                    className="text-red-500 bg-red-50 w-9 h-9 rounded-xl hover:bg-red-600 hover:text-white transition-all flex items-center justify-center shadow-sm"
                                >
                                    <i className="fa-solid fa-trash text-xs"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {
                meals.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-400 font-bold">لا يوجد وجبات مضافة حتى الآن</p>
                    </div>
                )
            }
        </div >
    );
};
