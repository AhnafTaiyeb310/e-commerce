"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getCart, 
  createCart, 
  addCartItem, 
  updateCartItem, 
  removeCartItem 
} from "@/lib/api";

const CartContext = createContext();

export function CartProvider({ children }) {
  const queryClient = useQueryClient();
  const [cartId, setCartId] = useState(null);

  // Initialize cart_id from localStorage on client mount
  useEffect(() => {
    const storedCartId = localStorage.getItem("cart_id");
    if (storedCartId) {
      setCartId(storedCartId);
    }
  }, []);

  // Fetch cart data if cartId exists
  const { data: cart, isLoading } = useQuery({
    queryKey: ["cart", cartId],
    queryFn: () => getCart(cartId),
    enabled: !!cartId,
    retry: 1,
    onError: (err) => {
      // If 404, the cart was likely deleted from the backend. Clear local ID.
      if (err?.response?.status === 404) {
        localStorage.removeItem("cart_id");
        setCartId(null);
      }
    }
  });

  // Automatically create a cart when adding the first item
  const ensureCart = async () => {
    if (cartId) return cartId;
    
    // Create new cart
    const newCart = await createCart();
    const newCartId = newCart.id;
    
    localStorage.setItem("cart_id", newCartId);
    setCartId(newCartId);
    return newCartId;
  };

  // Add to Cart Mutation
  const addToCartMutation = useMutation({
    mutationFn: async ({ productId, quantity, variantId = null }) => {
      const activeCartId = await ensureCart();
      return addCartItem(activeCartId, { 
        product_id: productId, 
        quantity, 
        variant_id: variantId 
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart", cartId]);
    }
  });

  // Update Item Mutation
  const updateQuantityMutation = useMutation({
    mutationFn: ({ itemId, quantity }) => {
      return updateCartItem(cartId, itemId, { quantity });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart", cartId]);
    }
  });

  // Remove Item Mutation
  const removeItemMutation = useMutation({
    mutationFn: (itemId) => {
      return removeCartItem(cartId, itemId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart", cartId]);
    }
  });

  const value = {
    cart,
    isLoading,
    cartId,
    
    // Total numbers
    totalItems: cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0,
    totalPrice: cart?.total_price || 0,
    
    // Actions
    addToCart: (productId, quantity = 1, variantId = null) => 
      addToCartMutation.mutateAsync({ productId, quantity, variantId }),
      
    updateQuantity: (itemId, quantity) => 
      updateQuantityMutation.mutateAsync({ itemId, quantity }),
      
    removeFromCart: (itemId) => 
      removeItemMutation.mutateAsync(itemId),

    clearCart: () => {
      localStorage.removeItem("cart_id");
      setCartId(null);
      queryClient.setQueryData(["cart", cartId], null);
    },
      
    // Status indicators
    isAdding: addToCartMutation.isPending,
    isUpdating: updateQuantityMutation.isPending,
    isRemoving: removeItemMutation.isPending,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
