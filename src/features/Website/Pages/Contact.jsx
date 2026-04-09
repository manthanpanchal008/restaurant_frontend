import React from 'react';
import Header from '../Coman/Header';
import Heros from '../Coman/Heros';
import Footer from '../Coman/Footer';
import { motion } from 'framer-motion';

function Contact() {
    return (
        <div>
            <Header />
            <Heros name="Contact" title="Get In Touch" />
            
            {/* Contact Start */}
            <div className="container-fluid contact py-6 bg-light">
                <div className="container">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="p-5 bg-white shadow-sm rounded-4 contact-form border-top border-primary border-5"
                    >
                        <div className="row g-4 text-start">
                            <div className="col-12 mb-4">
                                <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3 shadow-sm">Get in touch</small>
                                <h1 className="display-5 mb-0 fw-bold">Contact Us For Any Queries!</h1>
                                <p className="text-muted mt-3">We are here to help you plan the perfect culinary experience. Reach out for bookings, inquiries, or just to say hello!</p>
                            </div>
                            
                            <motion.div 
                                className="col-md-6 col-lg-7"
                                initial={{ x: -30, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                <form>
                                    <div className="mb-4">
                                        <label className="form-label small fw-bold text-muted">YOUR NAME</label>
                                        <input type="text" className="form-control p-3 border-0 bg-light rounded-3 shadow-none" placeholder="Enter your name" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label small fw-bold text-muted">EMAIL ADDRESS</label>
                                        <input type="email" className="form-control p-3 border-0 bg-light rounded-3 shadow-none" placeholder="Enter your email" />
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label small fw-bold text-muted">YOUR MESSAGE</label>
                                        <textarea className="form-control p-3 border-0 bg-light rounded-3 shadow-none" rows={4} placeholder="How can we help you?" />
                                    </div>
                                    <button className="w-100 btn btn-primary py-3 rounded-pill fw-bold shadow-lg" type="submit">Send Message Now</button>
                                </form>
                            </motion.div>

                            <motion.div 
                                className="col-md-6 col-lg-5"
                                initial={{ x: 30, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                            >
                                <div className="ps-lg-4">
                                    <div className="d-flex w-100 bg-light p-4 rounded-4 mb-4 hover-lift shadow-sm border-0">
                                        <div className="bg-primary text-white p-3 rounded-circle me-4 shadow-sm d-flex align-items-center justify-content-center" style={{ width: "60px", height: "60px" }}>
                                            <i className="fas fa-map-marker-alt fs-4" />
                                        </div>
                                        <div>
                                            <h5 className="fw-bold mb-1">Our Location</h5>
                                            <p className="text-muted mb-0">123 Culinary St, NYC, USA</p>
                                        </div>
                                    </div>
                                    
                                    <div className="d-flex w-100 bg-light p-4 rounded-4 mb-4 hover-lift shadow-sm border-0">
                                        <div className="bg-primary text-white p-3 rounded-circle me-4 shadow-sm d-flex align-items-center justify-content-center" style={{ width: "60px", height: "60px" }}>
                                            <i className="fas fa-envelope fs-4" />
                                        </div>
                                        <div>
                                            <h5 className="fw-bold mb-1">Mail Us</h5>
                                            <p className="text-muted mb-0 small">bookings@caterserv.com</p>
                                            <p className="text-muted mb-0 small">support@caterserv.com</p>
                                        </div>
                                    </div>
                                    
                                    <div className="d-flex w-100 bg-light p-4 rounded-4 hover-lift shadow-sm border-0">
                                        <div className="bg-primary text-white p-3 rounded-circle me-4 shadow-sm d-flex align-items-center justify-content-center" style={{ width: "60px", height: "60px" }}>
                                            <i className="fa fa-phone-alt fs-4" />
                                        </div>
                                        <div>
                                            <h5 className="fw-bold mb-1">Telephone</h5>
                                            <p className="text-muted mb-0 small">(+012) 3456 789</p>
                                            <p className="text-muted mb-0 small">(+704) 5550 127</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
            {/* Contact End */}
            <Footer />
        </div>
    )
}

export default Contact;
