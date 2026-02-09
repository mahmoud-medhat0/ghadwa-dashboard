import React from 'react';
import { AdminStatsCard } from '../../UIHelpers';

interface DashboardStatsProps {
    totalRevenue: number;
    totalOrders: number;
    chefsCount: number;
    visitorsCount: number;
    avgOrderValue: number;
    pendingOrders: number;
    completedOrders: number;
    cancelledOrders: number;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
    totalRevenue, totalOrders, chefsCount, visitorsCount,
    avgOrderValue, pendingOrders, completedOrders, cancelledOrders
}) => {
    return (
        <div className="space-y-6 mb-8">
            {/* Row 1: Main Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <AdminStatsCard title="إجمالي المبيعات" value={`${totalRevenue.toLocaleString()}`} icon="fa-solid fa-wallet" color="bg-green-100 text-green-600" />
                <AdminStatsCard title="إجمالي الطلبات" value={String(totalOrders)} icon="fa-solid fa-bag-shopping" color="bg-blue-100 text-blue-600" />
                <AdminStatsCard title="عدد الشيفات" value={String(chefsCount)} icon="fa-solid fa-user-tie" color="bg-purple-100 text-purple-600" />
                <AdminStatsCard title="زيارات الموقع" value={String(visitorsCount)} icon="fa-solid fa-users" color="bg-orange-100 text-orange-600" />
            </div>
            {/* Row 2: Order Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <AdminStatsCard title="متوسط قيمة الطلب" value={`${avgOrderValue.toLocaleString()} ج.م`} icon="fa-solid fa-chart-line" color="bg-teal-100 text-teal-600" />
                <AdminStatsCard title="طلبات في الانتظار" value={String(pendingOrders)} icon="fa-solid fa-clock" color="bg-yellow-100 text-yellow-600" />
                <AdminStatsCard title="طلبات مكتملة" value={String(completedOrders)} icon="fa-solid fa-circle-check" color="bg-emerald-100 text-emerald-600" />
                <AdminStatsCard title="طلبات ملغية" value={String(cancelledOrders)} icon="fa-solid fa-circle-xmark" color="bg-red-100 text-red-600" />
            </div>
        </div>
    );
};
