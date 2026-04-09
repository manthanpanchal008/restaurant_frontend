import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  useRegisterMutation,
  useVerifyOtpMutation,
} from "../../../services/authApi";

const Register = () => {
  const [showOtp, setShowOtp] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const [registerUser, { isLoading }] = useRegisterMutation();
  const [verifyOtp, { isLoading: otpLoading }] = useVerifyOtpMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const password = watch("password");

  // ✅ REGISTER
  const onSubmit = async (data) => {
    try {
      const res = await registerUser(data).unwrap();
      toast.success("OTP sent to email 🎉");
      setUserEmail(data.email);
      setShowOtp(true);
      reset();
    } catch (err) {
      toast.error(err?.data?.message || "Registration failed ❌");
    }
  };

  // ✅ VERIFY OTP
  const handleVerifyOtp = async () => {
    try {
      await verifyOtp({
        email: userEmail,
        otp: otp,
      }).unwrap();

      toast.success("Account verified ✅");
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message || "Invalid OTP ❌");
    }
  };

  return (
    <div className="container-fluid bg-light my-4">
      <div className="container">
        <div className="row g-5 align-items-center">
          {/* LEFT SIDE */}
          <div className="col-lg-6 col-md-12">
            <div className="p-5 rounded shadow">
              <h2 className="mb-4">
                Join <span className="text-primary">CaterServ</span>
              </h2>

              {!showOtp ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <input
                        className="form-control"
                        placeholder="Full Name"
                        {...register("name", { required: "Name is required" })}
                      />
                      <small className="text-danger">
                        {errors.name?.message}
                      </small>
                    </div>

                    <div className="col-md-6">
                      <input
                        className="form-control"
                        placeholder="Username"
                        {...register("username", {
                          required: "Username is required",
                        })}
                      />
                      <small className="text-danger">
                        {errors.username?.message}
                      </small>
                    </div>

                    <div className="col-12">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        {...register("email", {
                          required: "Email is required",
                        })}
                      />
                      <small className="text-danger">
                        {errors.email?.message}
                      </small>
                    </div>

                    <div className="col-12">
                      <input
                        className="form-control"
                        placeholder="Phone"
                        {...register("phone", {
                          required: "Phone is required",
                        })}
                      />
                    </div>
                    <div className="col-12">
                      <textarea
                        className="form-control"
                        placeholder="Address"
                        {...register("address", {
                          required: "Address is required",
                        })}
                      />
                      <small className="text-danger">
                        {errors.address?.message}
                      </small>
                    </div>

                    <div className="col-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Pincode"
                        {...register("pincode", {
                          required: "Pincode is required",
                          pattern: {
                            value: /^[0-9]{6}$/,
                            message: "Enter valid 6-digit pincode",
                          },
                        })}
                      />
                      <small className="text-danger">
                        {errors.pincode?.message}
                      </small>
                    </div>

                    <div className="col-md-6">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        {...register("password", {
                          required: "Password is required",
                        })}
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        {...register("confirmPassword", {
                          validate: (value) =>
                            value === password || "Passwords do not match",
                        })}
                      />
                      <small className="text-danger">
                        {errors.confirmPassword?.message}
                      </small>
                    </div>

                    <div className="col-12">
                      <button
                        className="btn btn-primary w-100 rounded-pill py-3"
                        disabled={isLoading}
                      >
                        {isLoading ? "Registering..." : "Register"}
                      </button>
                    </div>

                    <div className="col-12 text-end">
                      <Link to="/login">Login</Link>
                    </div>
                  </div>
                </form>
              ) : (
                // ✅ OTP UI
                <div className="text-center">
                  <h3>Verify OTP 🔐</h3>

                  <p>
                    Code sent to <strong>{userEmail}</strong>
                  </p>

                  <input
                    className="form-control mb-3"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />

                  <button
                    className="btn btn-primary w-100"
                    onClick={handleVerifyOtp}
                    disabled={otpLoading}
                  >
                    {otpLoading ? "Verifying..." : "Verify OTP"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-lg-6 text-center">
            <img src="img/hero.png" className="img-fluid rounded" alt="hero" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
