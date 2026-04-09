import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../../slice/authSlice";
import { toggleTheme, initTheme } from "../../../slice/themeSlice";
import { toast } from "sonner";

function Aheader() {
  const user = useSelector((state) => state.auth.user);
  const theme = useSelector((state) => state.theme.mode);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(initTheme());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Logout Succesfully");
    navigate("/");
  };

  return (
    <div className="container-fluid nav-bar shadow-sm bg-white">
      <div className="container">
        <nav className="navbar navbar-light navbar-expand-lg py-3">
          {/* LOGO */}
          <NavLink to="/dash" className="navbar-brand">
            <h2 className="text-primary fw-bold mb-0">Admin<span className="text-dark">Panel</span></h2>
          </NavLink>

          {/* TOGGLER */}
          <button
            className="navbar-toggler py-2 px-3 border-0 shadow-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="fa fa-bars text-primary" />
          </button>

          {/* NAVBAR */}
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav mx-auto gap-2">
              <NavLink to="/dash" className="nav-item nav-link fw-semibold">Dashboard</NavLink>
              <NavLink to="/ordermanage" className="nav-item nav-link fw-semibold">Orders</NavLink>
              
              <div className="nav-item dropdown">
                <span className="nav-link dropdown-toggle fw-semibold" data-bs-toggle="dropdown" style={{ cursor: "pointer" }}>Content</span>
                <div className="dropdown-menu shadow border-0 mt-2 p-3" style={{ minWidth: "250px" }}>
                  <div className="mb-2">
                    <h6 className="dropdown-header px-0 text-primary">Menu Items</h6>
                    <NavLink to="/menumanage" className="dropdown-item rounded small">Manage Menu</NavLink>
                    <NavLink to="/menuadd" className="dropdown-item rounded small">Add New Dish</NavLink>
                  </div>
                  <div className="mb-2">
                    <h6 className="dropdown-header px-0 text-primary border-top pt-2">Blogs</h6>
                    <NavLink to="/blogmanage" className="dropdown-item rounded small">Manage Blogs</NavLink>
                    <NavLink to="/blogadd" className="dropdown-item rounded small">Write New Post</NavLink>
                  </div>
                  <div className="mb-2">
                    <h6 className="dropdown-header px-0 text-primary border-top pt-2">Services</h6>
                    <NavLink to="/servicemange" className="dropdown-item rounded small">Manage Services</NavLink>
                    <NavLink to="/serviceadd" className="dropdown-item rounded small">Add New Service</NavLink>
                  </div>
                  <div className="mb-2">
                    <h6 className="dropdown-header px-0 text-primary border-top pt-2">Events</h6>
                    <NavLink to="/eventsmange" className="dropdown-item rounded small">Manage Events</NavLink>
                    <NavLink to="/eventadd" className="dropdown-item rounded small">Add New Event</NavLink>
                  </div>
                  <div className="mb-0">
                    <h6 className="dropdown-header px-0 text-primary border-top pt-2">Team</h6>
                    <NavLink to="/teammanage" className="dropdown-item rounded small">Manage Members</NavLink>
                    <NavLink to="/teamadd" className="dropdown-item rounded small">Add New Member</NavLink>
                  </div>
                </div>
              </div>

              <div className="nav-item dropdown">
                <span className="nav-link dropdown-toggle fw-semibold" data-bs-toggle="dropdown" style={{ cursor: "pointer" }}>Settings</span>
                <div className="dropdown-menu shadow border-0 mt-2 p-2">
                  <NavLink to="/test" className="dropdown-item rounded">Testimonials</NavLink>
                  <NavLink to="/book" className="dropdown-item rounded">Bookings</NavLink>
                  <hr className="dropdown-divider opacity-10" />
                  <NavLink to="/" className="dropdown-item rounded text-primary fw-bold">View Website</NavLink>
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center gap-4">
              {/* 🌗 THEME TOGGLE */}
              <button 
                className="btn btn-link text-primary p-0 border-0 shadow-none" 
                onClick={() => dispatch(toggleTheme())}
                title="Toggle Theme"
              >
                <i className={`fas ${theme === 'dark' ? 'fa-sun text-warning' : 'fa-moon'} fs-5`}></i>

              </button>

              {/* AUTH */}
              {user ? (
                <div className="d-flex align-items-center gap-3">
                   <div className="d-none d-xl-block text-end">
                      <p className="mb-0 small fw-bold text-dark">{user.name}</p>
                      <span className="text-muted" style={{ fontSize: '10px' }}>Administrator</span>
                   </div>
                   <button onClick={handleLogout} className="btn btn-primary px-4 rounded-pill btn-sm fw-bold shadow-sm">
                      Logout
                   </button>
                </div>
              ) : (
                <div className="d-flex gap-2">
                  <NavLink to="/login" className="btn btn-outline-primary px-4 rounded-pill btn-sm">Login</NavLink>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Aheader;
