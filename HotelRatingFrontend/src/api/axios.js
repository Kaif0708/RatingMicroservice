import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8084', // ApiGateway base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// For testing purposes without actual Okta integration in this local demo,
// we'll assume the API might need some dummy auth header if security is enabled.
// api.interceptors.request.use((config) => {
//     config.headers.Authorization = `Bearer YOUR_TOKEN_HERE`;
//     return config;
// });

export default api;
