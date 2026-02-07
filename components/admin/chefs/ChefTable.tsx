import React from 'react';
import { Chef, Order } from '../../../types';

interface ChefTableProps {
    chefs: Chef[];
    orders: Order[];
    onEdit: (chef: Chef) => void;
    onDelete: (id: number) => void;
    onToggleStatus: (id: number) => void;
}

export const ChefTable: React.FC<ChefTableProps> = ({ chefs, orders, onEdit, onDelete, onToggleStatus }) => {

    // Calculate stats for each chef
    const getChefStats = (chefName: string) => {
        let orderCount = 0;
        let totalRevenue = 0;
        orders.forEach(order => {
            if (order.itemsDetails && Array.isArray(order.itemsDetails)) {
                const chefItems = order.itemsDetails.filter(item => item.chef === chefName);
                if (chefItems.length > 0) {
                    orderCount++;
                    totalRevenue += chefItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                }
            }
        });
        return { orderCount, totalRevenue };
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chefs.map(chef => {
                const stats = getChefStats(chef.name);
                return (
                    <div key={chef.id} className={`bg-white rounded-[2.5rem] border transition-all ${chef.isOpen ? 'border-green-100' : 'border-gray-200'} overflow-hidden relative group shadow-sm hover:shadow-xl`}>
                        <div className="h-32 w-full relative">
                            <img src={chef.cover || 'https://via.placeholder.com/500x200'} alt={chef.name} className="w-full h-full object-cover" />
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => onEdit(chef)} className="w-8 h-8 rounded-full bg-white/90 text-blue-600 flex items-center justify-center shadow-sm"><i className="fa-solid fa-pen text-xs"></i></button>
                                <button onClick={() => onDelete(chef.id)} className="w-8 h-8 rounded-full bg-white/90 text-red-600 flex items-center justify-center shadow-sm"><i className="fa-solid fa-trash text-xs"></i></button>
                            </div>
                        </div>

                        <div className="p-6 pt-0 relative">
                            <div className="flex justify-center -mt-10 mb-3">
                                <div className="w-20 h-20 rounded-[1.5rem] p-1 bg-white shadow-lg overflow-hidden">
                                    <img src={chef.img || 'https://via.placeholder.com/150'} className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <div className="text-center mb-4">
                                <h3 className="font-black text-xl text-gray-900">{chef.name}</h3>
                                <p className="text-sm text-primary font-black">{chef.specialty}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="bg-gray-50 p-3 rounded-2xl text-center">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">الطلبات</p>
                                    <p className="font-black text-lg text-primary">{stats.orderCount}</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-2xl text-center">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">الأرباح</p>
                                    <p className="font-black text-primary text-lg">{stats.totalRevenue}</p>
                                </div>
                            </div>
                            <button onClick={() => onToggleStatus(chef.id)} className={`w-full py-3 rounded-xl font-black text-sm text-white transition-all shadow-md active:scale-95 ${chef.isOpen !== false ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}>
                                {chef.isOpen !== false ? 'إغلاق المطبخ 🔒' : 'فتح المطبخ 🔓'}
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
