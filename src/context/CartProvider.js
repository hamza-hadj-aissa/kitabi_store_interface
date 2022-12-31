import { createContext, useEffect, useState } from "react";
import axios from '../api/axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/cart")
            .then((response) => {
                if (response.data.success) {
                    setCart(response.data.cart);
                } else {
                    throw Response(
                        response.data.message ?? response.statusText,
                        response.status
                    );
                }
            });
    }, []);

    const removeFromCart = async (id) => {
        return await axios
            .delete(`/cart/remove-from-cart/${id}`)
            .then((response) => {
                if (response.data.success) {
                    setCart(response.data.cart);
                } else {
                    throw Response(
                        response.data.message
                            ? response.data.message
                            : response.statusText,
                        response.status
                    );
                }
            });
    };

    const addToCart = async (id) => {
        return await axios
            .get(`/cart/add-to-cart/${id}`)
            .then((response) => {
                if (response.data.success) {
                    setCart(response.data.cart);
                } else {
                    throw Response(
                        response.data.message
                            ? response.data.message
                            : response.statusText,
                        response.status
                    );
                }
            });
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}