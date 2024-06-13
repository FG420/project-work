import axios from 'axios';
import { cookies } from 'next/headers';

const axiosInstanceServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

axiosInstanceServer.interceptors.request.use(
  (config) => {
    const cookiesConfig = cookies();
    const token = cookiesConfig.get('token')?.value || '';

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstanceServer;
