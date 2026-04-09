import React, { useEffect, useState } from 'react'
import Header from '../Coman/Header'
import Heros from '../Coman/Heros'
import Footer from '../Coman/Footer'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useGetEventsQuery } from '../../../services/eventApi'
function Events() {

    // const [events, setevents] = useState([])
    const [filtered, setFiltered] = useState([])
    // const [isLoading, setIsLoading] = useState(true)
    const { data: events, isLoading, error } = useGetEventsQuery(); 
    
    useEffect(()=>{
        if(events)
        setFiltered(events.data)
    },[events])
 
    
    const filterCategory = (name) => {
        if (name === "All") {
            setFiltered(events)
        } else {
            const result = events.filter((item) => item.category === name)
            setFiltered(result)
        }
    }

    // 🔥 Reusable map function
    const renderEvents = () => {
        return filtered.map((data) => (
            <div key={data._id} className="col-md-6 col-lg-3">
                <div className="event-img position-relative">
                    <img className="img-fluid rounded w-100" src={data.img} alt="" />
                    <div className="event-overlay d-flex flex-column p-4">
                        <h4 className="me-auto">{data.category}</h4>
                        <a href="#" className="my-auto">
                            <i className="fas fa-search-plus text-dark fa-2x" />
                        </a>
                    </div>
                </div>
            </div>
        ))
    }

    const renderSkeleton = () => {
        return Array(4)
            .fill(0)
            .map((_, index) => (
                <div key={index} className="col-md-6 col-lg-3">
                    <div className="event-img position-relative">
                        <Skeleton height={250} className="w-100 rounded" />
                        <div className="event-overlay d-flex flex-column p-4">
                            <h4 className="me-auto"><Skeleton width={80} /></h4>
                        </div>
                    </div>
                </div>
            ))
    }


    return (
        <div>
            <div>
                {/* Events Start */}
                <div className="container-fluid event py-6">
                    <div className="container">
                        <div className="text-center">
                            <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">Latest Events</small>
                            <h1 className="display-5 mb-5">Our Social &amp; Professional Events Gallery</h1>
                        </div>
                        <div className="tab-class text-center">
                            <ul className="nav nav-pills d-inline-flex justify-content-center mb-5">
                                <li className="nav-item p-2">
                                    <a className="d-flex mx-2 py-2 border border-primary bg-light rounded-pill active" data-bs-toggle="pill" href="#tab-1">
                                        <span className="text-dark" style={{ width: 150 }} onClick={() => filterCategory("All")}>All Events</span>
                                    </a>
                                </li>
                                <li className="nav-item p-2">
                                    <a className="d-flex py-2 mx-2 border border-primary bg-light rounded-pill" data-bs-toggle="pill" href="#tab-2">
                                        <span className="text-dark" style={{ width: 150 }} onClick={() => filterCategory("Wedding")}>Wedding</span>
                                    </a>
                                </li>
                                <li className="nav-item p-2">
                                    <a className="d-flex mx-2 py-2 border border-primary bg-light rounded-pill" data-bs-toggle="pill" href="#tab-3">
                                        <span className="text-dark" style={{ width: 150 }} onClick={() => filterCategory("Corporate")}>Corporate</span>
                                    </a>
                                </li>
                                <li className="nav-item p-2">
                                    <a className="d-flex mx-2 py-2 border border-primary bg-light rounded-pill" data-bs-toggle="pill" href="#tab-4">
                                        <span className="text-dark" style={{ width: 150 }} onClick={() => filterCategory("Cocktail")}>Cocktail</span>
                                    </a>
                                </li>
                                <li className="nav-item p-2">
                                    <a className="d-flex mx-2 py-2 border border-primary bg-light rounded-pill" data-bs-toggle="pill" href="#tab-5">
                                        <span className="text-dark" style={{ width: 150 }} onClick={() => filterCategory("Buffet")}>Buffet</span>
                                    </a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div id="tab-1" className="tab-pane fade show p-0 active">
                                    <div className="row g-4">
                                        <div className="col-lg-12">
                                            <div className="row g-4">
                                               {isLoading ? renderSkeleton() : renderEvents()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Events End */}  

            </div>
      


        </div>
    )
}

export default Events
