import axios from 'axios';

const axiosInstanceClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

axiosInstanceClient.interceptors.request.use(
  (config) => {
    const tokenCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='));

    const token = tokenCookie ? tokenCookie.split('=')[1] : '';

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstanceClient;
