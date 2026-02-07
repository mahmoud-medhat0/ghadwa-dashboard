import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as api from '../../services/api';
import { MenuItem } from '../../types';
import { DeleteConfirmModal } from '../Modals';
import { OfferTable } from './offers/OfferTable';
import { OfferFormModal } from './offers/OfferFormModal';
import { useMutations } from '../../hooks/useMutations';
import { Loading } from '../../components/Loading';

export const AdminOffers: React.FC = () => {
    // Data Fetching
    const { data: offers = [], isLoading } = useQuery({ queryKey: ['offers'], queryFn: api.fetchOffers });
    const { data: chefs = [] } = useQuery({ queryKey: ['chefs'], queryFn: api.fetchChefs });
    const mutations = useMutations();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [offerToDelete, setOfferToDelete] = useState<number | null>(null);
    const [currentOffer, setCurrentOffer] = useState<MenuItem | null>(null);
    const [formData, setFormData] = useState<any>({ name: '', price: '', oldPrice: '', discount: '', chef: '', img: '', expiryDate: '' });

    if (isLoading) return <Loading />;

    const openAdd = () => {
        setCurrentOffer(null);
        const dateStr = new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 16);
        setFormData({ name: '', price: '', oldPrice: '', discount: '25%', chef: chefs[0]?.name || '', img: '', expiryDate: dateStr });
        setIsModalOpen(true);
    };

    const openEdit = (offer: MenuItem) => {
        setCurrentOffer(offer);
        setFormData(offer);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (id: number) => {
        setOfferToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (offerToDelete) {
            mutations.deleteOfferMutation.mutate(offerToDelete);
            setOfferToDelete(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = { ...formData, price: Number(formData.price), oldPrice: Number(formData.oldPrice) };
        if (currentOffer) {
            mutations.updateOfferMutation.mutate({ ...currentOffer, ...data });
        } else {
            const { id, ...dataWithoutId } = data;
            mutations.createOfferMutation.mutate(dataWithoutId);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-900">إدارة العروض 🔥</h2>
                <button onClick={openAdd} className="bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg">إضافة عرض</button>
            </div>

            <OfferTable offers={offers} onEdit={openEdit} onDelete={handleDeleteClick} />

            <OfferFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                currentOffer={currentOffer}
                formData={formData}
                setFormData={setFormData}
                chefs={chefs}
            />

            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="حذف العرض"
                message="هل أنت متأكد من حذف هذا العرض؟"
            />
        </div>
    );
};
