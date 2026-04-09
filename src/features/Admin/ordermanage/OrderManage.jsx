import React from "react";
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../../services/orderApi";
import { toast } from "sonner";
import Aheader from "../acomponent/Aheader";
import Aheros from "../acomponent/Aheros";

const OrderManage = () => {
  const { data, isLoading } = useGetAllOrdersQuery();
  const [updateStatus] = useUpdateOrderStatusMutation();

  const orders = data?.orders || [];

  const handleStatusChange = async (id, status) => {
    try {
      await updateStatus({ id, status }).unwrap();
      toast.success("Status updated ✅");
    } catch (err) {
      toast.error("Failed ❌");
    }
  };

  if (isLoading) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <>
    <Aheader/>
      <Aheros name={"Manage order"} title={"Manage orders"}/>
   
    <div className="container my-5">
      <h2 className="mb-4">📦 Order Management</h2>

      <div className="table-responsive">
        <table className="table table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>Date</th>
              <th>Customer</th>
              <th>Address & Phone</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                {/* DATE */}
                <td>
                  {new Date(order.createdAt).toLocaleDateString()}
                  <br />
                  <small className="text-muted">
                    {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </small>
                </td>

                {/* USER */}
                <td>
                  <strong>{order.user?.name}</strong>
                  <br />
                  <small>{order.user?.email}</small>
                </td>

                {/* ADDRESS & PHONE */}
                <td className="text-start">
                  <div className="small">
                    <i className="fa fa-map-marker-alt text-danger me-1"></i>
                    {order.address}
                    <br />
                    <i className="fa fa-map-pin text-primary me-1"></i>
                    PIN: {order.pin || "N/A"}
                    <br />
                    <i className="fa fa-phone text-success me-1"></i>
                    {order.phone || "N/A"}
                  </div>
                </td>

                {/* ITEMS */}
                <td className="text-start">
                  {order.items.map((item, i) => (
                    <div key={i} className="small border-bottom mb-1">
                      {item.name} <span className="text-primary fw-bold">x {item.qty}</span>
                    </div>
                  ))}
                </td>

                {/* TOTAL */}
                <td className="fw-bold">₹{order.totalAmount}</td>

                {/* STATUS */}
                <td>
                  <span className={`badge 
                    ${order.status === "Pending" && "bg-warning text-dark"}
                    ${order.status === "Preparing" && "bg-info"}
                    ${order.status === "Delivered" && "bg-success"}
                    ${order.status === "Cancelled" && "bg-danger"}
                  `}>
                    {order.status}
                  </span>
                </td>

                {/* CHANGE STATUS */}
                <td>
                  <select
                    className="form-select form-select-sm"
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                  >
                    <option>Pending</option>
                    <option>Preparing</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
    </>
  );
};

export default OrderManage;