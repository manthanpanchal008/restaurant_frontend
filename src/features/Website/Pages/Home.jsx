import React, { useEffect } from 'react';
import Header from '../Coman/Header';
import Footer from '../Coman/Footer';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useGetServiceQuery } from '../../../services/serviceApi';
import { useGetMenuQuery } from '../../../services/menuApi';
import { useGetBlogsQuery } from '../../../services/blogApi';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
    visible: { transition: { staggerChildren: 0.2 } }
};

function Home() {
    const { data: services, isLoading: serviceLoading } = useGetServiceQuery();
    const { data: menu, isLoading: menuLoading } = useGetMenuQuery();
    const { data: blogs, isLoading: blogLoading } = useGetBlogsQuery();

    return (
        <div className="bg-white">
            <Header />

            {/* 🚀 HERO SECTION */}
            <section className="container-fluid bg-light py-6 mb-5 overflow-hidden position-relative" style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}>
                <div className="container">
                    <div className="row g-5 align-items-center">
                        <motion.div
                            className="col-lg-7 text-start"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                        >
                            <motion.small variants={fadeIn} className="d-inline-block fw-bold text-dark text-uppercase bg-white border border-primary rounded-pill px-4 py-1 mb-4 shadow-sm">
                                Exquisite Catering Services
                            </motion.small>
                            <motion.h1 variants={fadeIn} className="display-1 mb-4 fw-bold">
                                Book <span className="text-primary">Cater</span>Serv For Your <span className="text-secondary italic">Dream</span> Event
                            </motion.h1>
                            <motion.p variants={fadeIn} className="lead text-muted mb-5 pe-lg-5">
                                From intimate gatherings to grand celebrations, we bring culinary masterpieces and premium service to your doorstep.
                            </motion.p>
                            <motion.div variants={fadeIn} className="d-flex gap-3">
                                <Link to="/book" className="btn btn-primary border-0 rounded-pill py-3 px-5 shadow-lg">Book Now</Link>
                                <Link to="/menu" className="btn btn-outline-primary border-2 rounded-pill py-3 px-5 fw-bold">View Menu</Link>
                            </motion.div>
                        </motion.div>
                        <motion.div
                            className="col-lg-5"
                            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="position-relative">
                                <img src="img/hero.png" className="img-fluid rounded-4 shadow-2xl" alt="Hero Food" />
                                <div className="position-absolute bottom-0 start-0 bg-primary text-white p-4 rounded-4 shadow-lg m-3 d-none d-md-block bounce-slow">
                                    <h2 className="mb-0 fw-bold lh-1">200+</h2>
                                    <small>Happy Events</small>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 🍱 FEATURED MENU */}
            <section className="container py-6">
                <div className="text-center mb-5">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                        <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">Our Highlights</small>
                        <h2 className="display-5 mb-0 fw-bold">Crowd Favorites</h2>
                    </motion.div>
                </div>

                <div className="row g-4 justify-content-center">
                    {menuLoading ? (
                        Array(3).fill(0).map((_, i) => (
                            <div key={i} className="col-md-4"><Skeleton height={300} className="rounded-4" /></div>
                        ))
                    ) : (
                        menu?.data?.slice(0, 3).map((item, idx) => (
                            <motion.div
                                key={item._id}
                                className="col-md-4"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100 hover-lift">
                                    <img src={item.img} className="card-img-top" style={{ height: "200px", objectFit: "cover" }} alt={item.name} />
                                    <div className="card-body p-4 text-start">
                                        <div className="d-flex justify-content-between mb-2">
                                            <h5 className="fw-bold mb-0">{item.name}</h5>
                                            <span className="text-primary fw-bold">₹{item.price}</span>
                                        </div>
                                        <p className="text-muted small mb-0">{item.desc.substring(0, 60)}...</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
                <div className="text-center mt-5">
                    <Link to="/menu" className="btn btn-primary rounded-pill px-5">Explore Full Menu</Link>
                </div>
            </section>

            {/* 💼 SERVICES OVERVIEW */}
            <section className="container-fluid bg-light py-6">
                <div className="container">
                    <div className="row g-5 align-items-center">
                        <motion.div
                            className="col-lg-5"
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <img src="img/about.jpg" className="img-fluid rounded-4 shadow" alt="About Services" />
                        </motion.div>
                        <motion.div
                            className="col-lg-7 text-start"
                            initial={{ x: 50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <small className="d-inline-block fw-bold text-dark text-uppercase bg-white border border-primary rounded-pill px-4 py-1 mb-3">Why Choose Us</small>
                            <h2 className="display-5 mb-4 fw-bold">Professional Catering For Every Occasion</h2>
                            <p className="mb-5 text-muted">We provide end-to-end catering solutions, from world-class chefs to premium hospitality staff, ensuring your event is a grand success.</p>

                            <div className="row g-4 h-100">
                                {serviceLoading ? <Skeleton count={4} /> : services?.data?.slice(0, 4).map((s, i) => (
                                    <div key={i} className="col-sm-6">
                                        <div className="d-flex align-items-center">
                                            <div className="bg-primary text-white p-2 rounded-circle me-3"><i className="fa fa-check"></i></div>
                                            <h6 className="mb-0 fw-bold">{s.title}</h6>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link to="/service" className="btn btn-primary rounded-pill px-5 py-3 mt-5 shadow">Discover All Services</Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 📈 FACTS COUNTER */}
            <section className="container-fluid bg-primary py-6 my-6">
                <div className="container">
                    <div className="row g-4 text-center">
                        {[
                            { label: "Happy Customers", val: "200+" },
                            { label: "Expert Chefs", val: "25+" },
                            { label: "Events Done", val: "500+" },
                            { label: "Cities Covered", val: "10+" }
                        ].map((f, i) => (

                            <motion.div
                                key={i}
                                className="col-md-3"
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="text-white">
                                    <h2 className="display-4 fw-bold mb-0">{f.val}</h2>


                                    <p className="text-uppercase small mb-0 fw-bold opacity-75">{f.label}</p>
                                </div>
                            </motion.div>
                        ))}

                    </div>
                </div>
            </section>

            {/* ✍️ LATEST BLOGS */}
            <section className="container py-6">
                <div className="text-center mb-5">
                    <h2 className="display-5 fw-bold mb-0">Culinary Updates</h2>
                    <p className="text-muted">Direct from the kitchens of CaterServ</p>
                </div>
                <div className="row g-4">
                    {blogLoading ? <Skeleton count={3} /> : blogs?.data?.slice(0, 3).map((b, i) => (
                        <motion.div
                            key={i}
                            className="col-md-4"
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className="blog-item card border-0 shadow-sm rounded-4 overflow-hidden h-100 border-top border-primary border-4">
                                <img src={b.img} className="card-img-top" style={{ height: "200px", objectFit: "cover" }} alt={b.topic} />
                                <div className="card-body p-4 text-start">
                                    <h6 className="fw-bold mb-3">{b.topic}</h6>
                                    <Link to={`/blog/${b._id}`} className="btn btn-link p-0 text-primary text-decoration-none small fw-bold">Read Article →</Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

        </div>
    );
}

export default Home;
