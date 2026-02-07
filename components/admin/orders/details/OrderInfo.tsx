import React from 'react';
import { Order } from '../../../../types';

interface OrderInfoProps {
    order: Order;
}

export const OrderInfo: React.FC<OrderInfoProps> = ({ order }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">طلب #{order.id}</h2>
                    <p className="text-gray-500 text-sm"><i className="fa-regular fa-calendar ml-1"></i> {order.date}</p>
                </div>
                <div className="text-left">
                    <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold ${order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                            order.status === 'out_for_delivery' ? 'bg-blue-100 text-blue-700' :
                                order.status === 'cooking' ? 'bg-orange-100 text-orange-700' :
                                    'bg-yellow-100 text-yellow-700'
                        }`}>
                        {order.status === 'delivered' ? 'تم التوصيل' :
                            order.status === 'out_for_delivery' ? 'مع الطيار' :
                                order.status === 'cooking' ? 'جاري التحضير' : 'قيد الانتظار'}
                    </span>
                </div>
            </div>

            <h3 className="font-bold text-lg text-gray-900 mb-4">تفاصيل المنتجات</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-right">
                    <thead className="bg-gray-50 text-gray-600 text-sm">
                        <tr>
                            <th className="p-3 rounded-r-lg">المنتج</th>
                            <th className="p-3">الشيف</th>
                            <th className="p-3">السعر</th>
                            <th className="p-3">الكمية</th>
                            <th className="p-3 rounded-l-lg">الإجمالي</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-800 divide-y divide-gray-50">
                        {order.itemsDetails && order.itemsDetails.length > 0 ? (
                            order.itemsDetails.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="p-3 font-bold">{item.name}</td>
                                    <td className="p-3 text-sm text-gray-500">{item.chef || '-'}</td>
                                    <td className="p-3 text-sm">{item.price} ج.م</td>
                                    <td className="p-3 text-sm font-bold">{item.quantity}</td>
                                    <td className="p-3 font-bold text-[#8B2525]">{item.price * item.quantity} ج.م</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="p-4 text-center text-gray-500">
                                    {order.items} (تفاصيل غير متاحة للطلبات القديمة)
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col items-end gap-2">
                <div className="flex justify-between w-full md:w-64 text-sm text-gray-600">
                    <span>المجموع الفرعي:</span>
                    <span>{order.total - 25} ج.م</span>
                </div>
                <div className="flex justify-between w-full md:w-64 text-sm text-gray-600">
                    <span>التوصيل:</span>
                    <span>25 ج.م</span>
                </div>
                <div className="flex justify-between w-full md:w-64 font-bold text-lg text-gray-900 border-t border-gray-200 pt-2 mt-1">
                    <span>الإجمالي الكلي:</span>
                    <span className="text-[#8B2525]">{order.total} ج.م</span>
                </div>
            </div>
        </div>
    );
};
