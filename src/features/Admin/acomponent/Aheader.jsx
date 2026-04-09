import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../../slice/authSlice";
import { toast } from "sonner";
import Aheros from "./Aheros";

function Aheader() {
  const user = localStorage.getItem("user");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Logout Succesfully");
    navigate("/");
  };

  return (
    <div>
    
      <div className="container-fluid nav-bar">
        <div className="container">
          <nav className="navbar navbar-light navbar-expand-lg py-4">
            {/* LOGO */}
            <NavLink to="/dash" className="navbar-brand">
              <h1 className="text-primary fw-bold mb-0">Dashboard</h1>
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

            {/* NAVBAR */}
            <div className="collapse navbar-collapse" id="navbarCollapse">
              {/* NAV LINKS */}
              <div className="navbar-nav mx-auto">
                <NavLink to="/ordermanage" className="nav-item nav-link">
                      Manage Order
                </NavLink>
                <div className="nav-item dropdown">
                  <span
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                    style={{ cursor: "pointer" }}
                  >
                    Services
                  </span>
                  <div className="dropdown-menu bg-light">
                    <NavLink to="/servicemange" className="dropdown-item">
                      Manage
                    </NavLink>
                    <NavLink to="/serviceadd" className="dropdown-item">
                      Add Form
                    </NavLink>
                  </div>
                </div>



                <div className="nav-item dropdown">
                  <span
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                    style={{ cursor: "pointer" }}
                  >
                    Events
                  </span>
                  <div className="dropdown-menu bg-light">
                    <NavLink to="/eventsmange" className="dropdown-item">
                      Manage
                    </NavLink>
                    <NavLink to="/eventadd" className="dropdown-item">
                      Add Form
                    </NavLink>
                  </div>
                </div>

                <div className="nav-item dropdown">
                  <span
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                    style={{ cursor: "pointer" }}
                  >
                    Menu
                  </span>
                  <div className="dropdown-menu bg-light">
                    <NavLink to="/menumanage" className="dropdown-item">
                      Manage
                    </NavLink>
                    <NavLink to="/menuadd" className="dropdown-item">
                      Add Form
                    </NavLink>
                  </div>
                </div>

                <div className="nav-item dropdown">
                  <span
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                    style={{ cursor: "pointer" }}
                  >
                    Blog
                  </span>
                  <div className="dropdown-menu bg-light">
                    <NavLink to="/blogmanage" className="dropdown-item">
                      Manage
                    </NavLink>
                    <NavLink to="/blogadd" className="dropdown-item">
                      Add Form
                    </NavLink>
                  </div>
                </div>

                <div className="nav-item dropdown">
                  <span
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                    style={{ cursor: "pointer" }}
                  >
                    Team
                  </span>
                  <div className="dropdown-menu bg-light">
                    <NavLink to="/teammanage" className="dropdown-item">
                      Manage
                    </NavLink>
                    <NavLink to="/teamadd" className="dropdown-item">
                      Add Form
                    </NavLink>
                  </div>
                </div>

                <div className="nav-item dropdown">
                  <span
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                    style={{ cursor: "pointer" }}
                  >
                    Pages
                  </span>
                  <div className="dropdown-menu bg-light">
                    <NavLink to="/book" className="dropdown-item">
                      Booking
                    </NavLink>
                    <NavLink to="/blog" className="dropdown-item">
                      Our Blog
                    </NavLink>
                    <NavLink to="/team" className="dropdown-item">
                      Our Team
                    </NavLink>
                    <NavLink to="/test" className="dropdown-item">
                      Testimonial
                    </NavLink>
                  </div>
                </div>

                {/* ✅ MOBILE BUTTONS */}
                {user ? (
                  <div className="d-lg-none mt-3 px-3">
                    <button
                      onClick={handleLogout}
                      className="btn btn-primary w-100 mb-2 rounded-pill"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="d-lg-none mt-3 px-3">
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
                  </div>
                )}
              </div>

              {/* ✅ DESKTOP BUTTONS */}
              {user ? (
                <div className="d-none d-lg-flex gap-2">
                  <button
                    onClick={handleLogout}
                    className="btn btn-primary py-2 px-4 rounded-pill"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="d-none d-lg-flex gap-2">
                  <NavLink
                    to="/register"
                    className="btn btn-primary py-2 px-4 rounded-pill"
                  >
                    Register
                  </NavLink>

                  <NavLink
                    to="/login"
                    className="btn btn-outline-primary py-2 px-4 rounded-pill"
                  >
                    Login
                  </NavLink>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
      
    </div>
  );
}

export default Aheader;
