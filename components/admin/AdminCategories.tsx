import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as api from '../../services/api';
import { Category } from '../../types';
import { DeleteConfirmModal } from '../Modals';
import { CategoryGrid } from './categories/CategoryGrid';
import { CategoryFormModal } from './categories/CategoryFormModal';
import { useMutations } from '../../hooks/useMutations';
import { Loading } from '../../components/Loading';

export const AdminCategories: React.FC = () => {
    // Data Fetching
    const { data: categories = [], isLoading } = useQuery({ queryKey: ['categories'], queryFn: api.fetchCategories });
    const mutations = useMutations();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [catToDelete, setCatToDelete] = useState<number | null>(null);
    const [currentCat, setCurrentCat] = useState<Category | null>(null);
    const [formData, setFormData] = useState<any>({ name: '', icon: 'fa-utensils' });

    if (isLoading) return <Loading />;

    const openAdd = () => {
        setCurrentCat(null);
        setFormData({ name: '', icon: 'fa-utensils' });
        setIsModalOpen(true);
    };

    const openEdit = (cat: Category) => {
        setCurrentCat(cat);
        setFormData(cat);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (id: number) => {
        setCatToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (catToDelete) {
            mutations.deleteCategoryMutation.mutate(catToDelete);
            setCatToDelete(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentCat) {
            mutations.updateCategoryMutation.mutate({ ...currentCat, ...formData });
        } else {
            mutations.createCategoryMutation.mutate(formData);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6 animate-fade-in-up">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-3xl font-black text-gray-900">إدارة الأقسام والتخصصات 🏷️</h2>
                    <p className="text-gray-500 text-sm font-bold mt-1">هنا يمكنك إضافة تصنيفات المنيو وتخصصات الشيفات (مشويات، حلويات.. إلخ)</p>
                </div>
                <button
                    onClick={openAdd}
                    className="bg-primary text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:bg-[#6b1c1c] transition-all active:scale-95 flex items-center gap-3 group"
                >
                    <i className="fa-solid fa-plus-circle group-hover:rotate-90 transition-transform"></i>
                    إضافة قسم جديد
                </button>
            </div>

            {/* Categories Grid */}
            <CategoryGrid
                categories={categories}
                onEdit={openEdit}
                onDelete={handleDeleteClick}
            />

            {/* Empty State */}
            {categories.length === 0 && (
                <div className="text-center py-24 bg-white rounded-[3.5rem] border-2 border-dashed border-gray-100 shadow-inner">
                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-200 text-5xl">
                        <i className="fa-solid fa-tags"></i>
                    </div>
                    <h3 className="text-2xl font-black text-gray-400">لا توجد أقسام مضافة بعد</h3>
                    <p className="text-gray-400 mt-2 font-bold">ابدأ بإضافة أول قسم لموقعك الآن</p>
                </div>
            )}

            {/* Form Modal */}
            <CategoryFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                currentCat={currentCat}
                formData={formData}
                setFormData={setFormData}
            />

            {/* Delete Modal */}
            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="حذف هذا القسم؟"
                message="سيتم حذف القسم نهائياً. تأكد أن هذا القسم غير مرتبط بأي وجبات أو شيفات حاليين لتجنب حدوث خلل في العرض."
            />
        </div>
    );
};
