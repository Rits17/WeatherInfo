import { AuthContext } from "../context/AuthContextProvider";
import React, { useContext } from 'react'


const useAuth = () => {
  return useContext(AuthContext);

}

export default useAuth