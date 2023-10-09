import React from 'react'
import axios from '../api/axios'
import useAuth from './useAuth';


interface authProps {
    roles?: string[],
    email?: string,
    accessToken?: string,
    password?: string
}

const useRefreshToken = () => {
    const { setAuth }: any = useAuth();

    const refresh= async ()=>{
        try{
            const response = await axios.get('/refreshToken', {
                withCredentials: true
                // sending cookies
            });
            console.log(response?.status);
            setAuth((prev: authProps) => {
                return { ...prev, roles:response?.data.roles, accessToken: response?.data.accessToken }
            });
            return response?.data.accessToken
        }
        catch(err){
            console.log("Refresh error");
            console.log(err);
        }  
    }

    return refresh;
     
}

export default useRefreshToken