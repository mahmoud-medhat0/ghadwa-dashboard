import React from 'react';
import { Order } from '../../../../types';

interface CustomerInfoProps {
    order: Order;
}

export const CustomerInfo: React.FC<CustomerInfoProps> = ({ order }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4 border-b border-gray-100 pb-2">بيانات العميل</h3>
            <div className="space-y-4">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-500 shrink-0">
                        <i className="fa-solid fa-user"></i>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 font-bold mb-1">الاسم</p>
                        <p className="font-bold text-gray-900">{order.customer}</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-500 shrink-0">
                        <i className="fa-solid fa-phone"></i>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 font-bold mb-1">رقم الهاتف</p>
                        <p className="font-bold text-gray-900">{order.phone || 'غير متوفر'}</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-500 shrink-0">
                        <i className="fa-solid fa-location-dot"></i>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 font-bold mb-1">العنوان</p>
                        <p className="text-sm text-gray-700 leading-relaxed">{order.address || 'غير متوفر'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
