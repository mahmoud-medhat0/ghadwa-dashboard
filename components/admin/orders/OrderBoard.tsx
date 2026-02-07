import React from 'react';
import { Order } from '../../../types';
import { OrderCard } from './OrderCard';

interface OrderBoardProps {
    orders: Order[];
    updateOrderStatus: (id: number, status: string) => void;
    onDeleteOrder: (id: number) => void;
    onViewOrder: (order: Order) => void;
}

export const OrderBoard: React.FC<OrderBoardProps> = ({ orders, updateOrderStatus, onDeleteOrder, onViewOrder }) => {

    const renderColumn = (title: string, icon: string, status: string, bgColor: string, textColor: string) => (
        <div className="flex flex-col bg-gray-50 rounded-2xl border border-gray-200 h-full overflow-hidden">
            <div className={`p-4 border-b border-gray-200 ${bgColor} flex justify-between items-center`}>
                <h3 className={`font-bold ${textColor} flex items-center gap-2 text-sm`}>
                    <i className={icon}></i> {title}
                </h3>
                <span className={`bg-white px-2 py-1 rounded-lg text-xs font-bold ${textColor} shadow-sm border border-opacity-20`}>
                    {orders.filter(o => o.status === status).length}
                </span>
            </div>
            <div className="p-4 overflow-y-auto flex-1 custom-scrollbar space-y-3">
                {orders.filter(o => o.status === status).map(order => (
                    <OrderCard
                        key={order.id}
                        order={order}
                        updateOrderStatus={updateOrderStatus}
                        onDeleteOrder={onDeleteOrder}
                        onViewOrder={onViewOrder}
                    />
                ))}
            </div>
        </div >
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1 min-h-0">
            {renderColumn('الانتظار', 'fa-regular fa-clock', 'pending', 'bg-yellow-50', 'text-yellow-800')}
            {renderColumn('التحضير', 'fa-solid fa-fire-burner', 'cooking', 'bg-orange-50', 'text-orange-800')}
            {renderColumn('الطريق', 'fa-solid fa-motorcycle', 'out_for_delivery', 'bg-blue-50', 'text-blue-800')}
            {renderColumn('تم', 'fa-solid fa-check-double', 'delivered', 'bg-green-50', 'text-green-800')}
        </div>
    );
};
