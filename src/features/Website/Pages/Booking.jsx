import React from 'react';
import Header from '../Coman/Header';
import Heros from '../Coman/Heros';
import Footer from '../Coman/Footer';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

function Booking() {
    return (
        <div>
            <Header />
            <Heros name="Online Booking" title="Reserve Your Event" />
            
            {/* Book Us Start */}
            <div className="container-fluid contact py-6 bg-light">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <motion.div 
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeIn}
                                className="bg-white shadow-lg rounded-4 overflow-hidden border-top border-primary border-5"
                            >
                                <div className="row g-0">
                                    {/* 🎨 SIDE ART */}
                                    <div className="col-md-4 d-none d-md-block position-relative">
                                        <img src="img/background-site.jpg" className="h-100 w-100 object-fit-cover opacity-75" alt="Booking Background" />
                                        <div className="position-absolute top-50 start-50 translate-middle text-white text-center w-100 p-4">
                                            <h3 className="fw-bold text-shadow">CaterServ</h3>
                                            <p className="small mb-0 fw-semibold text-shadow">Turning your events into memories.</p>
                                        </div>
                                    </div>
                                    
                                    {/* 📝 FORM AREA */}
                                    <div className="col-md-8 p-4 p-md-5">
                                        <div className="text-center mb-5">
                                            <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">Book Us</small>
                                            <h2 className="fw-bold text-dark">Plan Your Perfect Event</h2>
                                            <p className="text-muted small">Fill out the details below and we'll get back to you with a custom quote.</p>
                                        </div>
                                        
                                        <motion.div variants={stagger} className="row g-4 text-start">
                                            <motion.div variants={fadeIn} className="col-lg-4 col-md-6">
                                                <label className="form-label small fw-bold text-muted">DESTINATION COUNTRY</label>
                                                <select className="form-select border-0 bg-light p-3 shadow-none rounded-3">
                                                    <option selected>Select Country</option>
                                                    <option value={1}>USA</option>
                                                    <option value={2}>UK</option>
                                                    <option value={3}>India</option>
                                                </select>
                                            </motion.div>
                                            <motion.div variants={fadeIn} className="col-lg-4 col-md-6">
                                                <label className="form-label small fw-bold text-muted">CITY / AREA</label>
                                                <select className="form-select border-0 bg-light p-3 shadow-none rounded-3">
                                                    <option selected>Select City</option>
                                                    <option value={1}>NYC</option>
                                                    <option value={2}>London</option>
                                                    <option value={3}>Mumbai</option>
                                                </select>
                                            </motion.div>
                                            <motion.div variants={fadeIn} className="col-lg-4 col-md-6">
                                                <label className="form-label small fw-bold text-muted">VENUE TYPE</label>
                                                <select className="form-select border-0 bg-light p-3 shadow-none rounded-3">
                                                    <option selected>Select Venue</option>
                                                    <option value={1}>Indoor Hall</option>
                                                    <option value={2}>Outdoor Garden</option>
                                                    <option value={3}>Personal Residence</option>
                                                </select>
                                            </motion.div>
                                            <motion.div variants={fadeIn} className="col-lg-4 col-md-6">
                                                <label className="form-label small fw-bold text-muted">EVENT SCALE</label>
                                                <select className="form-select border-0 bg-light p-3 shadow-none rounded-3">
                                                    <option selected>Small (Under 50)</option>
                                                    <option value={1}>Medium (50-200)</option>
                                                    <option value={2}>Large (200+)</option>
                                                </select>
                                            </motion.div>
                                            <motion.div variants={fadeIn} className="col-lg-4 col-md-6">
                                                <label className="form-label small fw-bold text-muted">GUEST COUNT</label>
                                                <select className="form-select border-0 bg-light p-3 shadow-none rounded-3">
                                                    <option selected>Select Guests</option>
                                                    <option value={1}>100-200</option>
                                                    <option value={2}>300-400</option>
                                                    <option value={3}>500+</option>
                                                </select>
                                            </motion.div>
                                            <motion.div variants={fadeIn} className="col-lg-4 col-md-6">
                                                <label className="form-label small fw-bold text-muted">DIETARY PREFERENCE</label>
                                                <select className="form-select border-0 bg-light p-3 shadow-none rounded-3">
                                                    <option selected>Vegetarian</option>
                                                    <option value={1}>Non-Vegetarian</option>
                                                    <option value={2}>Vegan / No-Onion</option>
                                                </select>
                                            </motion.div>
                                            <motion.div variants={fadeIn} className="col-lg-4 col-md-6">
                                                <label className="form-label small fw-bold text-muted">CONTACT NO.</label>
                                                <input type="text" className="form-control border-0 bg-light p-3 shadow-none rounded-3" placeholder="Enter mobile number" />
                                            </motion.div>
                                            <motion.div variants={fadeIn} className="col-lg-4 col-md-6">
                                                <label className="form-label small fw-bold text-muted">EVENT DATE</label>
                                                <input type="date" className="form-control border-0 bg-light p-3 shadow-none rounded-3" />
                                            </motion.div>
                                            <motion.div variants={fadeIn} className="col-lg-4 col-md-6">
                                                <label className="form-label small fw-bold text-muted">EMAIL ADDRESS</label>
                                                <input type="email" className="form-control border-0 bg-light p-3 shadow-none rounded-3" placeholder="Enter your email" />
                                            </motion.div>
                                            
                                            <motion.div variants={fadeIn} className="col-12 mt-5">
                                                <button type="submit" className="btn btn-primary w-100 py-3 rounded-pill fw-bold shadow-lg">Confirm Booking Request</button>
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Book Us End */}

            <Footer />
        </div>
    )
}

export default Booking;
