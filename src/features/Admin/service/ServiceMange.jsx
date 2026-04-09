import React, { useState } from "react";
import Aheader from "../acomponent/Aheader";
import Aheros from "../acomponent/Aheros";

import {
  useGetServiceQuery,
  useGetSingleServiceQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} from "../../../services/serviceApi"

function ServiceManage() {

  const [singleId, setSingleId] = useState(null);

  const [editData, setEditData] = useState({
    title: "",
    icon: "",
  });

  // ✅ GET ALL
  const { data: services = [], isLoading } = useGetServiceQuery();

  // ✅ GET SINGLE (VIEW)
  const { data: single = {} } = useGetSingleServiceQuery(singleId, {
    skip: !singleId,
  });

  // ✅ DELETE
  const [deleteService, { isLoading: deleting }] =
    useDeleteServiceMutation();

  // ✅ UPDATE
  const [updateService, { isLoading: updating }] =
    useUpdateServiceMutation();

  // 🔹 DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await deleteService(id).unwrap();
      alert("Deleted 🗑");
    } catch (error) {
      console.log(error);
    }
  };

  // 🔹 EDIT CLICK
  const handleEditClick = (item) => {
    setSingleId(item._id);
    setEditData({
      title: item.title,
      icon: item.icon,
    });
  };

  // 🔹 CHANGE
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // 🔹 UPDATE
  const handleUpdate = async () => {
    if (!singleId) return alert("Invalid ID ❌");

    try {
      await updateService({
        id: singleId,
        data: editData,
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
      <Aheros title="Service Manage" name="Service Manage" />

      <div className="container">
        <h1 className="text-center">Service Manage</h1>

        <table className="table">
          <thead>
            <tr className="table-dark text-center">
              <th>#id</th>
              <th>Title</th>
              <th>Icons</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="4" className="text-center">Loading...</td>
              </tr>
            ) : (
              services.data?.map((data) => (
                <tr key={data._id} className="text-center">
                  <td>{data._id}</td>
                  <td>{data.title}</td>
                  <td className={`${data.icon} fs-1`}></td>

                  <td>
                    {/* VIEW */}
                    <button
                      className="btn btn-info"
                      data-bs-toggle="modal"
                      data-bs-target="#viewModal"
                      onClick={() => setSingleId(data._id)}
                    >
                      View
                    </button>

                    {/* EDIT */}
                    <button
                      className="btn btn-success mx-2"
                      data-bs-toggle="modal"
                      data-bs-target="#editModal"
                      onClick={() => handleEditClick(data)}
                    >
                      Edit
                    </button>

                    {/* DELETE */}
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(data._id)}
                    >
                      {deleting ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* VIEW MODAL */}
      <div className="modal fade" id="viewModal">
        <div className="modal-dialog">
          <div className="modal-content text-center p-3">
            <h4>{single?.data?.title}</h4>
            <i className={`${single?.data?.icon} fs-1`}></i>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      <div className="modal fade" id="editModal">
        <div className="modal-dialog">
          <div className="modal-content p-3">

            <div className="modal-header">
              <h5>Edit Service</h5>
              <button id="closeEditModal" className="btn-close" data-bs-dismiss="modal" />
            </div>

            <input
              type="text"
              name="title"
              value={editData.title}
              onChange={handleChange}
              className="form-control mb-2"
            />

            <input
              type="text"
              name="icon"
              value={editData.icon}
              onChange={handleChange}
              className="form-control mb-2"
            />

            <button
              className="btn btn-success"
              onClick={handleUpdate}
              disabled={updating}
            >
              {updating ? "Updating..." : "Update"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceManage;