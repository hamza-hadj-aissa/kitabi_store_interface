import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';

import { CartProvider } from './context/CartProvider';
import { AuthProvider } from './context/AuthProvider';
import { SearchProvider } from './context/SearchProvider';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <SearchProvider>
            <AuthProvider>
                <CartProvider>
                    <App />
                </CartProvider>
            </AuthProvider>
        </SearchProvider>
    </React.StrictMode>
);
