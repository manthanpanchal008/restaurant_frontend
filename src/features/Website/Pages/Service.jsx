import React, { useEffect } from 'react';
import Header from '../Coman/Header';
import Heros from '../Coman/Heros';
import Footer from '../Coman/Footer';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useGetServiceQuery } from '../../../services/serviceApi';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariant = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

function Service() {
  const { data: service = [], isLoading, error } = useGetServiceQuery();

  useEffect(() => {
    if (error) {
      toast.error("Failed to load services. Please refresh the page. 🛠️");
    }
  }, [error]);

  return (
    <div>
      <Header />
      <Heros name="Services" title="What We Offer" />

      {/* Service Start */}
      <div className="container-fluid service py-6 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <small className="d-inline-block fw-bold text-dark text-uppercase bg-white border border-primary rounded-pill px-4 py-1 mb-3 shadow-sm">
              Our Services
            </small>
            <h2 className="display-5 mb-0 fw-bold">Premium Catering Solutions</h2>
          </div>

          <motion.div 
            className="row g-4"
            variants={container}
            initial="hidden"
            animate={isLoading ? "hidden" : "visible"}
          >
            {isLoading ? (
              Array(4).fill(0).map((_, index) => (
                <div key={index} className="col-lg-3 col-md-6">
                  <div className="bg-white rounded-4 shadow-sm p-4 text-center">
                    <Skeleton circle={true} height={80} width={80} className="mb-4" />
                    <Skeleton height={25} width="60%" className="mb-3" />
                    <Skeleton count={2} height={12} className="mb-4" />
                    <Skeleton rounded={true} width="100%" height={40} className="rounded-pill" />
                  </div>
                </div>
              ))
            ) : service?.data?.length === 0 ? (
                <div className="col-12 text-center py-5">
                   <i className="fa fa-concierge-bell fs-1 text-muted opacity-25 mb-3"></i>
                   <h4>No services listed yet.</h4>
                </div>
            ) : (
              service.data.map((data) => {
                const { _id, title, description, icon } = data;
                return (
                  <motion.div key={_id} className="col-lg-3 col-md-6" variants={itemVariant}>
                    <div className="bg-white rounded-4 shadow-sm h-100 service-item hover-lift border-0 overflow-hidden">
                      <div className="service-content d-flex align-items-center justify-content-center p-4">
                        <div className="service-content-icon text-center">
                          <div className="bg-primary-subtle rounded-circle d-inline-flex align-items-center justify-content-center mb-4 shadow-sm" style={{ width: "100px", height: "100px" }}>
                             <i className={`${icon} fa-4x text-primary`} />
                          </div>
                          <h5 className="fw-bold mb-3">{title}</h5>
                          <p className="mb-4 text-muted small">{description}</p>
                          <button className="btn btn-outline-primary px-4 py-2 rounded-pill btn-sm fw-bold">
                             Explore Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </motion.div>
        </div>
      </div>
      {/* Service End */}
      <Footer />
    </div>
  );
}

export default Service;
