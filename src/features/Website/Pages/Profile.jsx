import React, { useState, useEffect } from "react";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../../services/userApi";
import { toast } from "sonner";
import Header from "../Coman/Header";
import Heros from "../Coman/Heros";

const Profile = () => {
  const { data, isLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: updating }] = useUpdateProfileMutation();
  console.log(data);
  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    pincode: "",
  });

  // ✅ Fill data when loaded
  useEffect(() => {
    if (data?.user) {
      setForm({
        username: data.user.username || "",
        name: data.user.name || "",
        email: data.user.email || "",
        phone: data.user.phone || "",
        address: data.user.address || "",
        pincode: data.user.pincode || "",
        password: "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProfile(form).unwrap();
      toast.success("Profile updated ✅");
    } catch (err) {
      toast.error(err?.data?.message || "Update failed ❌");
    }
  };

  if (isLoading) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card shadow p-4">
              <h3 className="mb-4 text-center">👤 My Profile</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    value={form.username}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label>Address</label>
                  <textarea
                    name="address"
                    className="form-control"
                    value={form.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label>Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    className="form-control"
                    value={form.pincode}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label>New Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Leave blank to keep same"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={updating}
                >
                  {updating ? "Updating..." : "Update Profile"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
