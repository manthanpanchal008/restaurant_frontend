import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import Header from "../Coman/Header";
import Heros from "../Coman/Heros";
import Footer from "../Coman/Footer";

import { useGetTeamQuery } from "../../../services/teamApi";

function Team() {
const {data:team,isLoading} =useGetTeamQuery()
  return (
    <div>
      <Header />
      <Heros name="Team" title="Team" />

      {/* Team Start */}
      <div className="container-fluid team py-6">
        <div className="container">
          {/* Heading */}
          <div className="text-center">
            <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
              Our Team
            </small>
            <h1 className="display-5 mb-5">We have experienced chef Team</h1>
          </div>

          <div className="row g-4">
            {/* 🔥 Skeleton Loader */}
            {isLoading
  ? Array(4)
      .fill()
      .map((_, index) => (
        <div className="col-lg-3 col-md-6" key={index}>
          <div className="team-item rounded">

            {/* IMAGE (same height as real image) */}
            <Skeleton height={300} />

            {/* CONTENT (same structure) */}
            <div className="team-content text-center py-3 rounded-bottom">
              <h4>
                <Skeleton width="70%" />
              </h4>
              <p>
                <Skeleton width="50%" />
              </p>
            </div>

          </div>
        </div>
      ))
              : /* ✅ Real Data */
                team.data.map((item, index) => (
                  <div
                    className="col-lg-3 col-md-6"
                    key={item._id}
                  >
                    <div className="team-item rounded">
                      {/* IMAGE */}
                      <img
                        className="img-fluid rounded-top"
                        loading="lazy"
                        src={item.profile}
                        alt={item.name}
                      />

                      {/* CONTENT */}
                      <div className="team-content text-center py-3 bg-dark rounded-bottom">
                        <h4 className="text-primary">{item.name}</h4>
                        <p className="text-white mb-0">{item.position}</p>
                      </div>

                      {/* ICONS */}
                      <div className="team-icon d-flex flex-column justify-content-center m-4">
                        <a
                          className="share btn btn-primary btn-md-square rounded-circle mb-2"
                          href="#"
                        >
                          <i className="fas fa-share-alt" />
                        </a>
                        <a
                          className="share-link btn btn-primary btn-md-square rounded-circle mb-2"
                          href="#"
                        >
                          <i className="fab fa-facebook-f" />
                        </a>
                        <a
                          className="share-link btn btn-primary btn-md-square rounded-circle mb-2"
                          href="#"
                        >
                          <i className="fab fa-twitter" />
                        </a>
                        <a
                          className="share-link btn btn-primary btn-md-square rounded-circle mb-2"
                          href="#"
                        >
                          <i className="fab fa-instagram" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
      {/* Team End */}

      <Footer />
    </div>
  );
}

export default Team;
