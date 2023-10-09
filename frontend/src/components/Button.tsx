import React from 'react'
import useRefreshToken from '../hooks/useRefreshToken'

const Button = () => {
  const refresh=useRefreshToken();
  const checkRefresh =async ()=>{
  try
  {
    const newToken=await refresh();
    console.log(newToken);
  }
  catch(err){
    console.log("Token error");
    console.log(err);
  }
}
  return (
    <>
    <div>Button</div>
    <button onClick={checkRefresh}>CheckRefresh</button>
    </>
    
  )
}

export default Button