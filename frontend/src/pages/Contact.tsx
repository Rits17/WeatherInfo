import React, { useState } from 'react'
import { useEffect } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

const Contact = () => {
  const axiosPrivate=useAxiosPrivate();
  const [employeeMessage,setEmployeeMessage]=useState('');

  useEffect(()=>{
    const getEmployees = async ()=>{
      try{
        const response = await axiosPrivate.get('/employee');
        console.log(response?.data?.message);
        setEmployeeMessage(response?.data?.message);
      }
      catch(err){
        console.log(err);
      }
      
    }
    getEmployees();
    
  },[])


  return (
    <>
    <h1>Contact</h1>
    <h4>{employeeMessage}</h4>
    </>
  )
}

export default Contact