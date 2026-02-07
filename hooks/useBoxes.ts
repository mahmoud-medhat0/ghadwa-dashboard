/**
 * Custom Hooks for Boxes Data
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Box } from '../types';
import * as api from '../services/api';

export const boxesKeys = {
    all: ['boxes'] as const,
};

export const useBoxes = () => {
    return useQuery({
        queryKey: boxesKeys.all,
        queryFn: api.fetchBoxes,
        staleTime: 1000 * 60 * 5,
    });
};

export const useCreateBox = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (box: Omit<Box, 'id'>) => api.createBox(box),
        onSuccess: (newBox) => {
            queryClient.setQueryData<Box[]>(boxesKeys.all, (old) =>
                old ? [...old, newBox] : [newBox]
            );
        },
    });
};

export const useUpdateBox = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (box: Box) => api.updateBox(box),
        onSuccess: (updatedBox) => {
            queryClient.setQueryData<Box[]>(boxesKeys.all, (old) =>
                old?.map((b) => (b.id === updatedBox.id ? updatedBox : b)) ?? []
            );
        },
    });
};

export const useDeleteBox = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => api.deleteBox(id),
        onSuccess: (_, deletedId) => {
            queryClient.setQueryData<Box[]>(boxesKeys.all, (old) =>
                old?.filter((b) => b.id !== deletedId) ?? []
            );
        },
    });
};
