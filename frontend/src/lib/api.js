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
