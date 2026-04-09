import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {useUpdateMenuMutation } from "../../../services/menuApi";

const MenuEditModel = ({ singleId ,singledata}) => {
  const { register, handleSubmit, reset } = useForm();
  const [updatemenu, { isLoading }] = useUpdateMenuMutation();

  useEffect(() => {
    if (singledata) {
      reset({
        name: singledata.name,
        price: singledata.price,
        category: singledata.category,
        desc: singledata.desc,
      })
    }
  }, [singledata,reset])
  console.log(singleId)

  const onSubmit = async (formDataValues) => {
    try {
      const formData = new FormData();

      formData.append("name", formDataValues.name);
      formData.append("price", formDataValues.price);
      formData.append("category", formDataValues.category);
      formData.append("desc", formDataValues.desc);

      if (formDataValues.image && formDataValues.image[0]) {
        formData.append("image", formDataValues.image[0]);
      }

      updatemenu({ id:singleId, data:formData });
      alert("Updated successfully ✏");

      document.getElementById("closeEditModal").click();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="modal fade" id="editModal" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5>Edit Menu</h5>
            <button
              id="closeEditModal"
              className="btn-close"
              data-bs-dismiss="modal"
            />
          </div>

          {isLoading ? (
            <div className="p-3">Loading...</div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body">
                <input {...register("name")} className="form-control mb-2" />

                <input
                  {...register("price")}
                  type="number"
                  className="form-control mb-2"
                />

                <input
                  {...register("category")}
                  className="form-control mb-2"
                />

                <textarea {...register("desc")} className="form-control mb-2" />

                <input
                  {...register("image")}
                  type="file"
                  className="form-control mb-2"
                />
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" data-bs-dismiss="modal">
                  Cancel
                </button>

                <button className="btn btn-success" disabled={isLoading}>
                  {isLoading ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuEditModel;
