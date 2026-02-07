import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as api from '../../services/api';
import { DeleteConfirmModal } from '../Modals';
import { PartnerGrid } from './partners/PartnerGrid';
import { PartnerFormModal } from './partners/PartnerFormModal';
import { useMutations } from '../../hooks/useMutations';
import { Loading } from '../../components/Loading';

export const AdminPartners: React.FC = () => {
    // Data Fetching
    const { data: partners = [], isLoading, isError, error } = useQuery({ queryKey: ['partners'], queryFn: api.fetchPartners });
    const mutations = useMutations();


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [partnerToDelete, setPartnerToDelete] = useState<number | null>(null);
    const [formData, setFormData] = useState<any>({ name: '', logo: '' });

    const handleDeleteClick = (id: number) => {
        setPartnerToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (partnerToDelete) {
            mutations.deletePartnerMutation.mutate(partnerToDelete);
            setPartnerToDelete(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { id, ...dataWithoutId } = formData;
        mutations.createPartnerMutation.mutate(dataWithoutId);
        setIsModalOpen(false);
    };

    if (isLoading) return <Loading />;
    if (isError) return <div className="text-red-500 text-center p-10 font-bold">حدث خطأ في جلب البيانات: {(error as Error).message}</div>;

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-900">شركاء النجاح 🤝</h2>
                <button onClick={() => { setFormData({ name: '', logo: '' }); setIsModalOpen(true); }} className="bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg">إضافة شريك</button>
            </div>

            <PartnerGrid partners={partners} onDelete={handleDeleteClick} />

            {partners.length === 0 && (
                <div className="text-center py-24 bg-white rounded-[2rem] border-2 border-dashed border-gray-100">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                        <i className="fa-solid fa-handshake text-2xl"></i>
                    </div>
                    <p className="text-gray-400 font-bold">لا يوجد شركاء مضافين حالياً</p>
                </div>
            )}

            <PartnerFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                formData={formData}
                setFormData={setFormData}
            />

            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="حذف الشريك"
                message="هل أنت متأكد من حذف هذا الشريك من الموقع؟"
            />
        </div>
    );
};
