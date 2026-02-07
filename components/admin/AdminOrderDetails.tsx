import React from 'react';
import { Order } from '../../types';
import { OrderInfo } from './orders/details/OrderInfo';
import { CustomerInfo } from './orders/details/CustomerInfo';
import { OrderStatusUpdater } from './orders/details/OrderStatusUpdater';

interface AdminOrderDetailsProps {
    order: Order | null;
    onBack: () => void;
    updateOrderStatus: (id: number, status: string) => void;
}

export const AdminOrderDetails: React.FC<AdminOrderDetailsProps> = ({ order, onBack, updateOrderStatus }) => {
    if (!order) return null;

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
                <button onClick={onBack} className="text-gray-500 hover:text-[#8B2525] font-bold flex items-center gap-2 transition">
                    <i className="fa-solid fa-arrow-right"></i> رجوع للقائمة
                </button>
                <div className="flex gap-3">
                    <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-200 transition flex items-center gap-2">
                        <i className="fa-solid fa-print"></i> طباعة الفاتورة
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Order Info Column */}
                <div className="lg:col-span-2 space-y-6">
                    <OrderInfo order={order} />
                </div>

                {/* Customer Info & Actions Column */}
                <div className="space-y-6">
                    <CustomerInfo order={order} />
                    <OrderStatusUpdater order={order} updateOrderStatus={updateOrderStatus} />
                </div>
            </div>
        </div>
    );
};
