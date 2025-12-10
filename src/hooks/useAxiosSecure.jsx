import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000'
});

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // ⬇ REQUEST INTERCEPTOR
        const reqInterceptor = axiosSecure.interceptors.request.use(
            async (config) => {
                // Load Firebase token from localStorage
                const token = localStorage.getItem("access-token");
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // ⬇ RESPONSE INTERCEPTOR
        const resInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                console.log("AXIOS ERROR:", error);

                const statusCode = error?.response?.status;

                if (statusCode === 401 || statusCode === 403) {
                    await logOut();
                    navigate("/login");
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        };
    }, [logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;
