import React, { useState } from "react";
import Aheader from "../acomponent/Aheader";
import Aheros from "../acomponent/Aheros";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import MenuViewModel from "./MenuViewModel";
import MenuEditModel from "./MenuEditModel";

import { useGetMenuQuery,
  useGetSingleMenuQuery,
  useDeleteMenuMutation, } from "../../../services/menuApi";

function MenuManage() {
  // for single fetching itea
  const [singleId, setSingleId] = useState(null);
  const [singledata, setSingledata] = useState({})

  //redux query

  //get all menu
  const {isLoading,data: menu=[]}=useGetMenuQuery()
  //get single menu iteam
  const {isLoading:singleloading,data: singlemenu={}}=useGetSingleMenuQuery(singleId,{skip:!singleId})
  //deleted menu
  const[deletemenu,{isLoading:actionLoading}] = useDeleteMenuMutation()

  //delete function 
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;
    try {
      await deletemenu(id)
      alert("Deleted successfully 🗑");
    } catch (error) {
      console.log(error);
    }
  };


  const handleEditClick = (data) => {
    setSingledata(data)
    setSingleId(data._id)
  }
  return (
    <div>
      <Aheader />
      <Aheros name="MenuManage" title="MenuManage" />
      <div className="container">
        <div className="wow bounceInUp" data-wow-delay="0.1s">
          <table className="table align-middle table-hover border">
            <thead className="table-primary text-center py-4">
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    <Skeleton height={40} count={5} />
                  </td>
                </tr>
              ) : menu.data.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No menu items found
                  </td>
                </tr>
              ) : (
                menu.data.map((data, index) => (
                  <tr key={data._id} className="text-center">
                    {/* Index */}
                    <td>{index + 1}</td>

                    {/* Image + Name */}
                    <td>
                      <div className="d-flex align-items-center gap-3 ">
                        <img
                          src={data.img}
                          alt=""
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                            borderRadius: "10px",
                          }}
                        />
                        <span className="fw-semibold">{data.name}</span>
                      </div>
                    </td>

                    {/* Category */}
                    <td>
                      <span className="badge bg-info text-dark">
                        {data.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="fw-bold text-success">₹ {data.price}</td>

                    {/* Actions */}
                    <td>
                      <div className="d-flex gap-2 justify-content-center">
                        <button
                          className="btn btn-sm btn-outline-info"
                          data-bs-toggle="modal"
                          data-bs-target="#menuview"
                          onClick={() => setSingleId(data._id)}
                        >
                          View
                        </button>

                        <button
                          className="btn btn-sm btn-outline-success"
                          data-bs-toggle="modal"
                          data-bs-target="#editModal"
                          onClick={() => handleEditClick(data)}
                        >
                          ✏ Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(data._id)}
                          disabled={actionLoading}
                        >
                          🗑 {actionLoading ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {/* Modal */}
            <MenuViewModel  singlemenu={singlemenu?.data} singleloading={singleloading}/>
         <MenuEditModel singleId={singleId}singledata={singledata} />     
        </div>
      </div>
    </div>
  );
}

export default MenuManage;
