
const API_BASE_URL = 'http://127.0.0.1:8000/api/';

export const getProducts = async () => {
    const response = await fetch(`${API_BASE_URL}products/`);
    return response.json();
};
export const getSuppliers = async () => {
    const response = await fetch(`${API_BASE_URL}suppliers/`);
    return response.json();
};
export const getCategories = async () => {
    const response = await fetch(`${API_BASE_URL}categories/`);
    return response.json();
};
export const getTransactions = async () => {
    const response = await fetch(`${API_BASE_URL}stock-transactions/`);
    return response.json();
};

