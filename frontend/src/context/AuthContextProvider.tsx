import React,{ReactNode} from 'react'
import { createContext,useState} from 'react';

interface Props {
  children?: ReactNode
}
interface authProps{
  roles?:string[],
  email?:string,
  accessToken?:string,
  password?:string
}

export const AuthContext=createContext({});

const AuthContextProvider = ({children}:Props) => {
  const [auth,setAuth]=useState<authProps>({})

  return (
    <AuthContext.Provider value={{auth,setAuth}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider