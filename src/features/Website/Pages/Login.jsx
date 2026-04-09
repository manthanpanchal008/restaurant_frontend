import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLoginMutation } from "../../../services/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../../slice/authSlice";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading , error}] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const location = useLocation();


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await login({
        email,
        password,
      }).unwrap();
  
      // ✅ store user in redux
      dispatch(
        setUser({
          ...res.user,
          role: res.user.role.toLowerCase(),
        })
      );
  
      toast.success("Login successful ✅");
  
      const role = res.user.role.toLowerCase();
  
      // ✅ role-based navigation
      if (role === "superadmin") {
        navigate("/admin");
      } else if (role === "admin") {
        navigate("/dash"); // optional
      } else {
        navigate("/");
      }
  
    } catch (err) {
      toast.error(err?.data?.message || "Login failed ❌");
    }
  };

  return (
    <div className="container-fluid bg-light my-4">
      <div className="container">
        <div className="row g-5 align-items-center">

          {/* LEFT SIDE */}
          <div className="col-lg-6 col-md-12 text-center">
            <img src="img/hero.png" className="img-fluid rounded" alt="hero" />
          </div>

          {/* RIGHT SIDE */}
          <div className="col-lg-6 col-md-12">
            <div className="p-5 rounded shadow">

              <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
                Welcome Back
              </small>

              <h2 className="mb-4">
                Login to <span className="text-primary">CaterServ</span>
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="row g-3">

                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-12 text-end">
                    <Link to="/register" className="text-primary">
                      or create an account
                    </Link>
                    <br />
                    <Link to="/forgot" className="text-primary">
                      forgot password
                    </Link>
                  </div>

                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-primary w-100 rounded-pill py-3"
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : "Login"}
                    </button>
                  </div>

                </div>
              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;