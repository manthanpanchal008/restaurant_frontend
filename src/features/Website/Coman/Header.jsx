import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { logoutUser } from "../../../slice/authSlice";
import { toast } from "sonner";
import { clearCart } from "../../../slice/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import { toggleTheme, initTheme } from "../../../slice/themeSlice";

function Header() {
  const user = useSelector((state) => state.auth.user);
  const theme = useSelector((state) => state.theme.mode);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);

  // ✅ INITIALIZE THEME & CLOSE MENU ON ROUTE CHANGE
  useEffect(() => {
    dispatch(initTheme());
    setIsMenuOpen(false);
  }, [location.pathname, dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearCart());
    toast.success("Logout Succesfully");
    navigate("/");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="container-fluid fixed-top nav-bar px-0 shadow-sm bg-white">
      <div className="container">
        <nav className="navbar navbar-light navbar-expand-lg py-3">
          {/* LOGO */}
          <NavLink to="/" className="navbar-brand m-0">
            <h1 className="text-primary fw-bold mb-0 fs-4">
              Cater<span className="text-dark header-logo-span">Serv</span>
            </h1>
          </NavLink>

          {/* TOGGLER */}
          <button
            className="navbar-toggler py-2 px-3 border-0 shadow-none"
            type="button"
            onClick={toggleMenu}
          >
            <span className="fa fa-bars text-primary fs-4" />
          </button>

          {/* ✅ SMOOTH MOBILE BACKDROP */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed-top w-100 h-100 d-lg-none" 
                style={{ 
                  background: "rgba(0,0,0,0.5)", 
                  zIndex: 998,
                  top: "75px" 
                }}
                onClick={() => setIsMenuOpen(false)}
              />
            )}
          </AnimatePresence>

          {/* ✅ ANIMATED COLLAPSE (DESKTOP) */}
          <div className="collapse navbar-collapse d-none d-lg-block" id="navbarCollapse">
            <div className="navbar-nav mx-auto text-center gap-2">
              <NavLink to="/" className="nav-item nav-link fw-semibold">Home</NavLink>
              <NavLink to="/about" className="nav-item nav-link fw-semibold">About</NavLink>
              <NavLink to="/service" className="nav-item nav-link fw-semibold">Services</NavLink>
              <NavLink to="/menu" className="nav-item nav-link fw-semibold">Menu</NavLink>
              <NavLink to="/event" className="nav-item nav-link fw-semibold">Events</NavLink>
              
              {/* ✅ MORE DROPDOWN */}
              <div className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle fw-semibold text-dark" data-bs-toggle="dropdown">More</a>
                <div className="dropdown-menu shadow border-0 mt-2 p-2">
                  <NavLink to="/blog" className="dropdown-item rounded">Blogs</NavLink>
                  <NavLink to="/team" className="dropdown-item rounded">Our Team</NavLink>
                  <NavLink to="/contact" className="dropdown-item rounded">Contact</NavLink>
                </div>
              </div>
            </div>
            
            <div className="d-flex align-items-center gap-4">
              {/* 🌗 THEME TOGGLE */}
              <motion.button 
                whileTap={{ scale: 0.9 }}
                className="btn btn-link text-primary p-0 border-0 shadow-none"
                onClick={() => dispatch(toggleTheme())}
                title="Toggle Theme"
              >
                <i className={`fas ${theme === 'dark' ? 'fa-sun text-warning' : 'fa-moon'} fs-5`}></i>
              </motion.button>

              {/* 🛒 CART */}
              <div 
                style={{ position: "relative", cursor: "pointer" }} 
                onClick={() => navigate("/cart")}
                className="text-primary"
              >
                <i className="fa fa-shopping-cart fs-3"></i>
                {totalQty > 0 && (
                  <span className="badge bg-danger rounded-pill px-1" style={{ position: "absolute", top: "-8px", right: "-10px", fontSize: "10px", minWidth: "18px" }}>
                    {totalQty}
                  </span>
                )}
              </div>

              {/* AUTH */}
              {user ? (
                   <div className="nav-item dropdown">
                    <div 
                      className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center p-0" 
                      style={{ width: "38px", height: "38px", cursor: "pointer" }} 
                      data-bs-toggle="dropdown"
                    >
                      <i className="fas fa-user fs-6 text-white" />
                    </div>
                    <div className="dropdown-menu dropdown-menu-end shadow border-0 mt-3 p-2" style={{ minWidth: "200px" }}>


                          <NavLink to="/profile" className="dropdown-item rounded">Profile</NavLink>
                          <NavLink to="/myorders" className="dropdown-item rounded">My Orders</NavLink>
                          <hr className="dropdown-divider opacity-10" />
                          <button onClick={handleLogout} className="dropdown-item text-danger rounded fw-bold">Logout</button>
                        </div>
                   </div>
              ) : (
                <div className="d-flex gap-2">
                  <NavLink to="/login" className="btn btn-outline-primary rounded-pill px-4 btn-sm fw-bold">Login</NavLink>
                  <NavLink to="/register" className="btn btn-primary rounded-pill px-4 btn-sm fw-bold">Join</NavLink>
                </div>
              )}
            </div>
          </div>

          {/* ✅ MOBILE MENU */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className="d-lg-none w-100 bg-white overflow-hidden shadow-sm border-top"
                style={{ 
                  zIndex: 999,
                  position: "absolute",
                  top: "100%", 
                  left: 0,
                }}
              >
                <div className="navbar-nav text-center py-4 px-3 gap-1">
                    <NavLink to="/" className="nav-item nav-link py-2 fs-6">Home</NavLink>
                    <NavLink to="/about" className="nav-item nav-link py-2 fs-6">About</NavLink>
                    <NavLink to="/service" className="nav-item nav-link py-2 fs-6">Services</NavLink>
                    <NavLink to="/menu" className="nav-item nav-link py-2 fs-6">Menu</NavLink>
                    <NavLink to="/event" className="nav-item nav-link py-2 fs-6">Events</NavLink>
                    <NavLink to="/blog" className="nav-item nav-link py-2 fs-6">Blogs</NavLink>
                    <NavLink to="/team" className="nav-item nav-link py-2 fs-6">Our Team</NavLink>
                    <NavLink to="/contact" className="nav-item nav-link py-2 fs-6">Contact</NavLink>
                    
                    <hr className="my-3 opacity-10" />

                    {/* THEME TOGGLE MOBILE */}
                    <div className="d-flex align-items-center justify-content-between px-3 mb-4 bg-light rounded-pill py-2 mx-2">
                      <span className="text-muted small fw-bold">
                        <i className={`fas ${theme === 'dark' ? 'fa-moon' : 'fa-sun'} me-2`}></i>
                        Mode: {theme.toUpperCase()}
                      </span>
                      <button 
                        className="btn btn-primary btn-sm rounded-pill px-3 shadow-sm"
                        onClick={() => dispatch(toggleTheme())}
                      >
                        Switch
                      </button>
                    </div>

                    <div className="px-2">
                       {/* CART info */}
                       <div
                        className="d-flex justify-content-between align-items-center border rounded-pill px-4 py-2 mb-4 bg-light shadow-sm"
                        onClick={() => navigate("/cart")}
                      >
                        <span className="fw-bold"><i className="fa fa-shopping-cart me-2 text-primary"></i>My Cart</span>
                        <span className="badge bg-danger rounded-pill px-2 fs-6">{totalQty}</span>
                      </div>

                      {user && (
                        <div className="mb-4">
                          <div className="d-flex align-items-center justify-content-center mb-3 p-2 bg-primary-subtle rounded-4">
                            <i className="fa fa-user-circle fs-3 me-2 text-primary"></i>
                            <span className="fw-bold fs-5 text-dark">{user.name}</span>
                          </div>
                          <div className="row g-2">
                             <div className="col-6">
                                <NavLink to="/profile" className="btn btn-light w-100 rounded-pill border py-2 shadow-sm small">Profile</NavLink>
                             </div>
                             <div className="col-6">
                                <NavLink to="/myorders" className="btn btn-light w-100 rounded-pill border py-2 shadow-sm small">Orders</NavLink>
                             </div>
                          </div>
                        </div>
                      )}

                      {/* AUTH */}
                      <div className="mt-2">
                        {user ? (
                          <button onClick={handleLogout} className="btn btn-danger w-100 rounded-pill py-2 shadow-sm fw-bold">
                            Logout Now
                          </button>
                        ) : (
                          <div className="d-flex flex-column gap-2">
                            <NavLink to="/login" className="btn btn-outline-primary w-100 rounded-pill py-2 fw-bold">Login</NavLink>
                            <NavLink to="/register" className="btn btn-primary w-100 rounded-pill py-2 fw-bold">Sign Up</NavLink>
                          </div>
                        )}
                      </div>
                    </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </div>
  );
}

export default Header;
