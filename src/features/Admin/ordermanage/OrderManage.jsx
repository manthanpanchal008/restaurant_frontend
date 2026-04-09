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
              <th>User</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Change</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                
                {/* USER */}
                <td>
                  {order.user?.name}
                  <br />
                  <small>{order.user?.email}</small>
                </td>

                {/* ITEMS */}
                <td>
                  {order.items.map((item, i) => (
                    <div key={i}>
                      {item.name} x {item.qty}
                    </div>
                  ))}
                </td>

                {/* TOTAL */}
                <td>₹{order.totalAmount}</td>

                {/* STATUS */}
                <td>
                  <span className={`badge 
                    ${order.status === "Pending" && "bg-warning"}
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
                    className="form-select"
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