import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as api from '../../services/api';
import { MenuItem } from '../../types';
import { DeleteConfirmModal } from '../Modals';
import { MealTable } from './meals/MealTable';
import { MealFormModal } from './meals/MealFormModal';
import { useMutations } from '../../hooks/useMutations';
import { Loading } from '../../components/Loading';

export const AdminMeals: React.FC = () => {
    // Data Fetching
    const { data: meals = [], isLoading } = useQuery({ queryKey: ['menuItems'], queryFn: api.fetchMenuItems });
    const { data: chefs = [] } = useQuery({ queryKey: ['chefs'], queryFn: api.fetchChefs });
    const { data: categories = [] } = useQuery({ queryKey: ['categories'], queryFn: api.fetchCategories });

    // Mutations
    const mutations = useMutations();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentMeal, setCurrentMeal] = useState<MenuItem | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [mealToDelete, setMealToDelete] = useState<number | null>(null);
    const [formData, setFormData] = useState<any>({ name: '', price: 0, desc: '', image: '', rating: 5, reviews: 0, category: '', chefId: 0, categoryId: 0, tags: [] });

    if (isLoading) return <Loading />;

    const openAdd = () => {
        setCurrentMeal(null);
        setFormData({
            name: '',
            price: 0,
            desc: '',
            img: '',
            rating: 5,
            time: '45 دقيقة',
            category: categories[0]?.name || '',
            categoryId: categories[0]?.id || 0,
            chef: chefs[0]?.name || '',
            chefId: chefs[0]?.id || 0,
            tags: []
        });
        setIsModalOpen(true);
    };

    const openEdit = (meal: MenuItem) => {
        setCurrentMeal(meal);
        setFormData({
            ...meal,
            desc: meal.desc || meal.description || '', // Handle description mapping
            categoryId: categories.find(c => c.name === meal.category)?.id || 0,
            chefId: chefs.find(c => c.name === meal.chef)?.id || 0,
            tags: meal.tags || []
        });
        setIsModalOpen(true);
    };

    const handleDeleteClick = (id: number) => {
        setMealToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (mealToDelete) {
            mutations.deleteMenuItemMutation.mutate(mealToDelete);
            setMealToDelete(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Construct a clean object that matches Supabase schema exactly
        const mealData = {
            name: formData.name,
            price: Number(formData.price),
            description: formData.desc, // Map desc form field to description column
            category: formData.category,
            chef: formData.chef,
            img: formData.img,
            rating: Number(formData.rating || 5),
            time: formData.time,
            tags: formData.tags || []
        };

        if (currentMeal) {
            mutations.updateMenuItemMutation.mutate({ ...currentMeal, ...mealData });
        } else {
            mutations.createMenuItemMutation.mutate(mealData);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex justify-between items-center bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-3xl font-black text-gray-900">إدارة الوجبات 🍱</h2>
                    <p className="text-gray-500 text-sm font-bold mt-1">كل الأصناف الموجودة في القائمة</p>
                </div>
                <button onClick={openAdd} className="bg-primary text-white px-8 py-3.5 rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:bg-[#6b1c1c] transition-all">إضافة وجبة</button>
            </div>

            <MealTable
                meals={meals}
                onEdit={openEdit}
                onDelete={handleDeleteClick}
            />

            <MealFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                currentMeal={currentMeal}
                categories={categories}
                chefs={chefs}
                formData={formData}
                setFormData={setFormData}
            />

            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="حذف الوجبة"
                message="هل أنت متأكد من حذف هذه الوجبة؟"
            />
        </div>
    );
};
