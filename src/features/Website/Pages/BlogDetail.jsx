import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetSingleBlogQuery } from "../../../services/blogApi";
import { motion } from "framer-motion";

function BlogDetail() {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleBlogQuery(id);

  const blog = data?.data;

  if (isLoading) return (
    <div className="container py-6 text-center">
      <div className="spinner-border text-primary"></div>
    </div>
  );

  if (!blog) return (
    <div className="container py-6 text-center">
      <h3>Blog post not found 🕵️‍♂️</h3>
      <Link to="/blog" className="btn btn-primary mt-3">Back to Blogs</Link>
    </div>
  );

  return (
    <div className="bg-light pb-6">
      {/* 🖼️ HERO HEADER */}
      <div className="position-relative overflow-hidden mb-5" style={{ height: "60vh" }}>
        <img 
          src={blog.img} 
          alt={blog.title} 
          className="w-100 h-100 object-fit-cover"
        />
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))" }}></div>
        <div className="position-absolute bottom-0 start-0 w-100 p-4 p-md-5 text-white">
          <div className="container">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <span className="badge bg-primary px-3 py-2 rounded-pill mb-3">Culinary Blog</span>
              <h1 className="display-4 fw-bold mb-3">{blog.title}</h1>
              <div className="d-flex align-items-center gap-3">
                 <div className="d-flex align-items-center">
                    <i className="fa fa-calendar-alt me-2 text-primary"></i>
                    <span>{new Date(blog.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                 </div>
                 <div className="d-flex align-items-center">
                    <i className="fa fa-user me-2 text-primary"></i>
                    <span>CaterServ Admin</span>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.4 }}
               className="card shadow-sm border-0 rounded-4 p-4 p-md-5 bg-white mb-5"
            >
              {/* 📜 CONTENT */}
              <p className="lead text-dark fw-semibold mb-4" style={{ lineHeight: "1.8" }}>
                Discover the story behind this delicious journey. We bring you the finest insights into the world of catering and hospitality.
              </p>
              
              <div className="blog-body text-muted mb-5" style={{ lineHeight: "1.9", fontSize: "1.1rem" }}>
                 {blog.desc}
                 {/* Imagine more content here for realism */}
                 <div className="mt-4 p-4 bg-light border-start border-primary border-4 rounded-3 italic">
                    "Food is not just about eating, it's about the experience and the memories we create around the table. At CaterServ, we believe every meal should be a masterpiece."
                 </div>
                 <p className="mt-4">
                   Whether you are planning a grand wedding or an intimate corporate lunch, understanding the nuances of menu selection and service style is crucial. In this post, we've explored the core elements that make an event truly unforgettable.
                 </p>
              </div>

              <hr className="my-5 opacity-10" />

              {/* 🔗 SHARE & BACK */}
              <div className="d-flex justify-content-between align-items-center">
                 <Link to="/blog" className="btn btn-outline-primary rounded-pill px-4">
                    <i className="fa fa-arrow-left me-2"></i>Back to Feed
                 </Link>
                 <div className="d-flex gap-2">
                    <button className="btn btn-sm-square bg-light rounded-circle text-primary border-0"><i className="fab fa-facebook-f"></i></button>
                    <button className="btn btn-sm-square bg-light rounded-circle text-primary border-0"><i className="fab fa-twitter"></i></button>
                    <button className="btn btn-sm-square bg-light rounded-circle text-primary border-0"><i className="fab fa-whatsapp"></i></button>
                 </div>
              </div>
            </motion.div>
          </div>

          {/* 🏷️ INFO SIDEBAR (Desktop) */}
          <div className="col-lg-3 d-none d-lg-block">
             <div className="sticky-top" style={{ top: "100px" }}>
                <div className="card shadow-sm border-0 rounded-4 p-4 mb-4">
                   <h6 className="fw-bold mb-3 border-bottom pb-2">Top Categories</h6>
                   <div className="d-flex flex-wrap gap-2">
                      <span className="badge bg-light text-dark border p-2">Events</span>
                      <span className="badge bg-light text-dark border p-2">Recipes</span>
                      <span className="badge bg-light text-dark border p-2">Kitchen</span>
                      <span className="badge bg-light text-dark border p-2">Service</span>
                   </div>
                </div>
                
                <div className="card shadow p-4 rounded-4 bg-primary text-white border-0 text-center">
                   <h5 className="fw-bold">Hungry?</h5>
                   <p className="small opacity-75">Check out our latest menu and order now!</p>
                   <Link to="/menu" className="btn btn-white text-primary rounded-pill fw-bold w-100">Order Now</Link>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
