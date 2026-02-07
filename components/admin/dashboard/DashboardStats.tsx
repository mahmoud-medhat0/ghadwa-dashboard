import React from 'react';
import { AdminStatsCard } from '../../UIHelpers';

interface DashboardStatsProps {
    totalRevenue: number;
    totalOrders: number;
    chefsCount: number;
    visitorsCount: number;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ totalRevenue, totalOrders, chefsCount, visitorsCount }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <AdminStatsCard title="إجمالي المبيعات" value={`${totalRevenue.toLocaleString()}`} icon="fa-solid fa-wallet" color="bg-green-100 text-green-600" />
            <AdminStatsCard title="إجمالي الطلبات" value={String(totalOrders)} icon="fa-solid fa-bag-shopping" color="bg-blue-100 text-blue-600" />
            <AdminStatsCard title="عدد الشيفات" value={String(chefsCount)} icon="fa-solid fa-user-tie" color="bg-purple-100 text-purple-600" />
            <AdminStatsCard title="زيارات الموقع" value={String(visitorsCount)} icon="fa-solid fa-users" color="bg-orange-100 text-orange-600" />
        </div>
    );
};
