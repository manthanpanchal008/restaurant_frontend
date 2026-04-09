import React from "react";
import {
  useGetUsersQuery,
  useMakeAdminMutation,
  useRemoveAdminMutation,
} from "../../../services/adminApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../slice/authSlice";
import { clearCart } from "../../../slice/cartSlice";
import { toast } from "sonner";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isLoading } = useGetUsersQuery();
  const [makeAdmin] = useMakeAdminMutation();
  const [removeAdmin] = useRemoveAdminMutation();

  const users = data?.users || [];

  // ✅ LOGOUT FUNCTION
  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearCart());
    toast.success("Logout Successfully");
    navigate("/login");
  };

  const handleMakeAdmin = async (id) => {
    try {
      await makeAdmin(id).unwrap();
      toast.success("User promoted to Admin");
    } catch (err) {
      toast.error(err?.data?.error || "Error");
    }
  };

  const handleRemoveAdmin = async (id) => {
    try {
      await removeAdmin(id).unwrap();
      toast.success("Admin removed");
    } catch (err) {
      toast.error(err?.data?.error || "Error");
    }
  };

  if (isLoading) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div className="container my-5">

      {/* 🔥 TOP BAR */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>👑 Admin Panel (Super Admin)</h2>

        <button
          className="btn btn-danger"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped text-center">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={`badge ${
                      user.role === "superadmin"
                        ? "bg-danger"
                        : user.role === "admin"
                        ? "bg-warning text-dark"
                        : "bg-secondary"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td>
                  {user.role !== "admin" && user.role !== "superadmin" && (
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={() => handleMakeAdmin(user._id)}
                    >
                      Make Admin
                    </button>
                  )}

                  {user.role === "admin" && (
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleRemoveAdmin(user._id)}
                    >
                      Remove Admin
                    </button>
                  )}

                  {user.role === "superadmin" && (
                    <span className="text-muted">Super Admin</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;