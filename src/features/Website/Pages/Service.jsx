import React, { useEffect, useState } from 'react'
import Header from '../Coman/Header'
import Heros from '../Coman/Heros'
import Footer from '../Coman/Footer'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useGetServiceQuery } from '../../../services/serviceApi';
function Service() {
 const{data: service =[],isLoading,error} = useGetServiceQuery()
 
    return (
        <div>
            <div>
                {/* Service Start */}
                <div className="container-fluid service py-6">
                    <div className="container">
                        <div className="text-center">
                            <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">Our Services</small>
                            <h1 className="display-5 mb-5">What We Offer</h1>
                        </div>
                        <div className="row g-4">
                            {
                                isLoading ? Array(4).fill(0).map((_, index) => (
                                    <div key={index} className="col-lg-3 col-md-6 col-sm-12">
                                        <div className="bg-light rounded service-item">
                                            <div className="service-content d-flex flex-column align-items-center justify-content-center p-4">
                                                <Skeleton circle={true} height={60} width={60} className="mb-4" />
                                                <Skeleton className="mb-3" width={100} height={20} />
                                                <Skeleton className="mb-4" count={2} width={150} />
                                                <Skeleton className="rounded-pill" width={120} height={35} />
                                            </div>
                                        </div>
                                    </div>
                                )) :
                                service && service.data.map((data, index) => {
                                    const {_id,title,description,icon} = data
                                    return (
                                        <div key={_id} className="col-lg-3 col-md-6 col-sm-12">
                                            <div className="bg-light rounded service-item">
                                                <div className="service-content d-flex align-items-center justify-content-center p-4">
                                                    <div className="service-content-icon text-center">
                                                        <i className={`${icon} fa-7x text-primary mb-4`} />
                                                        <h4 className="mb-3">{title}</h4>
                                                        <p className="mb-4">{description?.slice(0,30)}...</p>
                                                        <a href="#" className="btn btn-primary px-4 py-2 rounded-pill">Read More</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                {/* Service End */}
            </div>


        </div>
    )
}

export default Service
