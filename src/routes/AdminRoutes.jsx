import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const user = useSelector((state) => state.auth.user);

  // ❌ not logged in
  if (!user) return <Navigate to="/login" />;

  // ❌ not superadmin
  if (user.role !== "superadmin") return <Navigate to="/" />;

  return <Outlet />;
};

export default AdminRoute;