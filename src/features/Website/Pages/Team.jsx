import React, { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Header from "../Coman/Header";
import Heros from "../Coman/Heros";
import Footer from "../Coman/Footer";
import { useGetTeamQuery } from "../../../services/teamApi";
import { motion } from "framer-motion";
import { toast } from "sonner";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariant = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

function Team() {
  const { data: team, isLoading, error } = useGetTeamQuery();

  useEffect(() => {
    if (error) {
      toast.error("Could not fetch the culinary team 👨‍🍳");
    }
  }, [error]);

  return (
    <div>
      <Header />
      <Heros name="Culinary Team" title="Meet Our Experts" />

      {/* Team Start */}
      <div className="container-fluid team py-6 bg-light">
        <div className="container">
          {/* Heading */}
          <div className="text-center mb-5">
            <small className="d-inline-block fw-bold text-dark text-uppercase bg-white border border-primary rounded-pill px-4 py-1 mb-3 shadow-sm">
              Our Team
            </small>
            <h2 className="display-5 mb-0 fw-bold">Master Chefs Behind the Magic</h2>
          </div>

          <motion.div 
            className="row g-4"
            variants={container}
            initial="hidden"
            animate={isLoading ? "hidden" : "visible"}
          >
            {isLoading ? (
              Array(4).fill(0).map((_, index) => (
                <div className="col-lg-3 col-md-6" key={index}>
                  <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                    <Skeleton height={350} />
                    <div className="p-3 text-center">
                       <Skeleton width="60%" height={20} className="mb-2" />
                       <Skeleton width="40%" height={15} />
                    </div>
                  </div>
                </div>
              ))
            ) : team?.data?.length === 0 ? (
                <div className="col-12 text-center py-5">
                   <h4 className="text-muted">Our team is currently in the kitchen! 🥘</h4>
                </div>
            ) : (
              team.data.map((item) => (
                <motion.div className="col-lg-3 col-md-6" key={item._id} variants={itemVariant}>
                  <div className="team-item border-0 shadow-sm rounded-4 overflow-hidden h-100 hover-lift bg-white">
                    {/* IMAGE */}
                    <div className="position-relative overflow-hidden">
                      <img
                        className="img-fluid w-100"
                        loading="lazy"
                        src={item.profile}
                        alt={item.name}
                        style={{ height: "350px", objectFit: "cover" }}
                      />
                      
                      {/* SOCIAL ICONS (HIDDEN BY DEFAULT, SHOW ON HOVER) */}
                      <div className="team-icon d-flex flex-column justify-content-center">
                        <a className="btn btn-primary btn-sm-square rounded-circle mb-2 shadow" href="#"><i className="fab fa-facebook-f" /></a>
                        <a className="btn btn-primary btn-sm-square rounded-circle mb-2 shadow" href="#"><i className="fab fa-twitter" /></a>
                        <a className="btn btn-primary btn-sm-square rounded-circle shadow" href="#"><i className="fab fa-instagram" /></a>
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="team-content text-center py-4 px-3">
                      <h5 className="fw-bold mb-1 text-dark">{item.name}</h5>
                      <span className="text-primary small fw-bold text-uppercase tracking-wider">{item.position}</span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </div>
      {/* Team End */}

      <Footer />
    </div>
  );
}

export default Team;
