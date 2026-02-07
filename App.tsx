import React from 'react';
import { Toast } from './components/UIHelpers';
import { AppRoutes } from './routes/AppRoutes';

const App: React.FC = () => {
    return (
        <>
            <AppRoutes />
            <Toast />
        </>
    );
};

export default App;
