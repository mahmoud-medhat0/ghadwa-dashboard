/**
 * API Service Layer - Supabase Integration with Column Name Transformation
 */

import { Chef, MenuItem, Order, Box, PromoCode, ContactSettings, Partner, Category } from '../types';
import { supabase } from './supabase';

// ============== HELPER FUNCTIONS ==============
// Transform snake_case (database) to camelCase (JavaScript)
const toCamelCase = (obj: any): any => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(toCamelCase);

    return Object.keys(obj).reduce((acc, key) => {
        const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
        acc[camelKey] = toCamelCase(obj[key]);
        return acc;
    }, {} as any);
};

// Transform camelCase (JavaScript) to snake_case (database)
const toSnakeCase = (obj: any): any => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(toSnakeCase);

    return Object.keys(obj).reduce((acc, key) => {
        const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
        acc[snakeKey] = toSnakeCase(obj[key]);
        return acc;
    }, {} as any);
};

// ============== CHEFS ==============
export const fetchChefs = async (): Promise<Chef[]> => {
    const { data, error } = await supabase.from('chefs').select('*');
    if (error) throw error;
    return (data || []).map(toCamelCase);
};

export const createChef = async (chef: Omit<Chef, 'id'>): Promise<Chef> => {
    const { data, error } = await supabase.from('chefs').insert(toSnakeCase(chef)).select().single();
    if (error) throw error;
    return toCamelCase(data);
};

export const updateChef = async (chef: Chef): Promise<Chef> => {
    const { id, ...rest } = chef;
    const { data, error } = await supabase.from('chefs').update(toSnakeCase(rest)).eq('id', id).select().single();
    if (error) throw error;
    return toCamelCase(data);
};

export const deleteChef = async (id: number): Promise<void> => {
    const { error } = await supabase.from('chefs').delete().eq('id', id);
    if (error) throw error;
};

// ============== CATEGORIES ==============
export const fetchCategories = async (): Promise<Category[]> => {
    const { data, error } = await supabase.from('categories').select('*');
    if (error) throw error;
    return (data || []).map(toCamelCase);
};

export const createCategory = async (category: Omit<Category, 'id'>): Promise<Category> => {
    const { data, error } = await supabase.from('categories').insert(toSnakeCase(category)).select().single();
    if (error) throw error;
    return toCamelCase(data);
};

export const updateCategory = async (category: Category): Promise<Category> => {
    const { id, ...rest } = category;
    const { data, error } = await supabase.from('categories').update(toSnakeCase(rest)).eq('id', id).select().single();
    if (error) throw error;
    return toCamelCase(data);
};

export const deleteCategory = async (id: number): Promise<void> => {
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) throw error;
};

// ============== MENU ITEMS (MEALS) ==============
export const fetchMenuItems = async (): Promise<MenuItem[]> => {
    const { data, error } = await supabase.from('menu_items').select('*');
    if (error) throw error;
    return (data || []).map(toCamelCase);
};

export const createMenuItem = async (item: Omit<MenuItem, 'id'>): Promise<MenuItem> => {
    const { data, error } = await supabase.from('menu_items').insert(toSnakeCase(item)).select().single();
    if (error) throw error;
    return toCamelCase(data);
};

export const updateMenuItem = async (item: MenuItem): Promise<MenuItem> => {
    const { id, ...rest } = item;
    const { data, error } = await supabase.from('menu_items').update(toSnakeCase(rest)).eq('id', id).select().single();
    if (error) throw error;
    return toCamelCase(data);
};

export const deleteMenuItem = async (id: number): Promise<void> => {
    const { error } = await supabase.from('menu_items').delete().eq('id', id);
    if (error) throw error;
};

// ============== OFFERS ==============
export const fetchOffers = async (): Promise<MenuItem[]> => {
    const { data, error } = await supabase.from('offers').select('*');
    if (error) throw error;
    return (data || []).map(toCamelCase);
};

export const createOffer = async (offer: Omit<MenuItem, 'id'>): Promise<MenuItem> => {
    const { data, error } = await supabase.from('offers').insert(toSnakeCase(offer)).select().single();
    if (error) throw error;
    return toCamelCase(data);
};

export const updateOffer = async (offer: MenuItem): Promise<MenuItem> => {
    const { id, ...rest } = offer;
    const { data, error } = await supabase.from('offers').update(toSnakeCase(rest)).eq('id', id).select().single();
    if (error) throw error;
    return toCamelCase(data);
};

export const deleteOffer = async (id: number): Promise<void> => {
    const { error } = await supabase.from('offers').delete().eq('id', id);
    if (error) throw error;
};

// ============== FROZEN ITEMS ==============
export const fetchFrozenItems = async (): Promise<MenuItem[]> => {
    const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .or('category.eq.frozen,category.eq.مجمدات,name.ilike.%مجمد%,name.ilike.%مفرزة%,name.ilike.%تجهيز%');
    if (error) throw error;
    return (data || []).map(toCamelCase);
};

// ============== BOXES ==============
export const fetchBoxes = async (): Promise<Box[]> => {
    const { data, error } = await supabase.from('boxes').select('*');
    if (error) throw error;
    return (data || []).map(toCamelCase);
};

export const createBox = async (box: Omit<Box, 'id'>): Promise<Box> => {
    const { data, error } = await supabase.from('boxes').insert(toSnakeCase(box)).select().single();
    if (error) throw error;
    return toCamelCase(data);
};

