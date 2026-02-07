import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as api from '../../services/api';
import { Chef, Order, Category } from '../../types';
import { DeleteConfirmModal } from '../Modals';
import { ChefTable } from './chefs/ChefTable';
import { ChefFormModal } from './chefs/ChefFormModal';
import { useMutations } from '../../hooks/useMutations';

export const AdminChefs: React.FC = () => {
    // Data Fetching
    const { data: chefs = [] } = useQuery({ queryKey: ['chefs'], queryFn: api.fetchChefs });
    const { data: orders = [] } = useQuery({ queryKey: ['orders'], queryFn: api.fetchOrders });
    const { data: categories = [] } = useQuery({ queryKey: ['categories'], queryFn: api.fetchCategories });

    // Mutations
    const mutations = useMutations();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [chefToDelete, setChefToDelete] = useState<number | null>(null);
    const [currentChef, setCurrentChef] = useState<Chef | null>(null);
    const [formData, setFormData] = useState<any>({ name: '', specialty: '', bio: '', img: '', cover: '', workingHours: '', deliveryTime: '' });

    const openAdd = () => {
        setCurrentChef(null);
        setFormData({ name: '', specialty: categories[0]?.name || '', bio: '', img: '', cover: '', workingHours: '10 ص - 10 م', deliveryTime: '60 دقيقة' });
        setIsModalOpen(true);
    };

    const openEdit = (chef: Chef) => {
        setCurrentChef(chef);
        setFormData(chef);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (id: number) => {
        setChefToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (chefToDelete) {
            mutations.deleteChefMutation.mutate(chefToDelete);
            setChefToDelete(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentChef) {
            mutations.updateChefMutation.mutate({ ...currentChef, ...formData });
        } else {
            const { id, ...dataWithoutId } = formData;
            mutations.createChefMutation.mutate({ ...dataWithoutId, rating: 5.0, reviews: 0, orders: '0', isOpen: true, badges: [] });
        }
        setIsModalOpen(false);
    };

    const toggleChefStatus = (id: number) => {
        const chef = chefs.find(c => c.id === id);
        if (chef) {
            // If currently false (Closed), set to true (Open). Otherwise close it.
            // This handles undefined (default Open) correctly by setting it to false (Closed).
            const newStatus = chef.isOpen === false ? true : false;
            mutations.updateChefMutation.mutate({ ...chef, isOpen: newStatus });
        }
    }

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex justify-between items-center bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-3xl font-black text-gray-900">إدارة الشيفات 👩‍🍳</h2>
                    <p className="text-gray-500 text-sm font-bold mt-1">قائمة أبطال مطبخ غدوة</p>
                </div>
                <button onClick={openAdd} className="bg-primary text-white px-8 py-3.5 rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:bg-[#6b1c1c] transition-all">إضافة شيف</button>
            </div>

            <ChefTable
                chefs={chefs}
                orders={orders}
                onEdit={openEdit}
                onDelete={handleDeleteClick}
                onToggleStatus={toggleChefStatus}
            />

            <ChefFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                initialData={currentChef}
                categories={categories}
                formData={formData}
                setFormData={setFormData}
            />

            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="حذف الشيف"
                message="هل أنت متأكد من حذف هذا الشيف؟ سيتم إزالة جميع بياناته نهائياً."
            />
        </div>
    );
};
