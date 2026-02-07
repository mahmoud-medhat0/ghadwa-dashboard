
import React from 'react';
import { Modal } from './ui/Modal';

// --- Admin Form Modal ---
interface AdminFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    onSubmit: (e: React.FormEvent) => void;
}

export const AdminFormModal: React.FC<AdminFormModalProps> = ({ isOpen, onClose, title, children, onSubmit }) => (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
        <form onSubmit={onSubmit}>
            {children}
            <div className="mt-8 pt-4 border-t border-gray-100 flex gap-3">
                <button type="button" onClick={onClose} className="flex-1 py-3 bg-gray-50 text-gray-500 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                    إلغاء
                </button>
                <button type="submit" className="flex-[2] py-3 bg-primary text-white rounded-xl font-bold hover:bg-[#6b1c1c] transition-all active:scale-95">
                    حفظ التغييرات
                </button>
            </div>
        </form>
    </Modal>
);

// --- Delete Confirmation Modal ---
interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
        <div className="text-center py-4">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl animate-bounce">
                <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
            <p className="text-gray-600 font-medium mb-8 leading-relaxed">{message}</p>
            <div className="flex gap-3">
                <button onClick={onClose} className="flex-1 py-3 bg-gray-50 text-gray-500 rounded-xl font-bold hover:bg-gray-100 transition-colors">
                    تراجع
                </button>
                <button onClick={() => { onConfirm(); onClose(); }} className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-all active:scale-95">
                    نعم، احذف
                </button>
            </div>
        </div>
    </Modal>
);
