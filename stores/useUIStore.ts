import { create } from 'zustand';
import { Order } from '../types';

interface ToastState {
    message: string;
    type: 'success' | 'error';
}

interface UIState {
    // Toast State
    toast: ToastState | null;
    showToast: (message: string, type?: 'success' | 'error') => void;
    hideToast: () => void;

    // Order View State
    viewingOrder: Order | null;
    setViewingOrder: (order: Order | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
    // Toast
    toast: null,
    showToast: (message, type = 'success') => set({ toast: { message, type } }),
    hideToast: () => set({ toast: null }),

    // Order View
    viewingOrder: null,
    setViewingOrder: (order) => set({ viewingOrder: order }),
}));
