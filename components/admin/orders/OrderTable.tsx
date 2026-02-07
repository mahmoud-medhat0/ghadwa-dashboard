import React from 'react';
import { Order } from '../../../types';

interface OrderTableProps {
    orders: Order[];
    updateOrderStatus: (id: number, status: string) => void;
    onDeleteOrder: (id: number) => void;
    onViewOrder: (order: Order) => void;
}

export const OrderTable: React.FC<OrderTableProps> = ({ orders, updateOrderStatus, onDeleteOrder, onViewOrder }) => {
    return (
        <div className="glass-card rounded-3xl overflow-hidden soft-shadow">
            <div className="overflow-x-auto">
                <table className="w-full text-right">
                    <thead className="bg-secondary text-white text-xs uppercase tracking-wider font-bold">
                        <tr>
                            <th className="p-5">#</th>
                            <th className="p-5">العميل</th>
                            <th className="p-5">التفاصيل</th>
                            <th className="p-5">الإجمالي</th>
                            <th className="p-5">الحالة</th>
                            <th className="p-5 text-center">إجراء</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {orders.map(order => (
                            <tr key={order.id} className="hover:bg-primary/5 transition-colors group">
                                <td className="p-5 font-black text-secondary">#{order.id}</td>
                                <td className="p-5">
                                    <div className="font-bold text-gray-800">{order.customer}</div>
                                    <div className="text-[10px] text-gray-400">{order.date}</div>
                                </td>
                                <td className="p-5 text-gray-600 max-w-xs truncate text-sm font-medium">{order.items}</td>
                                <td className="p-5 font-black text-primary">{order.total} ج.م</td>
                                <td className="p-5">
                                    <span className={`px-3 py-1.5 rounded-full text-[10px] font-black border ${order.status === 'delivered' ? 'bg-green-50 text-green-600 border-green-100' :
                                        order.status === 'out_for_delivery' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                            order.status === 'cooking' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                                'bg-yellow-50 text-yellow-600 border-yellow-100'
                                        }`}>
                                        {order.status === 'delivered' ? 'تم التوصيل' :
                                            order.status === 'out_for_delivery' ? 'مع الطيار' :
                                                order.status === 'cooking' ? 'جاري التحضير' : 'قيد الانتظار'}
                                    </span>
                                </td>
                                <td className="p-5 flex justify-center gap-2">
                                    <button onClick={() => onViewOrder(order)} className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center shadow-sm" title="التفاصيل">
                                        <i className="fa-solid fa-eye"></i>
                                    </button>
                                    <select
                                        value={order.status}
                                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                        className="bg-white border border-gray-200 rounded-lg px-2 py-1 text-xs focus:border-primary focus:ring-0 outline-none text-gray-700 cursor-pointer h-8"
                                    >
                                        <option value="pending">انتظار</option>
                                        <option value="cooking">تحضير</option>
                                        <option value="out_for_delivery">دليفري</option>
                                        <option value="delivered">تم</option>
                                    </select>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onDeleteOrder(order.id); }}
                                        className="w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all flex items-center justify-center shadow-sm"
                                        title="حذف"
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
