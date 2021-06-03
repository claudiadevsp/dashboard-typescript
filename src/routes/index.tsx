import React from 'react';
import AppRoutes from './app.routes';
import { BrowserRouter } from 'react-router-dom';

const Routers: React.FC = () => (
    <BrowserRouter>
        <AppRoutes />
    </BrowserRouter>
    
);

export default Routers;
