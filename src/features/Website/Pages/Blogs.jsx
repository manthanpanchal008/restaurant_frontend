import React, { useEffect, useState } from 'react'
import Header from '../Coman/Header'
import Heros from '../Coman/Heros'
import Footer from '../Coman/Footer'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useGetBlogsQuery } from '../../../services/blogApi';
function Blogs() {
const {isLoading:loading,data:blog=[]} = useGetBlogsQuery()
    return (
        <div>
            <Header />
            <Heros name="blogs" title="blogs" />

            {/* Blog Start */}
            <div className="container-fluid blog py-6">
                <div className="container">

                    <div className="text-center">
                        <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
                            Our Blog
                        </small>
                        <h1 className="display-5 mb-5">
                            Be First Who Read News
                        </h1>
                    </div>

                    <div className="row gx-4 justify-content-center">

                        {loading ? (
                            Array(3).fill(0).map((_, index) => (
                                <div className="col-md-6 col-lg-4" key={index}>
                                    <div className="blog-item">
                                        <div className="overflow-hidden rounded">
                                            <Skeleton height={250} />
                                        </div>
                                        <div className="blog-content mx-4 d-flex rounded bg-light">
                                            <div className="text-dark bg-primary rounded-start p-3">
                                                <Skeleton width={30} height={40} />
                                            </div>
                                            <div className="my-auto h-100 p-3 w-100">
                                                <Skeleton count={1} height={20} />
                                                <Skeleton count={2} height={10} className="mt-2" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            blog.data.map((item, index) => {

                                // ✅ Format Date
                                const date = new Date(item.createdAt)
                                const day = date.getDate()
                                const month = date.toLocaleString('default', { month: 'short' })

                                return (
                                    <div
                                        className="col-md-6 col-lg-4"
                                        key={item._id}

                                    >
                                        <div className="blog-item">

                                            {/* IMAGE */}
                                            <div className="overflow-hidden rounded">
                                                <img
                                                    src={item.img}
                                                    className="img-fluid w-100"
                                                    alt={item.topic}
                                                />
                                            </div>

                                            {/* CONTENT */}
                                            <div className="blog-content mx-4 d-flex rounded bg-light">

                                                {/* DATE */}
                                                <div className="text-dark bg-primary rounded-start">
                                                    <div className="h-100 p-3 d-flex flex-column justify-content-center text-center">
                                                        <p className="fw-bold mb-0">{day}</p>
                                                        <p className="fw-bold mb-0">{month}</p>
                                                    </div>
                                                </div>

                                                {/* TEXT */}
                                                <div className="my-auto h-100 p-3">
                                                    <h5 className="lh-base">{item.topic}</h5>
                                                    <p className="mb-0 small text-muted">
                                                        {item.desc.substring(0, 60)}...
                                                    </p>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                )
                            })
                        )}

                    </div>
                </div>
            </div>
            {/* Blog End */}

            <Footer />
        </div>
    )
}

export default Blogs