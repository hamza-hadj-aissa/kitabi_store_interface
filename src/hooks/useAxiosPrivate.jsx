import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = (role) => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    config.headers[
                        "Authorization"
                    ] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            },
            (err) => Promise.reject(err)
        );
        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (err) => {
                const prevRequest = err?.config;
                if (err?.response?.status === 401 && !prevRequest.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh(role);
                    prevRequest.headers[
                        "Authorization"
                    ] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(err);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [auth, refresh, role]);

    return axiosPrivate;
};

export default useAxiosPrivate;