export const updateBox = async (box: Box): Promise<Box> => {
    const { id, ...rest } = box;
    const { data, error } = await supabase.from('boxes').update(toSnakeCase(rest)).eq('id', id).select().single();
    if (error) throw error;
    return toCamelCase(data);
};

export const deleteBox = async (id: number): Promise<void> => {
    const { error } = await supabase.from('boxes').delete().eq('id', id);
    if (error) throw error;
};

// ============== ORDERS ==============
export const fetchOrders = async (): Promise<Order[]> => {
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return (data || []).map(toCamelCase);
};

export const updateOrderStatus = async (id: number, status: string): Promise<Order> => {
    const { data, error } = await supabase.from('orders').update({ status }).eq('id', id).select().single();
    if (error) throw error;
    return toCamelCase(data);
};

export const deleteOrder = async (id: number): Promise<void> => {
    const { error } = await supabase.from('orders').delete().eq('id', id);
    if (error) throw error;
};

// ============== PARTNERS ==============
export const fetchPartners = async (): Promise<Partner[]> => {
    const { data, error } = await supabase.from('partners').select('*');
    if (error) throw error;
    return (data || []).map(toCamelCase);
};

export const createPartner = async (partner: Omit<Partner, 'id'>): Promise<Partner> => {
    const { data, error } = await supabase.from('partners').insert(toSnakeCase(partner)).select().single();
    if (error) throw error;
    return toCamelCase(data);
};

export const deletePartner = async (id: number): Promise<void> => {
    const { error } = await supabase.from('partners').delete().eq('id', id);
    if (error) throw error;
};

// ============== PROMO CODES ==============
export const fetchPromoCodes = async (): Promise<PromoCode[]> => {
    const { data, error } = await supabase.from('promo_codes').select('*');
    if (error) throw error;
    return (data || []).map(toCamelCase);
};

export const createPromoCode = async (code: Omit<PromoCode, 'id'>): Promise<PromoCode> => {
    const { data, error } = await supabase.from('promo_codes').insert(toSnakeCase(code)).select().single();
    if (error) throw error;
    return toCamelCase(data);
};

export const deletePromoCode = async (id: number): Promise<void> => {
    const { error } = await supabase.from('promo_codes').delete().eq('id', id);
    if (error) throw error;
};

// ============== SETTINGS ==============
export const fetchSettings = async (): Promise<ContactSettings> => {
    const { data, error } = await supabase.from('site_settings').select('*').single();
    if (error) throw error;
    return toCamelCase(data);
};

export const updateSettings = async (settings: ContactSettings): Promise<ContactSettings> => {
    const { data, error } = await supabase.from('site_settings').upsert(toSnakeCase(settings)).select().single();
    if (error) throw error;
    return toCamelCase(data);
};

// ============== IMAGE UPLOAD ==============
export const uploadImage = async (file: File, folder: string): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const randomString = Math.random().toString(36).substring(7);
    const fileName = `${folder}/${Date.now()}_${randomString}.${fileExt}`;

    const { error } = await supabase.storage.from('public-images').upload(fileName, file);
    if (error) {
        throw new Error(`Upload failed: ${error.message}`);
    }

    const { data } = supabase.storage.from('public-images').getPublicUrl(fileName);
    return data.publicUrl;
};

// ============== DASHBOARD STATS ==============
export const fetchDashboardStats = async () => {
    const [orders, chefs, menuItems, offers, boxes, partners, promoCodes, allOrders] = await Promise.all([
        supabase.from('orders').select('*', { count: 'exact', head: true }),
        supabase.from('chefs').select('*', { count: 'exact', head: true }),
        supabase.from('menu_items').select('*', { count: 'exact', head: true }),
        supabase.from('offers').select('*', { count: 'exact', head: true }),
        supabase.from('boxes').select('*', { count: 'exact', head: true }),
        supabase.from('partners').select('*', { count: 'exact', head: true }),
        supabase.from('promo_codes').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('total, status'),
    ]);

    // Calculate order statistics
    const ordersList = allOrders.data || [];
    const totalOrderValue = ordersList.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
    const avgOrderValue = ordersList.length > 0 ? Math.round(totalOrderValue / ordersList.length) : 0;
    const pendingOrders = ordersList.filter(o => o.status === 'pending' || o.status === 'جديد' || o.status === 'قيد التحضير').length;
    const completedOrders = ordersList.filter(o => o.status === 'completed' || o.status === 'delivered' || o.status === 'تم التسليم' || o.status === 'مكتمل').length;
    const cancelledOrders = ordersList.filter(o => o.status === 'cancelled' || o.status === 'ملغي').length;

    return {
        ordersCount: orders.count || 0,
        chefsCount: chefs.count || 0,
        mealsCount: menuItems.count || 0,
        offersCount: offers.count || 0,
        boxesCount: boxes.count || 0,
        partnersCount: partners.count || 0,
        promoCodesCount: promoCodes.count || 0,
        avgOrderValue,
        pendingOrders,
        completedOrders,
        cancelledOrders,
    };
};

export const fetchRecentActivity = async () => {
    const { data: recentOrders } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

    return {
        recentOrders: (recentOrders || []).map(toCamelCase)
    };
};
