import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const UserRoutes = () => {
    const user = useSelector((state) => state.auth.user)
  
    if (!user) return <Navigate to="/login" />
  
    return user.role === "user"
      ? <Outlet />
      : <Navigate to="/" />
  }
  export default UserRoutes