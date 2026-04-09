import React, { useState } from "react";
import Aheader from "../acomponent/Aheader";
import Aheros from "../acomponent/Aheros";
import Skeleton from "react-loading-skeleton";

import {
  useGetBlogsQuery,
  useGetSingleBlogQuery,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
} from "../../../services/blogApi";

function BlogManage() {

  const [singleId, setSingleId] = useState(null);

  // ✅ GET ALL
  const { data: blogs = [], isLoading } = useGetBlogsQuery();

  // ✅ GET SINGLE
  const {
    data: singleBlog = {},
    isLoading: singleLoading,
  } = useGetSingleBlogQuery(singleId, {
    skip: !singleId,
  });

  // ✅ DELETE
  const [deleteBlog, { isLoading: deleting }] = useDeleteBlogMutation();

  // ✅ UPDATE
  const [updateBlog, { isLoading: updating }] = useUpdateBlogMutation();

  const [editData, setEditData] = useState({
    topic: "",
    desc: "",
    img: null,
  });

  // 🔹 DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;

    try {
      await deleteBlog(id).unwrap();
      alert("Deleted 🗑");
    } catch (error) {
      console.log(error);
    }
  };

  // 🔹 EDIT CLICK
  const handleEditClick = (item) => {
    setSingleId(item._id);
    setEditData({
      topic: item.topic,
      desc: item.desc,
      img: null,
    });
  };

  // 🔹 CHANGE
  const handleChange = (e) => {
    if (e.target.name === "img") {
      setEditData({ ...editData, img: e.target.files[0] });
    } else {
      setEditData({ ...editData, [e.target.name]: e.target.value });
    }
  };

  // 🔹 UPDATE
  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("topic", editData.topic);
      formData.append("desc", editData.desc);

      if (editData.img) {
        formData.append("img", editData.img);
      }

      await updateBlog({
        id: singleId,
        data: formData,
      }).unwrap();

      alert("Updated ✏");
      document.getElementById("closeEditModal").click();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Aheader />
      <Aheros title="Blog Manage" name="Blog Manage" />

      <div className="container py-4">

        <table className="table text-center">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Topic</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="4">
                  <Skeleton height={40} count={5} />
                </td>
              </tr>
            ) : blogs.data?.length === 0 ? (
              <tr>
                <td colSpan="4">No Blogs Found</td>
              </tr>
            ) : (
              blogs.data?.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>

                  <td>
                    <img
                      src={item.img}
                      alt=""
                      style={{ width: 80, height: 60 }}
                    />
                  </td>

                  <td>{item.topic}</td>

                  <td>
                    <button
                      className="btn btn-info btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#viewModal"
                      onClick={() => setSingleId(item._id)}
                    >
                      View
                    </button>

                    <button
                      className="btn btn-success btn-sm mx-2"
                      data-bs-toggle="modal"
                      data-bs-target="#editModal"
                      onClick={() => handleEditClick(item)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(item._id)}
                    >
                      {deleting ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* VIEW MODAL */}
        <div className="modal fade" id="viewModal">
          <div className="modal-dialog">
            <div className="modal-content p-3">

              {singleLoading ? (
                <Skeleton height={200} />
              ) : (
                <>
                  <img src={singleBlog?.data?.img} alt="" />
                  <h4>{singleBlog?.data?.topic}</h4>
                  <p>{singleBlog?.data?.desc}</p>
                </>
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default BlogManage;