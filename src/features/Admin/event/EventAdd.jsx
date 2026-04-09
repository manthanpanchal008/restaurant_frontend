import React, { useState } from 'react'
import Aheader from '../acomponent/Aheader'
import Aheros from '../acomponent/Aheros'
import { useNavigate } from "react-router-dom";
import { useAddEventMutation } from "../../../services/eventApi";

function EventAdd() {

  const navigate = useNavigate();

  // ✅ RTK Query Hook
  const [addEvent, { isLoading }] = useAddEventMutation();

  const [form, setForm] = useState({
    image: null,
    category: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({
        ...form,
        image: e.target.files[0],
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ❌ fix your bug (img → image)
    if (!form.category || !form.image) {
      alert("Please fill all fields ❌");
      return;
    }

    try {
      // ✅ MUST use FormData for file upload
      const formData = new FormData();
      formData.append("image", form.image);
      formData.append("category", form.category);

      await addEvent(formData).unwrap(); // 🔥 important

      alert("Event Added Successfully ✅");

      // reset form
      setForm({
        image: null,
        category: "",
      });

      navigate("/eventsmange");

    } catch (error) {
      console.log("Error:", error);
      alert(error?.data?.message || "Something went wrong ❌");
    }
  };

  return (
    <div>
      <Aheader />
      <Aheros title="Event Add" name="Event Add" />

      <div className="container py-5">
        <div className="col-md-6 mx-auto">

          <form onSubmit={handleSubmit}>

            {/* IMAGE */}
            <input
              name="image"
              type="file"
              onChange={handleChange}
              className="form-control mb-3"
            />

            {/* CATEGORY */}
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="form-select mb-3"
            >
              <option value="">Select category</option>
              <option value="Wedding">Wedding</option>
              <option value="Corporate">Corporate</option>
              <option value="Buffet">Buffet</option>
              <option value="Cocktail">Cocktail</option>
            </select>

            {/* BUTTON */}
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Submit Now"}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}

export default EventAdd;