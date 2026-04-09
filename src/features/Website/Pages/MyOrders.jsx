import React from "react";
import { useGetMyOrdersQuery } from "../../../services/orderApi";
import Header from "../Coman/Header";
import Heros from "../Coman/Heros";

const MyOrders = () => {
  const { data, isLoading } = useGetMyOrdersQuery();
console.log(data)
  const orders = data?.data || [];

  return (
    <>
    
      <div className="container my-5">
        <h2 className="mb-4">🧾 My Orders</h2>

        {isLoading ? (
          <h4>Loading...</h4>
        ) : orders.length === 0 ? (
          <h5>No orders found 😢</h5>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="card mb-4 shadow-sm">
              
              <div className="card-header d-flex justify-content-between">
                <span>
                  <strong>Order ID:</strong> {order._id.slice(-6)}
                </span>
                <span className={`badge 
                    ${order.status === "Pending" && "bg-warning"}
                    ${order.status === "Preparing" && "bg-info"}
                    ${order.status === "Delivered" && "bg-success"}
                    ${order.status === "Cancelled" && "bg-danger"}
                  `}>
                    {order.status}
                  </span>
              </div>

              <div className="card-body">
                
                {/* ITEMS */}
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="d-flex justify-content-between border-bottom py-2"
                  >
                    <span>
                      {item.name} × {item.qty}
                    </span>
                    <span>₹{item.price * item.qty}</span>
                  </div>
                ))}

                {/* TOTAL */}
                <div className="d-flex justify-content-between mt-3 fw-bold">
                  <span>Total</span>
                  <span>₹{order.totalAmount}</span>
                </div>

                {/* ADDRESS */}
                <div className="mt-2 text-muted">
                  📍 {order.address}
                </div>

              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default MyOrders;