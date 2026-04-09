import React, { useEffect, useState } from "react";
import Header from "../Coman/Header";
import Heros from "../Coman/Heros";
import Footer from "../Coman/Footer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../../slice/cartSlice";
import { useGetMenuQuery } from "../../../services/menuApi";
import { useNavigate } from "react-router-dom";

function Menu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const { data, isLoading: loading, error } = useGetMenuQuery();
  const menu = data?.data || [];

  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");

  useEffect(() => {
    if (error) {
      toast.error("Uh-oh! We couldn't fetch the menu. Please check your connection. 🍱");
    }
  }, [error]);

  useEffect(() => {
    let result = [...menu];

    if (activeCategory !== "ALL") {
      result = result.filter((item) => item.category === activeCategory);
    }

    if (searchTerm) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFiltered(result);
  }, [menu, activeCategory, searchTerm]);

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  const handleAdd = (item) => {
    if (!user) {
      navigate("/login");
      return;
    }
    dispatch(addToCart(item));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const renderMenu = () => {
    return filtered.map((item) => {
      const cartItem = cartItems.find(i => i._id === item._id);
      return (
        <motion.div
          key={item._id}
          className="col-lg-6 mb-4"
          variants={cardVariant}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        >
          <div className="d-flex align-items-center justify-content-between w-100 h-100 bg-white p-3 rounded shadow-sm border">
            <div className="d-flex align-items-center w-100">
              <motion.img
                className="flex-shrink-0 img-fluid rounded-circle border"
                src={item.img}
                style={{ width: "90px", height: "90px", objectFit: "cover" }}
                alt={item.name}
                whileHover={{ scale: 1.1 }}
              />

              <div className="w-100 d-flex flex-column text-start ps-4">
                <div className="d-flex justify-content-between border-bottom border-primary pb-1 mb-2">
                  <h5 className="mb-0 fw-bold">{item.name}</h5>
                  <span className="text-primary fw-bold">₹{item.price}</span>
                </div>
                <p className="mb-0 text-muted small">{item.desc}</p>
              </div>
            </div>

            <div className="ms-4 flex-shrink-0">
              {!cartItem ? (
                <button
                  className="btn btn-primary rounded-pill px-4 btn-sm"
                  onClick={() => handleAdd(item)}
                >
                  Add
                </button>
              ) : (
                <div className="d-flex align-items-center justify-content-between border border-primary rounded-pill px-1">
                  <button
                    className="btn btn-sm btn-link text-primary p-1"
                    onClick={() => handleRemove(item._id)}
                  >
                    <i className="fa fa-minus small"></i>
                  </button>
                  <span className="px-2 fw-bold small">{cartItem.qty}</span>
                  <button
                    className="btn btn-sm btn-link text-primary p-1"
                    onClick={() => handleAdd(item)}
                  >
                    <i className="fa fa-plus small"></i>
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      );
    });
  };

  const renderSkeleton = () => {
    return Array(6)
      .fill(0)
      .map((_, index) => (
        <div key={index} className="col-lg-6 mb-4">
          <div className="d-flex align-items-center justify-content-between w-100 h-100 p-3">
            <div className="d-flex align-items-center w-100">
              <Skeleton circle={true} height={80} width={80} className="flex-shrink-0" />
              <div className="w-100 d-flex flex-column text-start ps-4">
                <div className="d-flex justify-content-between border-bottom border-primary pb-1 mb-2">
                  <Skeleton width={120} height={20} />
                  <Skeleton width={40} height={20} />
                </div>
                <Skeleton count={2} height={10} />
              </div>
            </div>
          </div>
        </div>
      ));
  };

  return (
    <div>
      <div className="container-fluid menu py-6">
        <div className="container">
          <div className="text-center mb-5">
            <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
              Our Menu
            </small>
            <h1 className="display-5 mb-4">Delicious Dishes For You</h1>

            {/* 🔍 SEARCH BAR */}
            <div className="row justify-content-center mb-4">
              <div className="col-md-6 col-lg-5">
                <div className="input-group shadow-sm rounded-pill overflow-hidden border bg-white">
                  <span className="input-group-text bg-white border-0 ps-3">
                    <i className="fa fa-search text-primary"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control border-0 py-2 shadow-none"
                    placeholder="Find a dish..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button className="btn bg-white border-0 pe-3" onClick={() => setSearchTerm("")}>
                      <i className="fa fa-times text-muted"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* 🏷️ CATEGORY TABS */}
            <ul className="nav nav-pills d-inline-flex justify-content-center mb-5 bg-light p-1 rounded-pill shadow-sm border">
              {["ALL", "STARTER", "MAIN", "DRINKS", "DESSERT"].map((cat) => (
                <li key={cat} className="nav-item">
                  <button
                    className={`nav-link rounded-pill py-2 px-3 border-0 fw-bold small ${activeCategory === cat ? "active bg-primary text-white shadow" : "text-dark"
                      }`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat === "ALL" ? "All Items" : cat.charAt(0) + cat.slice(1).toLowerCase()}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="tab-content">
            <div className="tab-pane fade show p-0 active">
              {filtered.length === 0 && !loading && (
                <div className="text-center py-5 shadow-sm rounded-4 bg-white border">
                  <i className="fa fa-utensils fs-1 text-muted mb-3 d-block"></i>
                  <h4 className="text-muted">No dishes found</h4>
                  <button className="btn btn-primary mt-3 rounded-pill" onClick={() => { setSearchTerm(""); setActiveCategory("ALL"); }}>
                    Reset Filters
                  </button>
                </div>
              )}

              <motion.div
                className="row g-4"
                variants={container}
                initial="hidden"
                animate="visible"
              >
                {loading ? renderSkeleton() : renderMenu()}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
