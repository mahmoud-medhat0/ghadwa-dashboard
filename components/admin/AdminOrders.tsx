import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as api from '../../services/api';
import { Order } from '../../types';
import { DeleteConfirmModal } from '../Modals';
import { OrderBoard } from './orders/OrderBoard';
import { OrderTable } from './orders/OrderTable';
import { useMutations } from '../../hooks/useMutations';
import { useUIStore } from '../../stores/useUIStore';
import { Loading } from '../../components/Loading';

export const AdminOrders: React.FC = () => {
    // Data Fetching
    const { data: orders = [], isLoading } = useQuery({ queryKey: ['orders'], queryFn: api.fetchOrders });
    const mutations = useMutations();
    const { setViewingOrder } = useUIStore();

    const [viewMode, setViewMode] = useState<'board' | 'table'>('board');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState<number | null>(null);

    if (isLoading) return <Loading />;

    const handleDeleteClick = (id: number) => {
        setOrderToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (orderToDelete) {
            mutations.deleteOrderMutation.mutate(orderToDelete);
            setOrderToDelete(null);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in-up">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-3xl font-black text-gray-900">إدارة الطلبات 📦</h2>
                    <p className="text-gray-500 text-sm font-bold mt-1">متابعة حالة الطلبات لحظة بلحظة</p>
                </div>
                <div className="flex bg-gray-100/50 p-1.5 rounded-xl border border-gray-200">
                    <button
                        onClick={() => setViewMode('board')}
                        className={`px-6 py-2.5 rounded-lg text-sm font-black transition-all ${viewMode === 'board' ? 'bg-white text-primary shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        <i className="fa-solid fa-table-columns ml-2"></i>
                        لوحة المتابعة
                    </button>
                    <button
                        onClick={() => setViewMode('table')}
                        className={`px-6 py-2.5 rounded-lg text-sm font-black transition-all ${viewMode === 'table' ? 'bg-white text-primary shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        <i className="fa-solid fa-list-ul ml-2"></i>
                        قائمة الطلبات
                    </button>
                </div>
            </div>

            {/* Board View */}
            {viewMode === 'board' ? (
                <OrderBoard
                    orders={orders}
                    updateOrderStatus={(id, status) => mutations.updateOrderStatusMutation.mutate({ id: Number(id), status })}
                    onDeleteOrder={handleDeleteClick}
                    onViewOrder={setViewingOrder}
                />
            ) : (
                /* Table View */
                <OrderTable
                    orders={orders}
                    updateOrderStatus={(id, status) => mutations.updateOrderStatusMutation.mutate({ id: Number(id), status })}
                    onDeleteOrder={handleDeleteClick}
                    onViewOrder={setViewingOrder}
                />
            )}

            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="حذف الطلب"
                message="هل هل أنت متأكد من حذف هذا الطلب نهائياً؟"
            />
        </div>
    );
};
