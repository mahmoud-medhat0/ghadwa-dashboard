/**
 * Authentication Service
 * Handles admin login, logout, and session management using Supabase Auth
 */

import { supabase } from './supabase';

export interface AdminUser {
    id: string;
    email: string;
}

/**
 * Login admin user with email and password
 */
export async function loginAdmin(email: string, password: string): Promise<AdminUser> {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        throw new Error(error.message || 'فشل تسجيل الدخول');
    }

    if (!data.user) {
        throw new Error('فشل تسجيل الدخول');
    }

    return {
        id: data.user.id,
        email: data.user.email || '',
    };
}

/**
 * Logout current admin user
 */
export async function logoutAdmin(): Promise<void> {
    const { error } = await supabase.auth.signOut();

    if (error) {
        throw new Error(error.message || 'فشل تسجيل الخروج');
    }
}

/**
 * Get current authenticated user
 */
export async function getCurrentUser(): Promise<AdminUser | null> {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        return null;
    }

    return {
        id: user.id,
        email: user.email || '',
    };
}

/**
 * Create admin user in Supabase Auth
 * This should only be run once to create the initial admin account
 */
export async function createAdminUser(email: string, password: string): Promise<void> {
    const { error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        throw new Error(error.message || 'فشل إنشاء حساب الأدمن');
    }
}
