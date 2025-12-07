// API URL konfiguratsiyasi
const isDevelopment = import.meta.env.MODE === 'development';

// Development va production uchun API URL
export const API_URL = isDevelopment 
  ? 'https://rttm.astiedu.uz/api' 
  : 'https://rttm.astiedu.uz/api';

import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor - har bir so'rovga token qo'shish
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - xatoliklarni tekshirish
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Token muddati tugagan yoki yaroqsiz
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        toast.error('Sessiya muddati tugadi. Qayta tizimga kiring');
        window.location.href = '/login';
      }
      // Server xatoligi
      else if (error.response.status === 500) {
        toast.error('Serverda xatolik yuz berdi');
      }
      // Boshqa xatoliklar
      else {
        toast.error(error.response.data?.message || 'Xatolik yuz berdi');
      }
    } else if (error.request) {
      // So'rov yuborildi, lekin javob kelmadi
      toast.error('Server bilan aloqa yo\'q');
    } else {
      // So'rov yuborishda xatolik
      toast.error('So\'rov yuborishda xatolik yuz berdi');
    }
    return Promise.reject(error);
  }
);

export default api;