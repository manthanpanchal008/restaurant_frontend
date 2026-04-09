import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Coman/Header';
import Heros from '../Coman/Heros';
import Footer from '../Coman/Footer';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useGetBlogsQuery } from '../../../services/blogApi';

function Blogs() {
  const { isLoading: loading, data: blog = [] } = useGetBlogsQuery();

  return (
    <div>
      <Header />
      <Heros name="Blogs" title="Our Stories" />

      {/* Blog Start */}
      <div className="container-fluid blog py-6 bg-light">
        <div className="container">
          <div className="text-center">
            <small className="d-inline-block fw-bold text-dark text-uppercase bg-white border border-primary rounded-pill px-4 py-1 mb-3 shadow-sm">
              Our Blog
            </small>
            <h2 className="display-5 mb-5 fw-bold">
              CaterServ <span className="text-primary">Culinary Stories</span>
            </h2>
          </div>

          <div className="row g-4 justify-content-center">
            {loading ? (
              Array(3).fill(0).map((_, index) => (
                <div className="col-md-6 col-lg-4" key={index}>
                  <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                    <Skeleton height={250} />
                    <div className="p-4 text-start">
                      <Skeleton count={1} height={25} className="mb-2" />
                      <Skeleton count={2} height={15} />
                    </div>
                  </div>
                </div>
              ))
            ) : blog?.data?.length === 0 ? (
              <div className="text-center py-5">
                <h3>No news yet! 📪</h3>
                <p className="text-muted">Check back later for exciting culinary updates.</p>
              </div>
            ) : (
              blog.data.map((item) => {
                const date = new Date(item.createdAt);
                const day = date.getDate();
                const month = date.toLocaleString('default', { month: 'short' });

                return (
                  <div className="col-md-6 col-lg-4" key={item._id}>
                    <div className="blog-item card border-0 shadow h-100 rounded-4 overflow-hidden border-top border-primary border-4">
                      {/* IMAGE */}
                      <div className="position-relative overflow-hidden">
                        <img 
                          src={item.img} 
                          className="card-img-top w-100" 
                          style={{ height: "250px", objectFit: "cover", transition: '0.3s' }} 
                          alt={item.topic} 
                        />
                        <div className="position-absolute top-0 start-0 m-3 text-dark bg-primary rounded px-3 py-2 text-center shadow">
                          <p className="fw-bold mb-0 lh-1">{day}</p>
                          <p className="fw-bold mb-0 small">{month}</p>
                        </div>
                      </div>

                      {/* CONTENT */}
                      <div className="card-body p-4 d-flex flex-column text-start bg-white">
                        <h5 className="card-title fw-bold mb-3">{item.topic}</h5>
                        <p className="card-text text-muted small mb-4 flex-grow-1">
                          {item.desc.substring(0, 100)}...
                        </p>
                        <Link to={`/blog/${item._id}`} className="btn btn-primary rounded-pill px-4 btn-sm fw-bold align-self-start shadow-sm">
                          Read Full Story
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      {/* Blog End */}

      <Footer />
    </div>
  );
}

export default Blogs;