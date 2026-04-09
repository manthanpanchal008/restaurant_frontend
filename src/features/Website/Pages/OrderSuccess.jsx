import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

function OrderSuccess() {
  const location = useLocation();
  const orderDetails = location.state?.order;

  return (
    <div className="container py-6 min-vh-100 d-flex align-items-center justify-content-center">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="card shadow-lg border-0 p-5 text-center rounded-5 overflow-hidden"
        style={{ maxWidth: "500px" }}
      >
        {/* 🎉 SCELIBRATION ICON */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-4"
        >
          <div className="bg-success text-white d-inline-flex align-items-center justify-content-center rounded-circle shadow-sm" style={{ width: "80px", height: "80px" }}>
            <i className="fa fa-check fs-1"></i>
          </div>
        </motion.div>

        <h1 className="display-6 fw-bold text-dark mb-3">Order Placed!</h1>
        <p className="text-muted mb-4 px-3">
          Thank you for choosing <span className="text-primary fw-bold">CaterServ</span>. Your delicious meal is being prepared with care.
        </p>

        {/* 📋 ORDER CARD */}
        <div className="bg-light rounded-4 p-4 mb-4 text-start">
           <div className="d-flex justify-content-between mb-2">
              <span className="text-muted small">Order ID:</span>
              <span className="fw-bold small">{orderDetails?._id?.slice(-8).toUpperCase() || "NEW-ORDER"}</span>
           </div>
           <hr className="opacity-10" />
           <div className="d-flex justify-content-between">
              <span className="fw-bold">Total Paid:</span>
              <span className="fw-bold text-success fs-5">₹{orderDetails?.totalAmount || '0'}</span>
           </div>
        </div>

        <div className="d-flex flex-column gap-3">
          <Link to="/myorders" className="btn btn-primary rounded-pill py-3 fw-bold shadow-sm">
             <i className="fa fa-map-marker-alt me-2"></i>Track Your Order
          </Link>
          <Link to="/menu" className="btn btn-outline-primary rounded-pill py-2 fw-semibold border-0">
             Continue Shopping
          </Link>
        </div>

        <div className="mt-5 text-muted small">
           <i className="fa fa-clock me-1"></i> Estimated Delivery: 30-45 mins
        </div>
      </motion.div>
    </div>
  );
}

export default OrderSuccess;
