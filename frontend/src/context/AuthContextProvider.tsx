import React,{ReactNode} from 'react'
import { createContext,useState} from 'react';

interface Props {
  children?: ReactNode
}

export const AuthContext=createContext({});

const AuthContextProvider = ({children}:Props) => {
  const [auth,setAuth]=useState({})

  return (
    <AuthContext.Provider value={{auth,setAuth}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider