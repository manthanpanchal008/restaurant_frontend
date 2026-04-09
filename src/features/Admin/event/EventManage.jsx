import React, { useState } from "react";
import Aheader from "../acomponent/Aheader";
import Aheros from "../acomponent/Aheros";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import {
  useDeleteEventMutation,
  useGetEventsQuery,
  useGetSingleEventQuery,
} from "../../../services/eventApi";

function EventManage() {

  const [singleId, setSingleId] = useState(null);

  // ✅ GET ALL
  const { data: events = [], isLoading } = useGetEventsQuery();
  const [deleteEvent,{data,error}] = useDeleteEventMutation();


  // ✅ GET SINGLE
  const {
    data: single = {},
    isLoading: singleLoading,
  } = useGetSingleEventQuery(singleId, {
    skip: !singleId, // 🔥 important
  });

  const handledelete = async(id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;
    try {
      console.log(id)
      await deleteEvent(id)
      alert("Deleted successfully 🗑");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Aheader />
      <Aheros title="Events Manage" name="Events Manage" />

      <div className="container py-4">

        <div className="card shadow-sm border-0">
          <div className="card-body">

            <h4 className="mb-4">Events List</h4>

            <div className="table-responsive">
              <table className="table align-middle table-hover text-center">

                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Event</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {isLoading ? (
                    Array(5).fill().map((_, i) => (
                      <tr key={i}>
                        <td><Skeleton /></td>
                        <td><Skeleton height={60} /></td>
                        <td><Skeleton /></td>
                        <td><Skeleton /></td>
                      </tr>
                    ))
                  ) : events.data?.length === 0 ? (
                    <tr>
                      <td colSpan="4">No Events Found</td>
                    </tr>
                  ) : (
                    events.data?.map((data, index) => (
                      <tr key={data._id}>

                        <td>{index + 1}</td>

                        <td>
                          <div className="d-flex align-items-center gap-3 justify-content-center">
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
                            <span className="fw-semibold">
                              Event {index + 1}
                            </span>
                          </div>
                        </td>

                        <td>
                          <span className="badge bg-info text-dark">
                            {data.category}
                          </span>
                        </td>

                        <td>
                          <div className="d-flex gap-2 justify-content-center">

                            <button
                              className="btn btn-sm btn-outline-info"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              onClick={() => setSingleId(data._id)}
                            >
                              👁 View
                            </button>

                            <button className="btn btn-sm btn-outline-success">
                              ✏ Edit
                            </button>

                            <button className="btn btn-sm btn-outline-danger" onClick={() => handledelete(data._id)}>
                              🗑 Delete
                            </button>

                          </div>
                        </td>

                      </tr>
                    ))
                  )}
                </tbody>

              </table>
            </div>

          </div>
        </div>
      </div>

      {/* 🔥 Modal */}
      <div className="modal fade" id="exampleModal">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">
                {singleLoading ? (
                  <Skeleton width={120} />
                ) : (
                  `Event ${single?.data?.category}`
                )}
              </h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body text-center">
              {singleLoading ? (
                <Skeleton height={250} />
              ) : (
                <img
                  src={single?.data?.img}
                  alt=""
                  style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              )}
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default EventManage;