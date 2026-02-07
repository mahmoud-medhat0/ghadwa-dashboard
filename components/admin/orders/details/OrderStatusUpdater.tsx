import React from 'react';
import { Order } from '../../../../types';

interface OrderStatusUpdaterProps {
    order: Order;
    updateOrderStatus: (id: number, status: string) => void;
}

export const OrderStatusUpdater: React.FC<OrderStatusUpdaterProps> = ({ order, updateOrderStatus }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4 border-b border-gray-100 pb-2">تحديث الحالة</h3>
            <div className="space-y-2">
                <button onClick={() => updateOrderStatus(order.id, 'pending')} className={`w-full py-2 px-4 rounded-lg font-bold text-sm transition text-right flex justify-between ${order.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' : 'hover:bg-gray-50 text-gray-600'}`}>
                    قيد الانتظار
                    {order.status === 'pending' && <i className="fa-solid fa-check"></i>}
                </button>
                <button onClick={() => updateOrderStatus(order.id, 'cooking')} className={`w-full py-2 px-4 rounded-lg font-bold text-sm transition text-right flex justify-between ${order.status === 'cooking' ? 'bg-orange-50 text-orange-700 border border-orange-200' : 'hover:bg-gray-50 text-gray-600'}`}>
                    جاري التحضير
                    {order.status === 'cooking' && <i className="fa-solid fa-check"></i>}
                </button>
                <button onClick={() => updateOrderStatus(order.id, 'out_for_delivery')} className={`w-full py-2 px-4 rounded-lg font-bold text-sm transition text-right flex justify-between ${order.status === 'out_for_delivery' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'hover:bg-gray-50 text-gray-600'}`}>
                    تم الاستلام من الدليفري
                    {order.status === 'out_for_delivery' && <i className="fa-solid fa-check"></i>}
                </button>
                <button onClick={() => updateOrderStatus(order.id, 'delivered')} className={`w-full py-2 px-4 rounded-lg font-bold text-sm transition text-right flex justify-between ${order.status === 'delivered' ? 'bg-green-50 text-green-700 border border-green-200' : 'hover:bg-gray-50 text-gray-600'}`}>
                    تم التوصيل
                    {order.status === 'delivered' && <i className="fa-solid fa-check"></i>}
                </button>
            </div>
        </div>
    );
};
