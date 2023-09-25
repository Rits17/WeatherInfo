import React from 'react'
import useAuth from '../hooks/useAuth'
import { all } from 'axios';
import { Outlet,Navigate,useLocation } from 'react-router-dom';
import { Unauthorized } from './Unauthorized';

interface Props<T> {
    allowedRoles?: T[]
}

interface authProps<T>{
    roles?:T[],
    email?:string,
    accessToken?:string,
    password?:string
}


export const RequireAuth =<T,>({allowedRoles}:Props<T>) => {
    const {auth}:any =useAuth();
    const location=useLocation();

  return (
    auth?.roles?.find((role: T) => allowedRoles?.includes(role))?
    <Outlet />:
    auth?.email ? <Navigate to='/Unauthorized' state={{from:location}} replace/>: <Navigate to='/Login' state={{from:location}} replace/>
  )
}
