import React from 'react';
import AppRoutes from './app.routes';
import { BrowserRouter } from 'react-router-dom';
import Auth from './auth.routes';
import { useAuth } from '../hooks/auth';

const Routers: React.FC = () => {
    const { logged } = useAuth();
    return (
        <BrowserRouter >
            {logged ? <AppRoutes /> : <Auth />}
        </BrowserRouter >
    );
};

export default Routers;
