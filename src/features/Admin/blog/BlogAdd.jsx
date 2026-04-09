import React, { useState } from "react";
import Aheader from "../acomponent/Aheader";
import Aheros from "../acomponent/Aheros";
import { useNavigate } from "react-router-dom";
import { useAddBlogMutation } from "../../../services/blogApi";



const BlogAdd = () => {
  const navigate = useNavigate();

  // ✅ RTK mutation
  const [addBlog, { isLoading }] = useAddBlogMutation();

  const [form, setForm] = useState({
    topic: "",
    desc: "",
    img: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === "img") {
      const file = e.target.files[0];
      setForm({ ...form, img: file });

      if (file) {
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.topic || !form.desc || !form.img) {
      alert("Please fill all fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("topic", form.topic);
      formData.append("desc", form.desc);
      formData.append("img", form.img);

      // ✅ RTK call
      await addBlog(formData).unwrap();

      alert("Blog Added ✅");

      navigate("/blogmanage");

    } catch (error) {
      console.log(error);
      alert("Error adding blog ❌");
    }
  };

  return (
    <div>
      <Aheader />
      <Aheros title="Add Blog" name="Add Blog" />

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">

            <div className="card shadow-sm p-4">
              <h4 className="text-center mb-4">Add Blog</h4>

              <form onSubmit={handleSubmit}>

                {/* Topic */}
                <input
                  type="text"
                  name="topic"
                  value={form.topic}
                  onChange={handleChange}
                  placeholder="Blog Topic"
                  className="form-control mb-3"
                />

                {/* Description */}
                <textarea
                  name="desc"
                  value={form.desc}
                  onChange={handleChange}
                  placeholder="Blog Description"
                  className="form-control mb-3"
                />

                {/* Image */}
                <input
                  type="file"
                  name="img"
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
                      height: "200px",
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
                  {isLoading ? "Adding..." : "Add Blog"}
                </button>

              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogAdd;