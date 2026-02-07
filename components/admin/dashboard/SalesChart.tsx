import React from 'react';

interface SalesChartProps {
    weeklySalesData: { day: string, total: number, height: number }[];
}

export const SalesChart: React.FC<SalesChartProps> = ({ weeklySalesData }) => {
    return (
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 flex flex-col min-h-[400px]">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">تحليل المبيعات</h3>
                    <p className="text-xs text-gray-400 mt-1">آخر 7 أيام من النشاط</p>
                </div>
            </div>

            <div className="flex items-end justify-between h-full gap-4 md:gap-6 px-2 mb-2">
                {weeklySalesData.map((data, i) => (
                    <div key={i} className="flex flex-col items-center gap-4 w-full group h-full justify-end">
                        <div className="w-full bg-gray-50 rounded-2xl relative h-full flex items-end overflow-hidden border border-gray-100/50">
                            <div
                                className="w-full bg-primary/80 group-hover:bg-primary transition-all rounded-t-xl duration-500 relative"
                                style={{ height: `${data.height}%` }}
                            >
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2.5 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 font-black shadow-xl border border-white/10">
                                    {data.total.toLocaleString()} ج.م
                                </div>
                            </div>
                        </div>
                        <span className={`text-[11px] font-black transition-colors ${i === 6 ? 'text-primary' : 'text-gray-400 group-hover:text-primary'}`}>
                            {i === 6 ? 'اليوم' : data.day}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
