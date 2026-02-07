/**
 * Custom Hooks for Menu Items (Meals) Data
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MenuItem } from '../types';
import * as api from '../services/api';

export const menuItemsKeys = {
    all: ['menuItems'] as const,
};

export const useMenuItems = () => {
    return useQuery({
        queryKey: menuItemsKeys.all,
        queryFn: api.fetchMenuItems,
        staleTime: 1000 * 60 * 5,
    });
};

export const useCreateMenuItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (item: Omit<MenuItem, 'id'>) => api.createMenuItem(item),
        onSuccess: (newItem) => {
            queryClient.setQueryData<MenuItem[]>(menuItemsKeys.all, (old) =>
                old ? [...old, newItem] : [newItem]
            );
        },
    });
};

export const useUpdateMenuItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (item: MenuItem) => api.updateMenuItem(item),
        onSuccess: (updatedItem) => {
            queryClient.setQueryData<MenuItem[]>(menuItemsKeys.all, (old) =>
                old?.map((i) => (i.id === updatedItem.id ? updatedItem : i)) ?? []
            );
        },
    });
};

export const useDeleteMenuItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => api.deleteMenuItem(id),
        onSuccess: (_, deletedId) => {
            queryClient.setQueryData<MenuItem[]>(menuItemsKeys.all, (old) =>
                old?.filter((i) => i.id !== deletedId) ?? []
            );
        },
    });
};
