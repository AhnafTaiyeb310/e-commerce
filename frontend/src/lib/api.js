import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
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

// --- SILENT REFRESH LOGIC ---
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Determine if we should attempt a refresh:
    // 1. It must be a 401 error
    // 2. We haven't already retried this specific request
    // 3. It's not the actual login or refresh endpoint (to avoid infinite loops)
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/api/auth/login/") &&
      !originalRequest.url.includes("/api/auth/token/refresh/")
    ) {
      if (isRefreshing) {
        // If a refresh is already in progress, wait for it to complete
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Attempt to refresh the session via cookies
        await axios.post(
          `${api.defaults.baseURL}/api/auth/token/refresh/`,
          {},
          { withCredentials: true }
        );

        isRefreshing = false;
        processQueue(null);

        // Retry the original request that failed
        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError);

        // If refresh fails, it means the session is truly dead
        // You might want to trigger a logout in your store here
        // but for now we just reject the error
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

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
