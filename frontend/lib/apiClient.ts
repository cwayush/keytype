import axios, { AxiosInstance } from 'axios';
// import { TokenManager } from './tokenManager';

export const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
  timeout: 5000,
});

// apiClient.interceptors.request.use(config => {
//   const token = TokenManager.getToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }  
//   return config;
// });

// apiClient.interceptors.response.use(
//   res => res,
//   err => {
//     if (err.response?.status === 401) {
//       console.warn('Unauthorized - logging out');
//     }
//     return Promise.reject(err);
//   }
// );
