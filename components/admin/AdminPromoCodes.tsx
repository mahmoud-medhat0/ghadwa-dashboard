import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as api from '../../services/api';
import { ContactSettings } from '../../types';
import { DeleteConfirmModal } from '../Modals';
import { PromoCodeList } from './promos/PromoCodeList';
import { RewardSettings } from './promos/RewardSettings';
import { PromoCodeFormModal } from './promos/PromoCodeFormModal';
import { useMutations } from '../../hooks/useMutations';
import { Loading } from '../../components/Loading';

export const AdminPromoCodes: React.FC = () => {
    // Data Fetching
    const { data: promoCodes = [], isLoading } = useQuery({ queryKey: ['promoCodes'], queryFn: api.fetchPromoCodes });
    const { data: contactSettings } = useQuery({ queryKey: ['settings'], queryFn: api.fetchSettings });

    const defaultSettings: ContactSettings = {
        phone: '', whatsapp: '', email: '', address: '',
        facebookUrl: '', instagramUrl: '', tiktokUrl: ''
    };
    const settings = contactSettings || defaultSettings;
    const mutations = useMutations();

    const [activeTab, setActiveTab] = useState<'list' | 'settings'>('list');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [promoToDelete, setPromoToDelete] = useState<number | null>(null);
    const [formData, setFormData] = useState<any>({ code: '', value: '', type: 'percentage' });

    const [thresholdValue, setThresholdValue] = useState(settings.cartThreshold || 500);
    const [rewardMsg, setRewardMsg] = useState(settings.rewardMessage || 'باقي لك {amount} ج.م للحصول على خصم 10%');

    useEffect(() => {
        setThresholdValue(settings.cartThreshold || 500);
        setRewardMsg(settings.rewardMessage || 'باقي لك {amount} ج.م للحصول على خصم 10%');
    }, [settings]);

    if (isLoading) return <Loading />;

    const openAdd = () => {
        setFormData({ code: '', value: '', type: 'percentage' });
        setIsModalOpen(true);
    };

    const handleDeleteClick = (id: number) => {
        setPromoToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (promoToDelete) {
            mutations.deletePromoCodeMutation.mutate(promoToDelete);
            setPromoToDelete(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutations.createPromoCodeMutation.mutate({
            code: formData.code.toUpperCase(),
            value: Number(formData.value),
            type: formData.type
        });
        setIsModalOpen(false);
    };

    const handleSaveThreshold = () => {
        mutations.updateSettingsMutation.mutate({
            ...settings,
            cartThreshold: Number(thresholdValue),
            rewardMessage: rewardMsg
        });
    };

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-900">إدارة الكوبونات والمكافآت 🎫</h2>
                <div className="flex bg-gray-200 p-1 rounded-xl">
                    <button
                        onClick={() => setActiveTab('list')}
                        className={`px-5 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'list' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        الأكواد الحالية
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`px-5 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'settings' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        إعدادات المكافأة
                    </button>
                </div>
            </div>

            {activeTab === 'list' ? (
                <PromoCodeList
                    promoCodes={promoCodes}
                    onDelete={handleDeleteClick}
                    onAdd={openAdd}
                />
            ) : (
                <RewardSettings
                    thresholdValue={thresholdValue}
                    setThresholdValue={setThresholdValue}
                    rewardMsg={rewardMsg}
                    setRewardMsg={setRewardMsg}
                    onSave={handleSaveThreshold}
                />
            )}

            <PromoCodeFormModal
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
                title="حذف الكوبون"
                message="هل أنت متأكد من حذف كود الخصم هذا؟ لن يتمكن العملاء من استخدامه مرة أخرى."
            />
        </div>
    );
};
