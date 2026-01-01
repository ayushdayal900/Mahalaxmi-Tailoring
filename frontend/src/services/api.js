import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getProducts = async () => {
    try {
        const response = await api.get('/products');
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

// Get Single Product by ID
export const getProductById = async (id) => {
    try {
        const response = await api.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product ${id}:`, error);
        throw error;
    }
};

export const getCategories = async () => {
    try {
        const response = await api.get('/categories');
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

// Measurements API
export const getMeasurements = async (token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await api.get('/measurements', config);
    return response.data;
};

export const updateMeasurements = async (data, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await api.post('/measurements', data, config);
    return response.data;
};

export default api;
