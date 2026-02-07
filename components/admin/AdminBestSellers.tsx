import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as api from '../../services/api';
import { MenuItem } from '../../types';
import { DeleteConfirmModal } from '@/components/Modals';
import { BestSellerTable } from './bestsellers/BestSellerTable';
import { BestSellerFormModal } from './bestsellers/BestSellerFormModal';
import { useMutations } from '../../hooks/useMutations';
import { Loading } from '../../components/Loading';

export const AdminBestSellers: React.FC = () => {
    // Data Fetching
    const { data: menuItems = [], isLoading } = useQuery({ queryKey: ['menuItems'], queryFn: api.fetchMenuItems });
    const { data: chefs = [] } = useQuery({ queryKey: ['chefs'], queryFn: api.fetchChefs });
    const mutations = useMutations();

    // Filter Best Sellers (> 30 orders)
    const bestSellers = menuItems.filter((m: any) => (m.orderCount || 0) > 30);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);
    const [currentItem, setCurrentItem] = useState<MenuItem | null>(null);
    const [formData, setFormData] = useState<any>({
        name: '', price: '', category: 'طواجن', chef: '', desc: '', img: '', rating: 4.9, time: '45 د'
    });

    if (isLoading) return <Loading />;

    const compressImage = (file: File): Promise<string> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 800;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        const MAX_HEIGHT = 800;
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0, width, height);
                    resolve(canvas.toDataURL('image/jpeg', 0.6));
                };
            };
        });
    };

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIsProcessing(true);
            try {
                const compressedBase64 = await compressImage(file);
                setFormData({ ...formData, img: compressedBase64 });
            } catch (err) {
                console.error("Compression failed", err);
            } finally {
                setIsProcessing(false);
            }
        }
    };

    const openAdd = () => {
        setCurrentItem(null);
        setFormData({
            name: '', price: '', category: 'طواجن', chef: chefs[0]?.name || '', desc: '', img: '', rating: 4.9, time: '45 د'
        });
        setIsModalOpen(true);
    };

    const openEdit = (item: MenuItem) => {
        setCurrentItem(item);
        setFormData({
            ...item,
            rating: item.rating || 4.9,
            time: item.time || '45 د'
        });
        setIsModalOpen(true);
    };

    const handleDeleteClick = (id: number) => {
        setItemToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (itemToDelete) {
            mutations.deleteMenuItemMutation.mutate(itemToDelete);
            setItemToDelete(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const itemData = {
            name: formData.name,
            price: Number(formData.price),
            category: formData.category,
            chef: formData.chef,
            img: formData.img,
            rating: Number(formData.rating),
            time: formData.time,
            description: formData.desc
        };

        if (currentItem) {
            mutations.updateMenuItemMutation.mutate({ ...currentItem, ...itemData });
        } else {
            mutations.createMenuItemMutation.mutate({ ...itemData, orderCount: 50 });
        }
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-8 rounded-xl border border-gray-200">
                <div>
                    <h2 className="text-3xl font-black text-gray-900">إدارة الأكثر طلباً</h2>
                    <p className="text-gray-500 text-sm font-bold mt-1">الوجبات المميزة التي تظهر في الواجهة الرئيسية</p>
                </div>
                <button onClick={openAdd} className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-[#6b1c1c] transition-all active:scale-95 flex items-center gap-3">
                    <i className="fa-solid fa-plus-circle"></i> إضافة وجبة مميزة
                </button>
            </div>

            <BestSellerTable
                bestSellers={bestSellers}
                onEdit={openEdit}
                onDelete={handleDeleteClick}
            />

            <BestSellerFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                currentItem={currentItem}
                formData={formData}
                setFormData={setFormData}
                chefs={chefs}
                handleFile={handleFile}
                isProcessing={isProcessing}
            />

            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="إزالة من الأكثر مبيعاً"
                message="هل أنت متأكد من إزالة هذه الوجبة من قسم الأكثر طلباً؟ لن يتم مسح الوجبة من المنيو الأساسي."
            />
        </div>
    );
};
