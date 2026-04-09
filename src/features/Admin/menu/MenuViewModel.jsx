import React from 'react'
import Skeleton from "react-loading-skeleton";

const MenuViewModel = ({singlemenu,singleloading}) => {
  return (
    <>
     <div
    className="modal fade"
    id="menuview"
    tabIndex={-1}
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5">
            {singleloading ? <Skeleton width={150} /> : singlemenu?.name}
          </h1>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
          />
        </div>
        <div className="modal-body">
          {singleloading ? (
            <div>
              <Skeleton height={200} />
              <Skeleton height={30} className="mt-2" />
              <Skeleton height={20} />
              <Skeleton height={20} />
              <Skeleton height={20} />
              <Skeleton height={20} />
            </div>
          ) : (
            <div className="card">
              <img
                src={singlemenu?.img}
                className="card-img-top"
                alt=""
              />
              <div className="card-body">
                <h5>{singlemenu?.name}</h5>
                <p>{singlemenu?.desc}</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Price : {singlemenu?.price}
                </li>
                <li className="list-group-item">
                  Category : {singlemenu?.category}
                </li>
                <li className="list-group-item">
                  Rating : {singlemenu?.rating}
                </li>
                <li className="list-group-item">
                  Popular :{" "}
                  {singlemenu?.isPopular ? "Popular" : "Not popular"}
                </li>
                <li className="list-group-item">
                  Type : {singlemenu?.isVeg ? "VEG" : "NON VEG"}
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" data-bs-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div></>
  )
}

export default MenuViewModel