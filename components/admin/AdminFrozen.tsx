import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as api from '../../services/api';
import { MenuItem } from '../../types';
import { DeleteConfirmModal } from '../Modals';
import { MealTable } from './meals/MealTable';
import { MealFormModal } from './meals/MealFormModal';
import { useMutations } from '../../hooks/useMutations';
import { Loading } from '../../components/Loading';

export const AdminFrozen: React.FC = () => {
    // Data Fetching - Frozen items with query filter
    const { data: meals = [], isLoading } = useQuery({
        queryKey: ['frozenItems'],
        queryFn: api.fetchFrozenItems
    });
    const { data: chefs = [] } = useQuery({ queryKey: ['chefs'], queryFn: api.fetchChefs });
    const { data: categories = [] } = useQuery({ queryKey: ['categories'], queryFn: api.fetchCategories });

    // Mutations
    const mutations = useMutations();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentMeal, setCurrentMeal] = useState<MenuItem | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [mealToDelete, setMealToDelete] = useState<number | null>(null);
    const [formData, setFormData] = useState<any>({
        name: '',
        price: 0,
        desc: '',
        image: '',
        rating: 5,
        reviews: 0,
        category: 'frozen',
        chefId: 0,
        categoryId: 0,
        tags: []
    });

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
            category: 'frozen', // Default to frozen category
            categoryId: categories.find(c => c.name === 'frozen' || c.name === 'مجمدات')?.id || 0,
            chef: chefs[0]?.name || '',
            chefId: chefs[0]?.id || 0,
            tags: ['مجمد']
        });
        setIsModalOpen(true);
    };

    const openEdit = (meal: MenuItem) => {
        setCurrentMeal(meal);
        setFormData({
            ...meal,
            desc: meal.desc || meal.description || '',
            categoryId: categories.find(c => c.name === meal.category)?.id || 0,
            chefId: chefs.find(c => c.name === meal.chef)?.id || 0,
            tags: meal.tags || [],
            // Nutrition fields
            calories: meal.calories,
            fats: meal.fats,
            protein: meal.protein,
            carbs: meal.carbs
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

        const mealData = {
            name: formData.name,
            price: Number(formData.price),
            description: formData.desc,
            category: formData.category || 'frozen',
            chef: formData.chef,
            img: formData.img,
            rating: Number(formData.rating || 5),
            time: formData.time,
            tags: formData.tags || [],
            // Nutrition fields (optional)
            calories: formData.calories || null,
            fats: formData.fats || null,
            protein: formData.protein || null,
            carbs: formData.carbs || null
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
                    <h2 className="text-3xl font-black text-gray-900">إدارة المجمدات ❄️</h2>
                    <p className="text-gray-500 text-sm font-bold mt-1">الأصناف المجمدة والتجهيزات</p>
                </div>
                <button onClick={openAdd} className="bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-black text-sm shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center gap-2">
                    <i className="fa-solid fa-snowflake"></i>
                    إضافة منتج مجمد
                </button>
            </div>

            {meals.length === 0 ? (
                <div className="bg-white rounded-[2rem] p-12 text-center border border-gray-100">
                    <i className="fa-solid fa-snowflake text-6xl text-blue-200 mb-4"></i>
                    <h3 className="text-xl font-bold text-gray-600 mb-2">لا توجد منتجات مجمدة</h3>
                    <p className="text-gray-400">اضغط على "إضافة منتج مجمد" لإضافة أول منتج</p>
                </div>
            ) : (
                <MealTable
                    meals={meals}
                    onEdit={openEdit}
                    onDelete={handleDeleteClick}
                />
            )}

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
                title="حذف المنتج المجمد"
                message="هل أنت متأكد من حذف هذا المنتج؟"
            />
        </div>
    );
};
