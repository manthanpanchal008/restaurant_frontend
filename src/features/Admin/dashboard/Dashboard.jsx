import React from "react";
import Aheader from "../acomponent/Aheader";
import { useNavigate } from "react-router-dom";
import StatusChart from "./StatusChart";
import RevenueChart from "./RevenueChart";
import { useGetAllOrdersQuery } from "../../../services/orderApi";
import { useGetMenuQuery } from "../../../services/menuApi";
import { useGetAllUsersQuery } from "../../../services/authApi";

function Dashboard() {
  const navigate = useNavigate();
  const { data: orderData, isLoading: ordersLoading } = useGetAllOrdersQuery();
  const { data: menuData, isLoading: menuLoading } = useGetMenuQuery();
  const { data: userData, isLoading: usersLoading } = useGetAllUsersQuery();
  
  const orders = orderData?.orders || [];
  const menuItems = menuData?.data || [];
  const users = userData?.data || [];

  // 📊 Calculations
  const totalOrders = orders.length;
  const totalItems = menuItems.length;
  const totalUsers = users.length;
  
  const totalRevenue = orders.reduce(
    (acc, order) => acc + (order.status === "Delivered" ? order.totalAmount : 0),
    0
  );

  if (ordersLoading || menuLoading || usersLoading) return <h3 className="text-center mt-5">Loading Dashboard...</h3>;

  return (
    <div className="bg-light min-vh-100 pb-5">
      <Aheader />

      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold mb-0">Business Intelligence</h4>
            <span className="text-muted small">Real-time Data Active</span>
        </div>

        {/* 🔹 STATS CARDS */}
        <div className="row g-4">
          <div className="col-md-3">
            <div className="card shadow-sm border-0 p-3 text-white bg-primary rounded-4">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="opacity-75">Menu Items</h6>
                  <h3 className="fw-bold mb-0">{totalItems}</h3>
                </div>
                <i className="fa fa-utensils fs-1 opacity-25"></i>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm border-0 p-3 text-white bg-success rounded-4">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="opacity-75">New Orders</h6>
                  <h3 className="fw-bold mb-0">{totalOrders}</h3>
                </div>
                <i className="fa fa-shopping-cart fs-1 opacity-25"></i>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm border-0 p-3 text-white bg-warning rounded-4">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="opacity-75">Confirmed Sales</h6>
                  <h3 className="fw-bold mb-0">₹{Math.round(totalRevenue)}</h3>
                </div>
                <i className="fa fa-wallet fs-1 opacity-25"></i>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-sm border-0 p-3 text-white bg-info rounded-4">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className="opacity-75">Total Users</h6>
                  <h3 className="fw-bold mb-0">{totalUsers}</h3>
                </div>
                <i className="fa fa-users fs-1 opacity-25"></i>
              </div>
            </div>
          </div>
        </div>

        {/* 📊 ANALYTICS CHARTS */}
        <div className="row mt-5 g-4">
          <div className="col-lg-8">
            <div className="card shadow-sm border-0 p-4 rounded-4 h-100">
              <h5 className="fw-bold mb-4">Revenue Trend</h5>
              <div style={{ height: "300px" }}>
                 <RevenueChart orders={orders} />
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card shadow-sm border-0 p-4 rounded-4 h-100">
              <h5 className="fw-bold mb-4">Order Status</h5>
              <div style={{ height: "300px" }} className="d-flex align-items-center justify-content-center">
                 <StatusChart orders={orders} />
              </div>
            </div>
          </div>
        </div>

        {/* 🔹 QUICK ACTIONS */}
        <div className="row mt-5 g-4">
          <div className="col-6 col-md-3">
            <div className="card p-3 text-center shadow-sm border-0 rounded-4" onClick={() => navigate("/menuadd")} style={{ cursor: "pointer" }}>
              <i className="fa fa-plus-circle text-primary fs-3 mb-2"></i>
              <h6 className="mb-0">Add Dish</h6>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card p-3 text-center shadow-sm border-0 rounded-4" onClick={() => navigate("/ordermanage")} style={{ cursor: "pointer" }}>
              <i className="fa fa-tasks text-success fs-3 mb-2"></i>
              <h6 className="mb-0">Orders</h6>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card p-3 text-center shadow-sm border-0 rounded-4" onClick={() => navigate("/blogadd")} style={{ cursor: "pointer" }}>
              <i className="fa fa-pen-nib text-info fs-3 mb-2"></i>
              <h6 className="mb-0">Post Blog</h6>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card p-3 text-center shadow-sm border-0 rounded-4" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
              <i className="fa fa-external-link-alt text-dark fs-3 mb-2"></i>
              <h6 className="mb-0">Visit Site</h6>
            </div>
          </div>
        </div>

        {/* 🔹 LATEST ORDERS */}
        <div className="row mt-5">
          <div className="col-md-12">
            <div className="card shadow-sm border-0 p-4 rounded-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0">Recent Activity</h5>
                <button className="btn btn-sm btn-outline-primary rounded-pill px-3" onClick={() => navigate("/ordermanage")}>Full View</button>
              </div>

              <div className="table-responsive">
                <table className="table table-borderless align-middle">
                  <thead className="text-muted small">
                    <tr>
                      <th>CUSTOMER</th>
                      <th>TOTAL</th>
                      <th>STATUS</th>
                      <th className="text-end">TIME</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order._id}>
                        <td>
                           <div className="d-flex align-items-center">
                              <div className="bg-light rounded-circle p-2 me-2">
                                 <i className="fa fa-user-circle text-primary"></i>
                              </div>
                              <span className="fw-semibold">{order.user?.name || "Guest"}</span>
                           </div>
                        </td>
                        <td className="fw-bold text-success">₹{order.totalAmount}</td>
                        <td>
                          <span className={`badge rounded-pill px-3 
                            ${order.status === "Pending" ? "bg-warning-subtle text-warning" : 
                              order.status === "Delivered" ? "bg-success-subtle text-success" : "bg-info-subtle text-info"}
                          `}>
                            {order.status}
                          </span>
                        </td>
                        <td className="text-muted small text-end">
                           {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;