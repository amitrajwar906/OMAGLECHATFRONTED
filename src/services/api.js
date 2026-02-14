import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Friend APIs
export const sendFriendRequest = (userId) => api.post('/users/friend-request', { userId });
export const getFriendRequests = () => api.get('/users/friend-requests');
export const acceptFriendRequest = (requestId) => api.post(`/users/friend-request/${requestId}/accept`);
export const rejectFriendRequest = (requestId) => api.post(`/users/friend-request/${requestId}/reject`);
export const getFriends = () => api.get('/users/friends');
export const searchUsers = (query) => api.get(`/users/search?query=${query}`);
export const getAllUsers = () => api.get('/users/all');

export default api;