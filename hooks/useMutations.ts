import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../services/api';
import { Chef, Category, MenuItem, Box, Order, PromoCode, Partner, ContactSettings } from '../types';
import { useUIStore } from '../stores/useUIStore';

export const useMutations = () => {
    const queryClient = useQueryClient();
    const showToast = useUIStore.getState().showToast;

    // Chefs
    const createChefMutation = useMutation({
        mutationFn: api.createChef,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['chefs'] });
            showToast('تم الإضافة');
        },
        onError: () => showToast('حدث خطأ', 'error'),
    });

    const updateChefMutation = useMutation({
        mutationFn: api.updateChef,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['chefs'] });
            showToast('تم التحديث');
        },
        onError: () => showToast('حدث خطأ', 'error'),
    });

    const deleteChefMutation = useMutation({
        mutationFn: api.deleteChef,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['chefs'] });
            showToast('تم الحذف');
        },
        onError: () => showToast('حدث خطأ', 'error'),
    });

    // Categories
    const createCategoryMutation = useMutation({
        mutationFn: api.createCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            showToast('تم الإضافة');
        },
        onError: () => showToast('حدث خطأ', 'error'),
    });

    const updateCategoryMutation = useMutation({
        mutationFn: api.updateCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            showToast('تم التحديث');
        },
        onError: () => showToast('حدث خطأ', 'error'),
    });

    const deleteCategoryMutation = useMutation({
        mutationFn: api.deleteCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            showToast('تم الحذف');
        },
        onError: () => showToast('حدث خطأ', 'error'),
    });

    // Menu Items
    const createMenuItemMutation = useMutation({
        mutationFn: api.createMenuItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menuItems'] });
            showToast('تم الإضافة');
        },
        onError: () => showToast('حدث خطأ', 'error'),
    });

    const updateMenuItemMutation = useMutation({
        mutationFn: api.updateMenuItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menuItems'] });
            showToast('تم التحديث');
        },
        onError: () => showToast('حدث خطأ', 'error'),
    });

    const deleteMenuItemMutation = useMutation({
        mutationFn: api.deleteMenuItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menuItems'] });
            showToast('تم الحذف');
        },
        onError: () => showToast('حدث خطأ', 'error'),
    });

    // Offers
    const createOfferMutation = useMutation({
        mutationFn: api.createOffer,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['offers'] });
            showToast('تم الإضافة');
        },
        onError: () => showToast('حدث خطأ', 'error'),
    });

    const updateOfferMutation = useMutation({
        mutationFn: api.updateOffer,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['offers'] });
            showToast('تم التحديث');
        },
        onError: () => showToast('حدث خطأ', 'error'),
    });

    const deleteOfferMutation = useMutation({
        mutationFn: api.deleteOffer,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['offers'] });
            showToast('تم الحذف');
        },
        onError: () => showToast('حدث خطأ', 'error'),
    });

    // Boxes
    const createBoxMutation = useMutation({
        mutationFn: api.createBox,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['boxes'] });
            showToast('تم الإضافة');
        },
        onError: () => showToast('حدث خطأ', 'error'),
    });

    const updateBoxMutation = useMutation({
        mutationFn: api.updateBox,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['boxes'] });
            showToast('تم التحديث');
        },
        onError: () => showToast('حدث خطأ', 'error'),
    });

    const deleteBoxMutation = useMutation({
        mutationFn: api.deleteBox,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['boxes'] });
            showToast('تم الحذف');
        },
        onError: () => showToast('حدث خطأ', 'error'),
    });

    // Orders
    const updateOrderStatusMutation = useMutation({
        mutationFn: ({ id, status }: { id: number; status: string }) => api.updateOrderStatus(id, status),
        onSuccess: (updatedOrder: Order) => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            showToast('تم تحديث حالة الطلب');
        },
        onError: () => showToast('حدث خطأ', 'error'),
    });

    const deleteOrderMutation = useMutation({
        mutationFn: api.deleteOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            showToast('تم حذف الطلب');
        },
        onError: () => showToast('حدث خطأ', 'error'),
    });

    // Partners
    const createPartnerMutation = useMutation({
        mutationFn: api.createPartner,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['partners'] });
            showToast('تم الإضافة');
        },
        onError: () => showToast('حدث خطأ', 'error'),
    });

    const deletePartnerMutation = useMutation({
        mutationFn: api.deletePartner,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['partners'] });
            showToast('تم الحذف');
        },
        onError: () => showToast('حدث خطأ', 'error'),
    });

    // Promo Codes
    const createPromoCodeMutation = useMutation({
        mutationFn: api.createPromoCode,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['promoCodes'] });
            showToast('تم الإضافة');
        },
        onError: () => showToast('حدث خطأ', 'error'),
    });

    const deletePromoCodeMutation = useMutation({
        mutationFn: api.deletePromoCode,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['promoCodes'] });
            showToast('تم الحذف');
        },
        onError: () => showToast('حدث خطأ', 'error'),
    });

    // Settings
    const updateSettingsMutation = useMutation({
        mutationFn: api.updateSettings,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['settings'] });
            showToast('تم التحديث');
        },
        onError: () => showToast('حدث خطأ', 'error'),
    });

    return {
        createChefMutation, updateChefMutation, deleteChefMutation,
        createCategoryMutation, updateCategoryMutation, deleteCategoryMutation,
        createMenuItemMutation, updateMenuItemMutation, deleteMenuItemMutation,
        createOfferMutation, updateOfferMutation, deleteOfferMutation,
        createBoxMutation, updateBoxMutation, deleteBoxMutation,
        updateOrderStatusMutation, deleteOrderMutation,
        createPartnerMutation, deletePartnerMutation,
        createPromoCodeMutation, deletePromoCodeMutation,
        updateSettingsMutation
    };
};
