import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as api from '../../services/api';
import { DashboardStats } from './dashboard/DashboardStats';
import { SalesChart } from './dashboard/SalesChart';
import { TopChefs } from './dashboard/TopChefs';
import { RecentActivity } from './dashboard/RecentActivity';
import { Loading } from '../../components/Loading';

export const AdminDashboard: React.FC = () => {
    // Internal Data Fetching
    const { data: stats, isLoading: statsLoading } = useQuery({ queryKey: ['dashboardStats'], queryFn: api.fetchDashboardStats });
    const { data: orders = [], isLoading: ordersLoading } = useQuery({ queryKey: ['orders'], queryFn: api.fetchOrders });
    const { data: chefs = [], isLoading: chefsLoading } = useQuery({ queryKey: ['chefs'], queryFn: api.fetchChefs });

    // Helper for dates
    const getDaysAgoDate = (days: number) => {
        const d = new Date();
        d.setDate(d.getDate() - days);
        return d.toISOString().split('T')[0];
    };

    const analytics = useMemo(() => {
        const todayStr = new Date().toISOString().split('T')[0];
        const sevenDaysAgo = getDaysAgoDate(7);
        const fourteenDaysAgo = getDaysAgoDate(14);
        const thirtyDaysAgo = getDaysAgoDate(30);

        const currentWeekOrders = orders.filter(o => o.date >= sevenDaysAgo && o.date <= todayStr);
        const currentWeekTotal = currentWeekOrders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);

        const lastWeekOrders = orders.filter(o => o.date >= fourteenDaysAgo && o.date < sevenDaysAgo);
        const lastWeekTotal = lastWeekOrders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);

        const currentMonthOrders = orders.filter(o => o.date >= thirtyDaysAgo && o.date <= todayStr);

        let growth = 0;
        if (lastWeekTotal > 0) {
            growth = ((currentWeekTotal - lastWeekTotal) / lastWeekTotal) * 100;
        } else if (currentWeekTotal > 0) {
            growth = 100;
        }

        const totalRevenue = orders.reduce((acc, curr) => acc + (Number(curr.total) || 0), 0);

        // حساب أفضل شيف في الأسبوع
        const getTopChef = (targetOrders: any[]) => {
            const chefSales: Record<string, number> = {};
            targetOrders.forEach(order => {
                if (order.itemsDetails) {
                    order.itemsDetails.forEach((item: any) => {
                        const chefName = item.chef || 'غير معروف';
                        chefSales[chefName] = (chefSales[chefName] || 0) + (item.price * item.quantity);
                    });
                }
            });
            const topChefName = Object.entries(chefSales).sort((a, b) => b[1] - a[1])[0]?.[0];
            const topChefData = chefs.find(c => c.name === topChefName);
            return {
                name: topChefName || 'لا يوجد',
                sales: chefSales[topChefName || ''] || 0,
                img: topChefData?.img || 'https://via.placeholder.com/100'
            };
        };

        return {
            totalRevenue,
            currentWeekTotal,
            growth: Math.round(growth),
            topChefWeek: getTopChef(currentWeekOrders),
            topChefMonth: getTopChef(currentMonthOrders)
        };
    }, [orders, chefs]);

    const weeklySalesData = useMemo(() => {
        const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
        const data = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            const dayName = days[d.getDay()];

            const dayRevenue = orders
                .filter(o => o.date === dateStr)
                .reduce((sum, o) => sum + (Number(o.total) || 0), 0);

            data.push({ day: dayName, total: dayRevenue });
        }

        const maxRev = Math.max(...data.map(d => d.total), 1);
        return data.map(d => ({
            ...d,
            height: Math.max((d.total / maxRev) * 100, 5)
        }));
    }, [orders]);

    if (statsLoading || ordersLoading || chefsLoading) return <Loading />;

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-3xl font-black text-gray-900">نظرة عامة 📊</h2>
                    <p className="text-gray-500 text-sm font-bold mt-1">مرحباً بك في لوحة تحكم "غدوة"</p>
                </div>
                <div className="bg-gray-50 px-5 py-2.5 rounded-2xl border border-gray-100 flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        <i className="fa-solid fa-calendar-day"></i>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-black text-gray-400 uppercase leading-none">اليوم</p>
                        <p className="text-xs font-black text-gray-900 mt-1">
                            {new Date().toLocaleDateString('ar-EG', { weekday: 'long', day: 'numeric', month: 'long' })}
                        </p>
                    </div>
                </div>
            </div>

            {/* Top Statistics Grid */}
            <DashboardStats
                totalRevenue={analytics.totalRevenue}
                totalOrders={stats?.ordersCount || 0}
                chefsCount={stats?.chefsCount || 0}
                visitorsCount={1250}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Sales Chart */}
                <SalesChart weeklySalesData={weeklySalesData} />

                {/* Right Column: Performance & Top Chefs */}
                <TopChefs
                    growth={analytics.growth}
                    currentWeekTotal={analytics.currentWeekTotal}
                    topChefWeek={analytics.topChefWeek}
                    topChefMonth={analytics.topChefMonth}
                />
            </div>

            {/* Recent Orders Section */}
            <RecentActivity orders={orders} onNavigate={() => { }} />
        </div>
    );
};
