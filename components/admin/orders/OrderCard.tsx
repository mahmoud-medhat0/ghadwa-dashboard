import React from 'react';
import { Order } from '../../../types';

interface OrderCardProps {
    order: Order;
    updateOrderStatus: (id: number, status: string) => void;
    onDeleteOrder: (id: number) => void;
    onViewOrder: (order: Order) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, updateOrderStatus, onDeleteOrder, onViewOrder }) => (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition mb-3 group animate-fade-in">
        <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded text-xs">#{order.id}</span>
                <span className="text-[10px] text-gray-400">{order.date}</span>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => onViewOrder(order)} className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 text-xs" title="التفاصيل">
                    <i className="fa-solid fa-eye"></i>
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); onDeleteOrder(order.id); }}
                    className="w-6 h-6 rounded-full bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 text-xs"
                    title="حذف"
                >
                    <i className="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>

        <h4 className="font-bold text-gray-800 mb-1 text-sm">{order.customer}</h4>
        <p className="text-xs text-gray-500 mb-3 line-clamp-2 leading-relaxed">{order.items}</p>

        <div className="flex justify-between items-center pt-3 border-t border-dashed border-gray-100 mt-2">
            <span className="font-black text-[#8B2525]">{order.total} ج.م</span>

            {order.status === 'pending' && (
                <button
                    onClick={() => updateOrderStatus(order.id, 'cooking')}
                    className="bg-orange-100 text-orange-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-orange-200 transition flex items-center gap-1"
                >
                    بدء التحضير <i className="fa-solid fa-fire-burner"></i>
                </button>
            )}
            {order.status === 'cooking' && (
                <button
                    onClick={() => updateOrderStatus(order.id, 'out_for_delivery')}
                    className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-200 transition flex items-center gap-1"
                >
                    تسليم للطيار <i className="fa-solid fa-motorcycle"></i>
                </button>
            )}
            {order.status === 'out_for_delivery' && (
                <button
                    onClick={() => updateOrderStatus(order.id, 'delivered')}
                    className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-200 transition flex items-center gap-1"
                >
                    تم التوصيل <i className="fa-solid fa-check"></i>
                </button>
            )}
            {order.status === 'delivered' && (
                <span className="text-green-600 text-xs font-bold flex items-center gap-1">
                    <i className="fa-solid fa-circle-check"></i> مكتمل
                </span>
            )}
        </div>
    </div>
);
