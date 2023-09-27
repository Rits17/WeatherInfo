import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {

    const { auth }: any = useAuth();


    useEffect(() => {
        const requestIntercept=axiosPrivate.interceptors.request.use((config) => {
            if (!config.headers['Authorization']) {
                config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
            }
            return config
        },
            (error) => {
                return Promise.reject(error);
            });

        const responseIntercept=axiosPrivate.interceptors.response.use((response: any) => {
            if (response) {
                return response;
            }
        },
            (error) => {
                const originalConfig = error?.config;

                if (error?.status === 403 && !originalConfig?.retry) {
                    originalConfig.retry = true;
                    const newAccessToken= useRefreshToken();
                    originalConfig.headers['Authorization']=`Bearer ${newAccessToken}`;
                    return axiosPrivate(originalConfig);
                }
                return Promise.reject(error);
            });

            ()=>{
                axiosPrivate.interceptors.request.eject(requestIntercept);
                axiosPrivate.interceptors.response.eject(responseIntercept);
            }
    }, [auth,useRefreshToken])

    return axiosPrivate;
}

export default useAxiosPrivate;
