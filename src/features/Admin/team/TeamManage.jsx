import React, { useState } from "react";
import Aheader from "../acomponent/Aheader";
import Aheros from "../acomponent/Aheros";

import {
  useGetTeamQuery,
  useGetSingleTeamQuery,
  useDeleteTeamMutation,
} from "../../../services/teamApi";

function TeamManage() {
  const [singleId, setSingleId] = useState(null);

  // ✅ GET ALL
  const { data: team = [], isLoading } = useGetTeamQuery();

  // ✅ GET SINGLE
  const { data: single = {}, isLoading: singleLoading } =
    useGetSingleTeamQuery(singleId, {
      skip: !singleId,
    });

  // ✅ DELETE
  const [deleteTeam, { isLoading: deleting }] =
    useDeleteTeamMutation();

  const handleDelete = async (id) => {
    if (!window.confirm("Delete member?")) return;

    try {
      await deleteTeam(id).unwrap();
      alert("Deleted ✅");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Aheader />
      <Aheros title="Team Manage" name="Team Manage" />

      <div className="container py-4">

        <table className="table text-center">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Profile</th>
              <th>Name</th>
              <th>Position</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5">Loading...</td>
              </tr>
            ) : team?.data?.length === 0 ? (
              <tr>
                <td colSpan="5">No Team Members</td>
              </tr>
            ) : (
              team?.data?.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>

                  <td>
                    <img
                      src={item.profile}
                      alt=""
                      style={{ width: 60, height: 60, borderRadius: "50%" }}
                    />
                  </td>

                  <td>{item.name}</td>
                  <td>{item.position}</td>

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
                      className="btn btn-danger btn-sm ms-2"
                      onClick={() => handleDelete(item._id)}
                      disabled={deleting}
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
            <div className="modal-content p-3 text-center">

              {singleLoading ? (
                <p>Loading...</p>
              ) : (
                <>
                  <img
                    src={single?.data?.profile}
                    alt=""
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                    }}
                  />

                  <h4 className="mt-2">{single?.data?.name}</h4>
                  <p>{single?.data?.position}</p>

                  <div>
                    <a href={single?.data?.socialmedia?.insta}>Insta</a> |{" "}
                    <a href={single?.data?.socialmedia?.x}>X</a> |{" "}
                    <a href={single?.data?.socialmedia?.facebook}>
                      Facebook
                    </a>
                  </div>
                </>
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default TeamManage;