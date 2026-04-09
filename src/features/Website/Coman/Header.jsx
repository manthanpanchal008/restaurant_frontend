import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../../slice/authSlice";
import { toast } from "sonner";
import { clearCart } from "../../../slice/cartSlice";

function Header() {
  const user = localStorage.getItem("user");
  const username = JSON.parse(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearCart());
    toast.success("Logout Succesfully");
    navigate("/");
  };
  return (
    <div className="container-fluid fixed-top    nav-bar px-0">
      <div className="container">
        <nav className="navbar navbar-light navbar-expand-lg py-3">
          {/* LOGO */}
          <NavLink to="/" className="navbar-brand m-0">
            <h1 className="text-primary fw-bold mb-0 fs-4">
              Cater<span className="text-dark">Serv</span>
            </h1>
          </NavLink>

          {/* TOGGLER */}
          <button
            className="navbar-toggler py-2 px-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="fa fa-bars text-primary" />
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse">
            {/* ✅ CENTER NAV LINKS */}
            <div className="navbar-nav mx-auto text-center">
              <NavLink to="/" className="nav-item nav-link">
                Home
              </NavLink>
              <NavLink to="/about" className="nav-item nav-link">
                About
              </NavLink>
              <NavLink to="/service" className="nav-item nav-link">
                Services
              </NavLink>
              <NavLink to="/event" className="nav-item nav-link">
                Events
              </NavLink>
              <NavLink to="/menu" className="nav-item nav-link">
                Menu
              </NavLink>
              <NavLink to="/contact" className="nav-item nav-link">
                Contact
              </NavLink>
            </div>

            {/* ✅ RIGHT SIDE (DESKTOP ONLY) */}
            <div className="d-none d-lg-flex align-items-center gap-3">
              {/* 🛒 CART */}
              {totalQty > 0 && (
                <div
                  style={{ position: "relative", cursor: "pointer" }}
                  onClick={() => navigate("/cart")}
                >
                  <i className="fa fa-shopping-cart fs-4 text-primary"></i>

                  {totalQty > 0 && (
                    <span
                      className="badge bg-danger"
                      style={{
                        position: "absolute",
                        top: "-8px",
                        right: "-10px",
                        fontSize: "10px",
                      }}
                    >
                      {totalQty}
                    </span>
                  )}
                </div>
              )}
              
          
             

              {/* AUTH */}
              {user ? (
                   <div className="nav-item dropdown">
                   <div
                      className="btn-search  btn btn-primary btn-md-square me-4 rounded-circle d-none d-lg-inline-flex"
                      data-bs-toggle="dropdown">
                      <i className="fa-solid fa-user" />
                    </div>
                    <div className="dropdown-menu  dropdown-menu-end bg-light">
                          <NavLink to="/profile" className="dropdown-item">
                            Profile
                          </NavLink>
                          <NavLink to="/myorders" className="dropdown-item">
                            View orders
                          </NavLink>
                          <button onClick={handleLogout}  className="dropdown-item text-danger">
                            Logout
                          </button>
                        </div>
                   </div>
              ) : (
                <>
                  <NavLink
                    to="/register"
                    className="btn btn-primary rounded-pill"
                  >
                    Register
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="btn btn-outline-primary rounded-pill"
                  >
                    Login
                  </NavLink>
                </>
              )}
            </div>

            {/* ✅ MOBILE */}
            <div className="d-lg-none mt-3 px-3 w-100">
              {/* CART */}
              <div
                className="d-flex justify-content-between border rounded-pill px-3 py-2 mb-2"
                onClick={() => navigate("/cart")}
              >
                <span>
                  <i className="fa fa-shopping-cart me-2"></i>Cart
                </span>
                {totalQty > 0 && (
                  <span className="badge bg-danger">{totalQty}</span>
                )}
              </div>
              {(() => {
                if (username) {
                  return (
                    <>
                      <Link className="nav-item nav-link">{username.name}</Link>
                    </>
                  );
                }
              })()}

              {/* AUTH */}
              {user ? (
                <button
                  onClick={handleLogout}
                  className="btn btn-primary w-100 rounded-pill"
                >
                  Logout
                </button>
              ) : (
                <>
                  <NavLink
                    to="/register"
                    className="btn btn-primary w-100 mb-2 rounded-pill"
                  >
                    Register
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="btn btn-outline-primary w-100 rounded-pill"
                  >
                    Login
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
