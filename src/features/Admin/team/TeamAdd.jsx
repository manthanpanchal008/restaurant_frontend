import React, { useState } from "react";
import Aheader from "../acomponent/Aheader";
import Aheros from "../acomponent/Aheros";
import { useNavigate } from "react-router-dom";
import { useAddTeamMutation } from "../../../services/teamApi";

const TeamAdd = () => {
  const navigate = useNavigate();

  // ✅ RTK Mutation
  const [addTeam, { isLoading }] = useAddTeamMutation();

  const [form, setForm] = useState({
    name: "",
    position: "",
    profile: null,
    insta: "",
    x: "",
    facebook: "",
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === "profile") {
      const file = e.target.files[0];
      setForm({ ...form, profile: file });

      if (file) {
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.position || !form.profile) {
      alert("Required fields missing");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("position", form.position);

      // ⚠️ VERY IMPORTANT → match backend field
      formData.append("profile", form.profile);

      // nested fields
      formData.append("socialmedia[insta]", form.insta);
      formData.append("socialmedia[x]", form.x);
      formData.append("socialmedia[facebook]", form.facebook);

      await addTeam(formData).unwrap();

      alert("Team Member Added ✅");
      navigate("/teammanage");

    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      <Aheader />
      <Aheros title="Add Team" name="Add Team" />

      <div className="container py-5">
        <div className="col-md-6 mx-auto">
          <div className="card p-4 shadow-sm">

            <h4 className="text-center mb-4">Add Team Member</h4>

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                name="name"
                placeholder="Name"
                className="form-control mb-2"
                onChange={handleChange}
              />

              <input
                type="text"
                name="position"
                placeholder="Position"
                className="form-control mb-2"
                onChange={handleChange}
              />

              <input
                type="file"
                name="profile"
                className="form-control mb-2"
                onChange={handleChange}
              />

              {preview && (
                <img
                  src={preview}
                  alt=""
                  style={{ width: "100%", height: 200, objectFit: "cover" }}
                />
              )}

              <input
                type="text"
                name="insta"
                placeholder="Instagram URL"
                className="form-control mt-2"
                onChange={handleChange}
              />

              <input
                type="text"
                name="x"
                placeholder="X (Twitter) URL"
                className="form-control mt-2"
                onChange={handleChange}
              />

              <input
                type="text"
                name="facebook"
                placeholder="Facebook URL"
                className="form-control mt-2"
                onChange={handleChange}
              />

              <button
                className="btn btn-primary w-100 mt-3"
                disabled={isLoading}
              >
                {isLoading ? "Adding..." : "Add Member"}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamAdd;