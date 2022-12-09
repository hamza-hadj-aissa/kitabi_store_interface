import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';

import { CartProvider } from './context/CartProvider';
import { AuthProvider } from './context/AuthProvider';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <AuthProvider>
            <CartProvider>
                <App />
            </CartProvider>
        </AuthProvider>
    </React.StrictMode>
);
