import React, { useState } from "react";
import Aheader from "../acomponent/Aheader";
import Aheros from "../acomponent/Aheros";
import { useNavigate } from "react-router-dom";
import { useAddServiceMutation } from "../../../services/serviceApi";

const ServicesAdd = () => {
  const navigate = useNavigate();

  // ✅ RTK Mutation
  const [addService, { isLoading }] = useAddServiceMutation();

  const [form, setForm] = useState({
    title: "",
    icon: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.icon) {
      alert("Please fill all fields");
      return;
    }

    try {
      // ✅ RTK Query call
      await addService(form).unwrap();

      alert("Service Added ✅");

      navigate("/servicemange"); // redirect
    } catch (error) {
      console.log("Error:", error);
      alert(error?.data?.message || "Something went wrong ❌");
    }
  };

  return (
    <div>
      <Aheader />
      <Aheros title="Add Service" name="Add Service" />

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">

            <div className="card shadow-sm border-0 p-4">
              <h4 className="mb-4 text-center">Add New Service</h4>

              <form onSubmit={handleSubmit}>

                {/* Title */}
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Service Title"
                  className="form-control mb-3"
                />

                {/* Icon */}
                <input
                  type="text"
                  name="icon"
                  value={form.icon}
                  onChange={handleChange}
                  placeholder="Icon class (e.g. fa-solid fa-car)"
                  className="form-control mb-3"
                />

                {/* Preview */}
                {form.icon && (
                  <div className="text-center mb-3">
                    <i className={`${form.icon} fs-1`}></i>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isLoading}
                >
                  {isLoading ? "Adding..." : "Add Service"}
                </button>

              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesAdd;