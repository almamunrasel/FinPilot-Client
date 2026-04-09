import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

const useAxiosSecure = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Request interceptor — attach token
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem("finease_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Response interceptor — handle 401/403
    const resInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      async (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          await logout();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [logout, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;