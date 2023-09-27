import React from 'react'
import axios from '../api/axios'
import useAuth from './useAuth';


interface authProps {
    roles?: string[],
    email?: string,
    accessToken?: string,
    password?: string
}

const useRefreshToken = async () => {
    const { setAuth }: any = useAuth();
    const response = await axios.get('/refreshToken', {
        withCredentials: true
    });

    setAuth((prev: authProps) => {
        return { ...prev, accessToken: response?.data.accessToken }
    });
    return response.data.accessToken
}

export default useRefreshToken