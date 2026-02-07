/**
 * Create Admin User Script
 * Run this script ONCE to create the admin account in Supabase Auth
 * 
 * Usage: 
 * 1. Open your browser console on the app
 * 2. Copy and paste this code
 * 3. Run it once to create the admin account
 */

import { createAdminUser } from './services/authService';

const ADMIN_EMAIL = 'admin@ghadwa.com';
const ADMIN_PASSWORD = 'Ghadwa@2026!Secure';

async function setupAdmin() {
    try {
        console.log('Creating admin user...');
        await createAdminUser(ADMIN_EMAIL, ADMIN_PASSWORD);
        console.log('✅ Admin user created successfully!');
        console.log('Email:', ADMIN_EMAIL);
        console.log('Password:', ADMIN_PASSWORD);
    } catch (error) {
        console.error('❌ Error creating admin user:', error);
    }
}

// Run the setup
setupAdmin();
