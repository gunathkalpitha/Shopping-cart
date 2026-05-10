import React, { createContext, useState, useCallback } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState({
    items: [],
    total: 0,
  });

  const addToCart = useCallback((product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find((item) => item._id === product._id);

      if (existingItem) {
        return {
          ...prevCart,
          items: prevCart.items.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
          total: prevCart.total + product.price * quantity,
        };
      }

      return {
        items: [...prevCart.items, { ...product, quantity }],
        total: prevCart.total + product.price * quantity,
      };
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prevCart) => {
      const item = prevCart.items.find((item) => item._id === productId);
      if (!item) return prevCart;

      return {
        items: prevCart.items.filter((item) => item._id !== productId),
        total: prevCart.total - item.price * item.quantity,
      };
    });
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    setCart((prevCart) => {
      const item = prevCart.items.find((item) => item._id === productId);
      if (!item) return prevCart;

      const quantityDiff = quantity - item.quantity;

      if (quantity <= 0) {
        return {
          items: prevCart.items.filter((item) => item._id !== productId),
          total: prevCart.total - item.price * item.quantity,
        };
      }

      return {
        ...prevCart,
        items: prevCart.items.map((item) =>
          item._id === productId ? { ...item, quantity } : item
        ),
        total: prevCart.total + item.price * quantityDiff,
      };
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart({ items: [], total: 0 });
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
