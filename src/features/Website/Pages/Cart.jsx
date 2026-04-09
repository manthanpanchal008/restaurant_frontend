import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, clearCart, removeFromCart } from "../../../slice/cartSlice";
import { useNavigate } from "react-router-dom";
import Header from "../Coman/Header";
import Heros from "../Coman/Heros";
import { usePlaceOrderMutation } from "../../../services/orderApi";
import { toast } from "sonner";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const [placeOrder, { isLoading }] = usePlaceOrderMutation();
  const user = JSON.parse(localStorage.getItem("user")); 


  // 🧮 Calculations
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const tax = subtotal * 0.02;
  const total = subtotal + tax;

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      toast.error("Cart is empty ❌");
      return;
    }
    console.log(user._id)
    try {
      const orderData = {
        userId: user?._id,
        items: cartItems,
        totalAmount: total,
        address:user?.address, 
        pin:user?.pincode,
        paymentMethod: "COD",
      };

      await placeOrder(orderData).unwrap();

      toast.success("Order placed successfully 🎉");

      dispatch(clearCart()); // ✅ clear redux cart
      navigate("/"); // or success page
    } catch (err) {
      console.log(err);
      toast.error("Order failed ❌");
    }
  };

  return (
    <>
      <Header />
      <Heros name={"Checkout"} title={"Checkout"} />
      <div className="container my-5">
        <div className="row">
          {/* LEFT SIDE */}
          <div className="col-lg-8">
            <h2 className="mb-4">
              Shopping Cart{" "}
              <span className="text-primary">({totalItems} items)</span>
            </h2>

            {cartItems.length === 0 ? (
              <div className="text-center py-5">
                <h4>Your cart is empty 😢</h4>
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => navigate("/menu")}
                >
                  Go to Menu
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item._id} className="card mb-3 shadow-sm border-0">
                  <div className="row g-0 align-items-center">
                    {/* IMAGE */}
                    <div className="col-md-3 text-center p-2">
                      <img
                        src={item.img}
                        className="img-fluid rounded"
                        style={{ maxHeight: "100px", objectFit: "cover" }}
                        alt={item.name}
                      />
                    </div>

                    {/* DETAILS */}
                    <div className="col-md-5">
                      <div className="card-body">
                        <h5 className="card-title mb-1">{item.name}</h5>
                        <p className="text-muted small mb-0">
                          ₹{item.price} per item
                        </p>
                      </div>
                    </div>

                    {/* QTY */}
                    <div className="col-md-2 text-center">
                      <div className="d-flex justify-content-center align-items-center">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => dispatch(removeFromCart(item._id))}
                        >
                          -
                        </button>

                        <span className="mx-2 fw-bold">{item.qty}</span>

                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => dispatch(addToCart(item))}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* SUBTOTAL */}
                    <div className="col-md-2 text-center">
                      <strong>₹{item.price * item.qty}</strong>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* CONTINUE SHOPPING */}
            {cartItems.length > 0 && (
              <button
                className="btn btn-link mt-3"
                onClick={() => navigate("/menu")}
              >
                ← Continue Shopping
              </button>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="col-lg-4">
            <div className="card shadow-sm border-0 p-4">
              <h4 className="mb-3">Order Summary</h4>

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span className="text-success">Free</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Tax (2%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between fw-bold mb-3">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

              <button
                className="btn btn-primary w-100"
                onClick={handlePlaceOrder}
                disabled={isLoading}
              >
                {isLoading ? "Placing..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
