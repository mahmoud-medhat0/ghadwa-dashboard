/**
 * Custom Hooks for Chefs Data
 * 
 * Uses React Query for data fetching, caching, and mutations.
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Chef } from '../types';
import * as api from '../services/api';

// Query Keys
export const chefsKeys = {
    all: ['chefs'] as const,
    detail: (id: number) => ['chefs', id] as const,
};

// Fetch all chefs
export const useChefs = () => {
    return useQuery({
        queryKey: chefsKeys.all,
        queryFn: api.fetchChefs,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

// Create a new chef
export const useCreateChef = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (chef: Omit<Chef, 'id'>) => api.createChef(chef),
        onSuccess: (newChef) => {
            // Update the cache with the new chef
            queryClient.setQueryData<Chef[]>(chefsKeys.all, (old) =>
                old ? [...old, newChef] : [newChef]
            );
        },
    });
};

// Update a chef
export const useUpdateChef = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (chef: Chef) => api.updateChef(chef),
        onSuccess: (updatedChef) => {
            queryClient.setQueryData<Chef[]>(chefsKeys.all, (old) =>
                old?.map((c) => (c.id === updatedChef.id ? updatedChef : c)) ?? []
            );
        },
    });
};

// Delete a chef
export const useDeleteChef = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => api.deleteChef(id),
        onSuccess: (_, deletedId) => {
            queryClient.setQueryData<Chef[]>(chefsKeys.all, (old) =>
                old?.filter((c) => c.id !== deletedId) ?? []
            );
        },
    });
};

// Toggle chef status
export const useToggleChefStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            const chefs = queryClient.getQueryData<Chef[]>(chefsKeys.all);
            const chef = chefs?.find(c => c.id === id);
            if (chef) {
                return api.updateChef({ ...chef, isOpen: !chef.isOpen });
            }
            throw new Error('Chef not found');
        },
        onSuccess: (updatedChef) => {
            queryClient.setQueryData<Chef[]>(chefsKeys.all, (old) =>
                old?.map((c) => (c.id === updatedChef.id ? updatedChef : c)) ?? []
            );
        },
    });
};
