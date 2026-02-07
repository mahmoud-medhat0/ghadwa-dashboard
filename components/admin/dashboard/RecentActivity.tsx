import React from 'react';
import { Order } from '../../../types';

interface RecentActivityProps {
    orders: Order[];
    onNavigate?: (page: string) => void;
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ orders, onNavigate }) => {
    return (
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 text-lg">
                        <i className="fa-solid fa-receipt"></i>
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-gray-900">آخر التحركات</h3>
                        <p className="text-xs font-bold text-gray-400 mt-1">أحدث عمليات تمت على المنصة</p>
                    </div>
                </div>
                <button
                    onClick={() => onNavigate && onNavigate('admin-orders')}
                    className="text-primary font-black text-sm bg-primary/5 hover:bg-primary hover:text-white px-6 py-3 rounded-2xl transition-all border border-primary/10"
                >
                    عرض جميع الطلبات
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-right">
                    <thead>
                        <tr className="bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                            <th className="p-5 rounded-r-2xl">الطلب</th>
                            <th className="p-5">العميل</th>
                            <th className="p-5">الإجمالي</th>
                            <th className="p-5">التاريخ</th>
                            <th className="p-5 rounded-l-2xl text-left">الحالة</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-800">
                        {orders.slice(0, 6).map(order => (
                            <tr key={order.id} className="text-sm hover:bg-gray-50 transition-all group">
                                <td className="p-5 font-black text-gray-900 group-hover:text-primary transition-colors">#{order.id}</td>
                                <td className="p-5">
                                    <div className="font-bold text-gray-700">{order.customer}</div>
                                    <div className="text-[10px] text-gray-400 font-medium">{order.phone}</div>
                                </td>
                                <td className="p-5 font-black text-primary">{order.total} ج.م</td>
                                <td className="p-5 text-xs font-bold text-gray-400">{order.date}</td>
                                <td className="p-5 text-left">
                                    <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-tighter border inline-block ${order.status === 'delivered' ? 'bg-green-50 text-green-600 border-green-100' :
                                        order.status === 'out_for_delivery' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                            order.status === 'cooking' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                                'bg-yellow-50 text-yellow-600 border-yellow-100'
                                        }`}>
                                        {order.status === 'delivered' ? 'مكتمل ✅' :
                                            order.status === 'out_for_delivery' ? 'في الطريق 🛵' :
                                                order.status === 'cooking' ? 'تحضير 🔥' : 'انتظار ⏳'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
