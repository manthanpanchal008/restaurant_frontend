import React, { useState, useEffect } from "react";
import { useGetProfileQuery, useUpdateProfileMutation } from "../../../services/userApi";
import { useGetMyOrdersQuery } from "../../../services/orderApi";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("details");
  const { data: profileData, isLoading: profileLoading } = useGetProfileQuery();
  const { data: ordersData, isLoading: ordersLoading } = useGetMyOrdersQuery();
  const [updateProfile, { isLoading: updating }] = useUpdateProfileMutation();

  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    pincode: "",
  });

  useEffect(() => {
    if (profileData?.user) {
      setForm({
        username: profileData.user.username || "",
        name: profileData.user.name || "",
        email: profileData.user.email || "",
        phone: profileData.user.phone || "",
        address: profileData.user.address || "",
        pincode: profileData.user.pincode || "",
        password: "",
      });
    }
  }, [profileData]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(form).unwrap();
      toast.success("Profile updated successfully! ✨");
    } catch (err) {
      toast.error(err?.data?.message || "Update failed ❌");
    }
  };

  if (profileLoading) return (
    <div className="container py-6 text-center">
      <div className="spinner-border text-primary" role="status"></div>
      <h5 className="mt-3">Loading your workspace...</h5>
    </div>
  );

  return (
    <div className="container-fluid bg-light min-vh-100 py-5">
      <div className="container">
        <div className="row g-4">
          
          {/* 📌 SIDEBAR */}
          <div className="col-lg-3">
            <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
              <div className="bg-primary p-4 text-center text-white">
                <div className="bg-white text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3 shadow-sm" style={{ width: "70px", height: "70px" }}>
                   <i className="fa fa-user fs-2"></i>
                </div>
                <h5 className="mb-0 fw-bold">{form.name || "User Name"}</h5>
                <small className="opacity-75">{form.email}</small>
              </div>
              <div className="list-group list-group-flush p-2">
                <button 
                  onClick={() => setActiveTab("details")}
                  className={`list-group-item list-group-item-action border-0 rounded-3 mb-1 ${activeTab === 'details' ? 'active bg-primary' : ''}`}
                >
                  <i className="fa fa-address-card me-2"></i>Account Details
                </button>
                <button 
                  onClick={() => setActiveTab("orders")}
                  className={`list-group-item list-group-item-action border-0 rounded-3 mb-1 ${activeTab === 'orders' ? 'active bg-primary' : ''}`}
                >
                  <i className="fa fa-shopping-bag me-2"></i>Order History
                </button>
                <hr className="my-2 opacity-10" />
                <button className="list-group-item list-group-item-action border-0 rounded-3 text-danger">
                  <i className="fa fa-sign-out-alt me-2"></i>Sign Out
                </button>
              </div>
            </div>
            
            <div className="card shadow-sm border-0 rounded-4 p-3 mt-4 bg-primary text-white">
               <small className="opacity-75">Member Since</small>
               <h6 className="mb-0 fw-bold">{new Date(profileData?.user?.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</h6>
            </div>
          </div>

          {/* 📄 CONTENT AREA */}
          <div className="col-lg-9">
            <AnimatePresence mode="wait">
              {activeTab === "details" ? (
                <motion.div 
                  key="details"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="card shadow-sm border-0 rounded-4 p-4 p-md-5"
                >
                  <h4 className="fw-bold mb-4">Account Settings</h4>
                  <form onSubmit={handleSubmit} className="row g-3">
                    <div className="col-md-6 text-start">
                      <label className="form-label text-muted small fw-bold">USERNAME</label>
                      <input type="text" name="username" className="form-control rounded-pill px-3" value={form.username} onChange={handleChange} />
                    </div>
                    <div className="col-md-6 text-start">
                      <label className="form-label text-muted small fw-bold">FULL NAME</label>
                      <input type="text" name="name" className="form-control rounded-pill px-3" value={form.name} onChange={handleChange} />
                    </div>
                    <div className="col-md-6 text-start">
                      <label className="form-label text-muted small fw-bold">EMAIL ADDRESS</label>
                      <input type="email" name="email" className="form-control rounded-pill px-3 bg-light" value={form.email} disabled />
                    </div>
                    <div className="col-md-6 text-start">
                      <label className="form-label text-muted small fw-bold">PHONE NUMBER</label>
                      <input type="text" name="phone" className="form-control rounded-pill px-3" value={form.phone} onChange={handleChange} />
                    </div>
                    <div className="col-12 text-start">
                      <label className="form-label text-muted small fw-bold">DELIVERY ADDRESS</label>
                      <textarea name="address" className="form-control rounded-4 px-3" rows="3" value={form.address} onChange={handleChange} />
                    </div>
                    <div className="col-md-6 text-start">
                      <label className="form-label text-muted small fw-bold">PINCODE</label>
                      <input type="text" name="pincode" className="form-control rounded-pill px-3" value={form.pincode} onChange={handleChange} />
                    </div>
                    <div className="col-md-6 text-start">
                      <label className="form-label text-muted small fw-bold">NEW PASSWORD</label>
                      <input type="password" name="password" className="form-control rounded-pill px-3" value={form.password} onChange={handleChange} placeholder="Leave blank to keep current" />
                    </div>
                    <div className="col-12 mt-4 text-start">
                      <button type="submit" className="btn btn-primary rounded-pill px-5 py-2 fw-bold shadow-sm" disabled={updating}>
                        {updating ? "Saving Changes..." : "Save Profile Details"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div 
                  key="orders"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                >
                  <div className="d-flex justify-content-between align-items-center mb-4 text-start">
                     <h4 className="fw-bold mb-0">My Recent Orders</h4>
                     <span className="badge bg-white text-primary border rounded-pill px-3 py-2 shadow-sm">{ordersData?.data?.length || 0} Total Orders</span>
                  </div>

                  {ordersLoading ? (
                    <div className="text-center py-5">
                      <div className="spinner-border text-primary"></div>
                    </div>
                  ) : ordersData?.data?.length === 0 ? (
                    <div className="card border-0 shadow-sm rounded-4 p-5 text-center">
                       <i className="fa fa-shopping-basket fs-1 text-muted opacity-25 mb-3"></i>
                       <h5>You haven't ordered anything yet!</h5>
                       <p className="text-muted">Explore our delicious menu and place your first order.</p>
                       <a href="/menu" className="btn btn-primary rounded-pill px-4 mt-2">Go to Menu</a>
                    </div>
                  ) : (
                    <div className="row g-3">
                      {ordersData.data.map((order) => (
                        <div key={order._id} className="col-12">
                          <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
                            <div className="card-header bg-white border-0 py-3 px-4 d-flex justify-content-between align-items-center">
                               <div>
                                  <span className="text-muted small d-block">ORDER ID</span>
                                  <span className="fw-bold fs-6">#{order._id.slice(-8).toUpperCase()}</span>
                               </div>
                               <span className={`badge rounded-pill px-3 py-2 
                                  ${order.status === 'Delivered' ? 'bg-success-subtle text-success' : 
                                    order.status === 'Cancelled' ? 'bg-danger-subtle text-danger' : 'bg-warning-subtle text-warning'}`}>
                                  {order.status}
                               </span>
                            </div>
                            <div className="card-body px-4">
                               {order.items.map((item, idx) => (
                                 <div key={idx} className="d-flex justify-content-between align-items-center mb-2">
                                    <div className="text-start">
                                       <span className="fw-semibold">{item.name}</span>
                                       <span className="text-muted small ms-2">×{item.qty}</span>
                                    </div>
                                    <span className="text-muted">₹{item.price * item.qty}</span>
                                 </div>
                               ))}
                               <hr className="opacity-10" />
                               <div className="d-flex justify-content-between align-items-center">
                                  <div className="text-muted small text-start">
                                     <i className="fa fa-calendar-alt me-1"></i> {new Date(order.createdAt).toLocaleDateString()}
                                  </div>
                                  <div className="fs-5 fw-bold text-success">₹{order.totalAmount}</div>
                               </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
