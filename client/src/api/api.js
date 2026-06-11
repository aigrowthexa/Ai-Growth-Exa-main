import axios from 'axios';

const defaultApiBaseUrl = import.meta.env.PROD
    ? 'https://ai-growth-exa-1.onrender.com/api'
    : 'http://localhost:5011/api';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || defaultApiBaseUrl,
});

export default api;
