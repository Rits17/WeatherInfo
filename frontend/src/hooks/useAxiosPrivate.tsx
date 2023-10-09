import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {

    const { auth }: any = useAuth();
    const refresh=useRefreshToken();


    useEffect(() => {
        const requestIntercept=axiosPrivate.interceptors.request.use((config) => {
            if (!config.headers['Authorization']) {
                config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
            }
            return config
        },
            (error) => Promise.reject(error)
            );

        const responseIntercept=axiosPrivate.interceptors.response.use(
            (response)=>response,
            async (error) => {
                const originalConfig = error?.config;

                if (error?.response.status === 403 && !originalConfig?.retry) {
                    console.log("Hi");
                    originalConfig.retry = true;
                    const newAccessToken= await refresh();
                    originalConfig.headers['Authorization']=`Bearer ${newAccessToken}`;
                    return axiosPrivate(originalConfig);
                }
                console.log("rejecting");
                return Promise.reject(error);
            });

            return ()=>{
                axiosPrivate.interceptors.request.eject(requestIntercept);
                axiosPrivate.interceptors.response.eject(responseIntercept);
            }
    }, [auth,refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;
