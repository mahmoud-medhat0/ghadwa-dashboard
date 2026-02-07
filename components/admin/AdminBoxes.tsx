import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as api from '../../services/api';
import { Box } from '../../types';
import { DeleteConfirmModal } from '../Modals';
import { BoxGrid } from './boxes/BoxGrid';
import { BoxFormModal } from './boxes/BoxFormModal';
import { useMutations } from '../../hooks/useMutations';
import { Loading } from '../../components/Loading';

export const AdminBoxes: React.FC = () => {
    // Data Fetching
    const { data: boxes = [], isLoading, isError, error } = useQuery({ queryKey: ['boxes'], queryFn: api.fetchBoxes });
    const { data: chefs = [] } = useQuery({ queryKey: ['chefs'], queryFn: api.fetchChefs });
    const mutations = useMutations();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [boxToDelete, setBoxToDelete] = useState<number | null>(null);
    const [currentBox, setCurrentBox] = useState<Box | null>(null);
    const [formData, setFormData] = useState<any>({ name: '', price: '', serves: '', chef: '', itemsString: '', img: '' });

    const openAdd = () => {
        setCurrentBox(null);
        setFormData({ name: '', price: '', serves: '', chef: chefs[0]?.name || '', itemsString: '', img: '' });
        setIsModalOpen(true);
    };

    const openEdit = (box: Box) => {
        setCurrentBox(box);
        setFormData({ ...box, itemsString: box.items.join(', ') });
        setIsModalOpen(true);
    };

    const handleDeleteClick = (id: number) => {
        setBoxToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (boxToDelete) {
            mutations.deleteBoxMutation.mutate(boxToDelete);
            setBoxToDelete(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const items = formData.itemsString.split(',').map((item: string) => item.trim()).filter(Boolean);
        const boxData = {
            name: formData.name,
            price: Number(formData.price),
            serves: formData.serves,
            chef: formData.chef,
            items,
            img: formData.img,
            color: "from-orange-500 to-red-600",
            accent: "bg-orange-50 text-orange-700",
            badge: "توفير",
            category: 'غداء'
        };

        if (currentBox) {
            mutations.updateBoxMutation.mutate({ ...currentBox, ...boxData });
        } else {
            mutations.createBoxMutation.mutate(boxData);
        }
        setIsModalOpen(false);
    };

    if (isLoading) return <Loading />;
    if (isError) return <div className="text-red-500 text-center p-10 font-bold">حدث خطأ في جلب البيانات: {(error as Error).message}</div>;

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-900">إدارة البوكسات 📦</h2>
                <button onClick={openAdd} className="bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg transition flex items-center gap-2">
                    <i className="fa-solid fa-plus"></i> إضافة بوكس
                </button>
            </div>

            <BoxGrid boxes={boxes} onEdit={openEdit} onDelete={handleDeleteClick} />

            {boxes.length === 0 && (
                <div className="text-center py-24 bg-white rounded-[2rem] border-2 border-dashed border-gray-100">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                        <i className="fa-solid fa-box-open text-2xl"></i>
                    </div>
                    <p className="text-gray-400 font-bold">لا توجد بوكسات مضافة حالياً</p>
                </div>
            )}

            <BoxFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                currentBox={currentBox}
                formData={formData}
                setFormData={setFormData}
                chefs={chefs}
            />

            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="حذف البوكس"
                message="هل أنت متأكد من حذف هذا البوكس؟"
            />
        </div>
    );
};
