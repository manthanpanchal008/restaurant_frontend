import React from "react";
import Aheader from "../acomponent/Aheader";
import Aheros from "../acomponent/Aheros";
import { useNavigate } from "react-router-dom";
import RevenueChart from "./RevenueChart";
import { useGetAllOrdersQuery } from "../../../services/orderApi";

function Dashboard() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllOrdersQuery();
  
  const orders = data?.orders || [];

  // 📊 Calculations
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce(
    (acc, order) => acc + order.totalAmount,
    0
  );

  const liveOrders = orders.filter(
    (order) => order.status !== "Delivered"
  ).length;

  if (isLoading) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div>
      <Aheader />

      <div className="container py-4">

        {/* 🔹 STATS */}
        <div className="row g-4">

          {/* CARD */}
          <div className="col-md-3">
            <div className="card shadow border-0 p-3 text-white bg-primary rounded-4">
              <div className="d-flex justify-content-between">
                <div>
                  <h6>Total Items</h6>
                  <h3 className="fw-bold">120</h3>
                </div>
                <i className="fa fa-box fs-1 opacity-50"></i>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow border-0 p-3 text-white bg-success rounded-4">
              <div className="d-flex justify-content-between">
                <div>
                  <h6>Orders</h6>
                  <h3 className="fw-bold">{totalOrders}</h3>
                </div>
                <i className="fa fa-shopping-cart fs-1 opacity-50"></i>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow border-0 p-3 text-white bg-warning rounded-4">
              <div className="d-flex justify-content-between">
                <div>
                  <h6>Revenue</h6>
                  <h3 className="fw-bold">₹ {Math.round(totalRevenue)}</h3>
                </div>
                <i className="fa fa-rupee-sign fs-1 opacity-50"></i>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow border-0 p-3 text-white bg-danger rounded-4">
              <div className="d-flex justify-content-between">
                <div>
                  <h6>Users</h6>
                  <h3 className="fw-bold">45</h3>
                </div>
                <i className="fa fa-users fs-1 opacity-50"></i>
              </div>
            </div>
          </div>

        </div>

        {/* 🔹 QUICK ACTIONS */}
        <div className="row mt-5 g-4">

          <div className="col-md-3">
            <div
              className="card p-4 text-center shadow-sm border-0 rounded-4 cursor-pointer hover-shadow"
              onClick={() => navigate("/menuadd")}
              style={{ cursor: "pointer" }}
            >
              <i className="fa fa-plus text-primary fs-2 mb-2"></i>
              <h6>Add Menu</h6>
            </div>
          </div>

          <div className="col-md-3">
            <div
              className="card p-4 text-center shadow-sm border-0 rounded-4"
              onClick={() => navigate("/ordermanage")}
              style={{ cursor: "pointer" }}
            >
              <i className="fa fa-box text-success fs-2 mb-2"></i>
              <h6>Manage Orders</h6>
            </div>
          </div>

          <div className="col-md-3">
            <div
              className="card p-4 text-center shadow-sm border-0 rounded-4"
              onClick={() => navigate("/blogmanage")}
              style={{ cursor: "pointer" }}
            >
              <i className="fa fa-chart-bar text-warning fs-2 mb-2"></i>
              <h6>Reports</h6>
            </div>
          </div>

          <div className="col-md-3">
            <div
              className="card p-4 text-center shadow-sm border-0 rounded-4"
              onClick={() => navigate("/teammanage")}
              style={{ cursor: "pointer" }}
            >
              <i className="fa fa-cog text-dark fs-2 mb-2"></i>
              <h6>Settings</h6>
            </div>
          </div>

        </div>

        {/* 🔹 RECENT ACTIVITY */}
        <div className="row mt-5">
          <div className="col-md-12">
            <div className="card shadow-sm border-0 p-4 rounded-4">
              <h5 className="mb-4">Recent Activity</h5>

              <div className="d-flex flex-column gap-3">

                <div className="d-flex align-items-center">
                  <span className="badge bg-success me-3">●</span>
                  <span>New order placed</span>
                </div>

                <div className="d-flex align-items-center">
                  <span className="badge bg-warning me-3">●</span>
                  <span>Menu item updated</span>
                </div>

                <div className="d-flex align-items-center">
                  <span className="badge bg-primary me-3">●</span>
                  <span>New user registered</span>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;