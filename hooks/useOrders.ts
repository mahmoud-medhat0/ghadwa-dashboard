/**
 * Custom Hooks for Orders Data
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Order } from '../types';
import * as api from '../services/api';

export const ordersKeys = {
    all: ['orders'] as const,
    detail: (id: number) => ['orders', id] as const,
};

export const useOrders = () => {
    return useQuery({
        queryKey: ordersKeys.all,
        queryFn: api.fetchOrders,
        staleTime: 1000 * 60 * 2, // 2 minutes - orders should refresh more often
    });
};

export const useUpdateOrderStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, status }: { id: number; status: string }) =>
            api.updateOrderStatus(id, status),
        onSuccess: (updatedOrder) => {
            queryClient.setQueryData<Order[]>(ordersKeys.all, (old) =>
                old?.map((o) => (o.id === updatedOrder.id ? updatedOrder : o)) ?? []
            );
        },
    });
};

export const useDeleteOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => api.deleteOrder(id),
        onSuccess: (_, deletedId) => {
            queryClient.setQueryData<Order[]>(ordersKeys.all, (old) =>
                old?.filter((o) => o.id !== deletedId) ?? []
            );
        },
    });
};
