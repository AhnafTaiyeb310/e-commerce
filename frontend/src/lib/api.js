import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const csrfToken = Cookies.get("csrftoken");

  if (csrfToken && config.method !== "get") {
    config.headers["X-CSRFToken"] = csrfToken;
  }
  return config;
});

// Helper for Fetching products
export const fetchProducts = async (params = {}) => {
  try {
    const response = await api.get("/api/store/products/", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Helper for Fetching single product by ID
export const fetchProductDetail = async (id) => {
  try {
    const response = await api.get(`/api/store/products/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

// Helper for Fetching categories
export const fetchCategories = async (params = {}) => {
  try {
    const response = await api.get("/api/store/categories/", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// Helper for Fetching collections
export const fetchCollections = async () => {
  try {
    const response = await api.get("/api/store/collections/");
    return response.data;
  } catch (error) {
    console.error("Error fetching collections:", error);
    throw error;
  }
};

// --- CART HELPERS ---

export const createCart = async () => {
  try {
    const response = await api.post("/api/store/carts/");
    return response.data;
  } catch (error) {
    console.error("Error creating cart:", error);
    throw error;
  }
};

export const getCart = async (cartId) => {
  try {
    const response = await api.get(`/api/store/carts/${cartId}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching cart ${cartId}:`, error);
    throw error;
  }
};

export const addCartItem = async (cartId, itemsData) => {
  try {
    const response = await api.post(`/api/store/carts/${cartId}/items/`, itemsData);
    return response.data;
  } catch (error) {
    console.error(`Error adding item to cart ${cartId}:`, error);
    throw error;
  }
};

export const updateCartItem = async (cartId, itemId, quantityData) => {
  try {
    const response = await api.patch(`/api/store/carts/${cartId}/items/${itemId}/`, quantityData);
    return response.data;
  } catch (error) {
    console.error(`Error updating item ${itemId} in cart ${cartId}:`, error);
    throw error;
  }
};

export const removeCartItem = async (cartId, itemId) => {
  try {
    const response = await api.delete(`/api/store/carts/${cartId}/items/${itemId}/`);
    return response.data;
  } catch (error) {
    console.error(`Error removing item ${itemId} from cart ${cartId}:`, error);
    throw error;
  }
};

// --- ACCOUNT HELPERS ---

export const fetchOrders = async () => {
  try {
    const response = await api.get("/api/store/orders/");
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const fetchAddresses = async () => {
  try {
    const response = await api.get("/api/store/addresses/");
    return response.data;
  } catch (error) {
    console.error("Error fetching addresses:", error);
    throw error;
  }
};

export const updateProfile = async (data) => {
  try {
    const response = await api.patch("/api/store/customers/me/", data);
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

// --- ORDER HELPERS ---

export const createOrder = async (orderData) => {
  try {
    const response = await api.post("/api/store/orders/", orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const fetchOrderDetail = async (id) => {
  try {
    const response = await api.get(`/api/store/orders/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching order ${id}:`, error);
    throw error;
  }
};

export const addAddress = async (data) => {
  try {
    const response = await api.post("/api/store/addresses/", data);
    return response.data;
  } catch (error) {
    console.error("Error adding address:", error);
    throw error;
  }
};

export const updateAddress = async (id, data) => {
  try {
    const response = await api.patch(`/api/store/addresses/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating address ${id}:`, error);
    throw error;
  }
};

export const deleteAddress = async (id) => {
  try {
    const response = await api.delete(`/api/store/addresses/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting address ${id}:`, error);
    throw error;
  }
};
