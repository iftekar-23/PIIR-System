import axios from "axios";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000"
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // REQUEST INTERCEPTOR
    const reqInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const token = await user.getIdToken(); // Firebase token
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // RESPONSE INTERCEPTOR
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.error("AXIOS ERROR:", error);

        const status = error?.response?.status;

        if (status === 401 || status === 403) {
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
