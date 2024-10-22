import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import AppContext from '../../AppContext'


const Protected = ({ page }) => {

  const {user} = useContext(AppContext);

  if(user){
    return page;
  }

  return (
    <Navigate to={"/"}></Navigate>
  )
}

export default Protected