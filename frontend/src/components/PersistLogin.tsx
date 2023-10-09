import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth';
import useRefreshToken from '../hooks/useRefreshToken';
import { Outlet } from 'react-router-dom';

interface authProps {
    roles?: string[],
    email?: string,
    accessToken?: string,
    password?: string
}


const PersistLogin = () => {
    const { auth }:any= useAuth();
    const refresh = useRefreshToken();
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const persist=async ()=>{
            try {
                
              console.log("Persiting");  
             await refresh();
            }
            catch (err) {
                console.log(err);
            }
            finally {
                setLoading(false);
            }
        }
        
        !auth?.accessToken ? persist():setLoading(false);

    },[])

    useEffect(() => {
        console.log(`isLoading: ${loading}`)
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    }, [loading])
    

return (
    <>
        {loading ? <p>Loading</p> :
            <Outlet />}
    </>
)

}

export default PersistLogin