import React, { useState } from "react";
import Aheader from "../acomponent/Aheader";
import Aheros from "../acomponent/Aheros";
import { useNavigate } from "react-router-dom";
import { useAddMenuMutation } from "../../../services/menuApi";
import { toast } from "sonner";
function Menuadd() {
  // const {mutate,loading} = useMutation()
  const [addMenu, { isLoading, data: res = [], error }] = useAddMenuMutation();
  const navigate = useNavigate();
  console.log(res);
  console.log(error);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    desc: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setForm({ ...form, image: file });

      if (file) {
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.category) {
      alert("Please fill required fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("category", form.category);
      formData.append("desc", form.desc);
      formData.append("image", form.image);
      await addMenu(formData).unwrap();
      toast.success("Menu Item Added ✅");
      navigate("/menumanage");
    } catch (error) {
      const message = error?.data?.message || "Something went wrong ❌";
      toast.error(message);
    }
  };

  return (
    <div>
      <Aheader />
      <Aheros title="Add Menu Item" name="Add Menu" />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-sm border-0 p-4">
              <h4 className="mb-4 text-center">Add New Menu Item</h4>
              <form onSubmit={handleSubmit}>
                {/* Name */}
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Item Name"
                  className="form-control mb-3"
                />

                {/* Price */}
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="form-control mb-3"
                />

                {/* Category */}
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="form-select mb-3"
                >
                  <option value="">Select Category</option>
                  <option value="STARTER">Starter</option>
                  <option value="MAIN">Main Course</option>
                  <option value="DRINKS">Drinks</option>
                  <option value="DESSERT">Dessert</option>
                </select>

                {/* Description */}
                <textarea
                  name="desc"
                  value={form.desc}
                  onChange={handleChange}
                  placeholder="Description"
                  className="form-control mb-3"
                />

                {/* Image */}
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="form-control mb-3"
                />

                {/* Preview */}
                {preview && (
                  <img
                    src={preview}
                    alt=""
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                )}

                {/* Submit */}
                <button
                  type="submit"
                  className="btn btn-primary w-100 mt-3"
                  disabled={isLoading}
                >
                  {isLoading ? "Adding..." : "Add Item"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menuadd;
