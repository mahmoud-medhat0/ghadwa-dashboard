import React, { Suspense, lazy } from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import { useUIStore } from '../stores/useUIStore';
import { useMutations } from '../hooks/useMutations'; // Needed for OrdersRoute
import { Loading } from '../components/Loading';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';

// Layouts
import { AdminLayout } from '../layouts/AdminLayout';

// Pages
import { AdminLogin } from '../pages/AdminLogin';

// Lazy Load Pages for Performance
const AdminDashboard = lazy(() => import('../components/admin/AdminDashboard').then(module => ({ default: module.AdminDashboard })));
const AdminOrders = lazy(() => import('../components/admin/AdminOrders').then(module => ({ default: module.AdminOrders })));
const AdminOrderDetails = lazy(() => import('../components/admin/AdminOrderDetails').then(module => ({ default: module.AdminOrderDetails })));
const AdminMeals = lazy(() => import('../components/admin/AdminMeals').then(module => ({ default: module.AdminMeals })));
const AdminChefs = lazy(() => import('../components/admin/AdminChefs').then(module => ({ default: module.AdminChefs })));
const AdminOffers = lazy(() => import('../components/admin/AdminOffers').then(module => ({ default: module.AdminOffers })));
const AdminBoxes = lazy(() => import('../components/admin/AdminBoxes').then(module => ({ default: module.AdminBoxes })));
const AdminFrozen = lazy(() => import('../components/admin/AdminFrozen').then(module => ({ default: module.AdminFrozen })));
const AdminBestSellers = lazy(() => import('../components/admin/AdminBestSellers').then(module => ({ default: module.AdminBestSellers })));
const AdminPromoCodes = lazy(() => import('../components/admin/AdminPromoCodes').then(module => ({ default: module.AdminPromoCodes })));
const AdminContactSettings = lazy(() => import('../components/admin/AdminContactSettings').then(module => ({ default: module.AdminContactSettings })));
const AdminPartners = lazy(() => import('../components/admin/AdminPartners').then(module => ({ default: module.AdminPartners })));
const AdminMenuUpload = lazy(() => import('../components/admin/AdminMenuUpload').then(module => ({ default: module.AdminMenuUpload })));
const AdminCategories = lazy(() => import('../components/admin/AdminCategories').then(module => ({ default: module.AdminCategories })));

// Wrapper component to handle the conditional rendering based on store
const OrdersRoute = () => {
    const { viewingOrder, setViewingOrder } = useUIStore();
    const mutations = useMutations();

    return viewingOrder ? (
        <AdminOrderDetails
            order={viewingOrder}
            onBack={() => setViewingOrder(null)}
            updateOrderStatus={(id, status) => mutations.updateOrderStatusMutation.mutate({ id, status })}
        />
    ) : (
        <AdminOrders />
    );
};

// Root redirect component - redirects based on auth status
const RootRedirect = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <Loading />;
    }

    return <Navigate to={user ? "/admin/dashboard" : "/login"} replace />;
};

// Wrapper component to handle settings data fetching
const SettingsRoute = () => {
    const [settings, setSettings] = React.useState<any>({});
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const loadSettings = async () => {
            try {
                const { fetchSettings } = await import('../services/api');
                const data = await fetchSettings();
                setSettings(data);
            } catch (err) {
                console.error('Failed to load settings', err);
            } finally {
                setIsLoading(false);
            }
        };
        loadSettings();
    }, []);

    const handleUpdate = async (newSettings: any) => {
        try {
            const { updateSettings } = await import('../services/api');
            const updated = await updateSettings(newSettings);
            setSettings(updated);
        } catch (err) {
            console.error('Failed to update settings', err);
        }
    };

    if (isLoading) return <Loading />;
    return <AdminContactSettings settings={settings} onUpdate={handleUpdate} />;
};

export const AppRoutes: React.FC = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path="/" element={<RootRedirect />} />

                {/* Login Route */}
                <Route path="/login" element={<AdminLogin />} />

                {/* Protected Admin Routes */}
                <Route path="/admin" element={
                    <ProtectedRoute>
                        <AdminLayout />
                    </ProtectedRoute>
                }>
                    <Route index element={<Navigate to="/admin/dashboard" replace />} />

                    <Route path="dashboard" element={<AdminDashboard />} />

                    <Route path="orders" element={<OrdersRoute />} />

                    <Route path="categories" element={<AdminCategories />} />

                    <Route path="meals" element={<AdminMeals />} />

                    <Route path="bestsellers" element={<AdminBestSellers />} />

                    <Route path="chefs" element={<AdminChefs />} />

                    <Route path="offers" element={<AdminOffers />} />

                    <Route path="boxes" element={<AdminBoxes />} />

                    <Route path="frozen" element={<AdminFrozen />} />

                    <Route path="partners" element={<AdminPartners />} />

                    <Route path="promos" element={<AdminPromoCodes />} />

                    <Route path="menu-upload" element={<AdminMenuUpload />} />

                    <Route path="settings" element={<SettingsRoute />} />
                </Route>

                {/* Catch all unmatched routes */}
                <Route path="*" element={
                    <div className="flex flex-col items-center justify-center min-h-screen">
                        <h1 className="text-4xl font-bold mb-4">404 - الصفحة غير موجودة</h1>
                        <p className="text-gray-500">المسار المطلوب غير موجود: {window.location.pathname}</p>
                    </div>
                } />
            </Routes>
        </Suspense>
    );
};
