import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

 const PrivateRoute = ({isauthenticate}) => {
  const user = useSelector((state) => state.auth.user)
  if (!user) return <Navigate to="/login" />
  return (
     user.role === "admin" ? <Outlet/> : <Navigate to="/login" />
  )
}
export default PrivateRoute
