import React from 'react';

interface TopChefsProps {
    growth: number;
    currentWeekTotal: number;
    topChefWeek: { name: string, sales: number, img: string };
    topChefMonth: { name: string, sales: number, img: string };
}

export const TopChefs: React.FC<TopChefsProps> = ({ growth, currentWeekTotal, topChefWeek, topChefMonth }) => {
    return (
        <div className="flex flex-col gap-6">
            {/* Performance Card */}
            <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-gray-700">الأداء الأسبوعي</h3>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold ${growth >= 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                        <i className={`fa-solid ${growth >= 0 ? 'fa-caret-up' : 'fa-caret-down'}`}></i>
                        {Math.abs(growth)}%
                    </div>
                </div>
                <div className="space-y-1">
                    <p className="text-2xl font-bold text-gray-900">{currentWeekTotal.toLocaleString()}</p>
                    <p className="text-[10px] text-gray-400">جنيه مصري</p>
                </div>
            </div>

            {/* Top Chef Month */}
            <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">شيف الشهر (الأكثر مبيعاً)</p>
                    <i className="fa-solid fa-crown text-amber-500"></i>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm">
                        <img src={topChefMonth.img} className="w-full h-full object-cover" alt="Top Chef" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 text-lg">{topChefMonth.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">حققت مبيعات: <span className="font-bold text-gray-900">{topChefMonth.sales.toLocaleString()} ج.م</span></p>
                    </div>
                </div>
            </div>

            {/* Top Chef Week */}
            <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">شيف الأسبوع (صاعدة)</p>
                    <i className="fa-solid fa-arrow-trend-up text-green-500"></i>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm">
                        <img src={topChefWeek.img} className="w-full h-full object-cover" alt="Top Chef Week" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 text-lg">{topChefWeek.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">حققت مبيعات: <span className="font-bold text-gray-900">{topChefWeek.sales.toLocaleString()} ج.م</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};
