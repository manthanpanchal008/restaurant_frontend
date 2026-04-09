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
  const navigate = useNavigate()
  const user = useSelector(state => state.auth.user);
const cartItems = useSelector((state) => state.cart.cartItems);
  const [filtered, setFiltered] = useState([]);
 const {data,isLoading:loading} = useGetMenuQuery()
 const menu = data?.data || [];
  
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
      return;}
    dispatch(addToCart(item));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };


  useEffect(() => {
    if(menu)
    setFiltered(menu)
  }, [menu]);

  const filterCategory = (name) => {
    if (name === "ALL") {
      setFiltered(menu);
    } else {
      const result = menu.filter((item) => item.category === name);
      setFiltered(result);
    }
  };
  const renderMenu = () => {
    return filtered.map((item) => {
      const cartItem = cartItems.find(i => i._id === item._id);
      return(
      <motion.div
        key={item._id}
        className="col-lg-6 mb-4"
        variants={cardVariant}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
      >
        <div className="d-flex align-items-center justify-content-between w-100 h-100">
          <div className="d-flex align-items-center w-100">
            <motion.img
              className="flex-shrink-0 img-fluid rounded-circle"
              src={item.img}
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
              alt=""
              whileHover={{ scale: 1.1 }}
            />

            <div className="w-100 d-flex flex-column text-start ps-4">
              <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                <h4>{item.name}</h4>
                <h4 className="text-primary">₹{item.price}</h4>
              </div>
              <p className="mb-0">{item.desc}</p>
            </div>
          </div>

          <div className="ms-4 flex-shrink-0">
            {!cartItem  ? (
              <motion.button
                className="btn btn-primary rounded-pill px-4"
                onClick={() => handleAdd(item)}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
              >
                Add
              </motion.button>
            ) : (
              <div className="d-flex align-items-center justify-content-between border border-primary rounded-pill px-2">
                <motion.button
                  className="btn btn-sm btn-link text-primary fw-bold"
                  onClick={() => handleRemove(item._id)}
                  whileTap={{ scale: 0.8 }}
                >
                  -
                </motion.button>

                <motion.span
                  key={cartItem.qty}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="px-2 fw-bold"
                >
                  {cartItem.qty}
                </motion.span>

                <motion.button
                  className="btn btn-sm btn-link text-primary fw-bold"
                  onClick={() => handleAdd(item)}
                  whileTap={{ scale: 0.8 }}
                >
                  +
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
      )
  });
  };
  const renderSkeleton = () => {
    return Array(6)
      .fill(0)
      .map((_, index) => (
        <div key={index} className="col-lg-6 mb-4">
          <div className="d-flex align-items-center justify-content-between w-100 h-100">
            <div className="d-flex align-items-center w-100">
              <Skeleton
                circle={true}
                height={100}
                width={100}
                className="flex-shrink-0"
              />
              <div className="w-100 d-flex flex-column text-start ps-4">
                <div className="d-flex justify-content-between border-bottom border-primary pb-2 mb-2">
                  <Skeleton width={150} height={25} />
                  <Skeleton width={50} height={25} />
                </div>
                <Skeleton count={2} height={15} />
              </div>
            </div>
            <div className="ms-4 flex-shrink-0">
              <Skeleton width={80} height={40} className="rounded-pill" />
            </div>
          </div>
        </div>
      ));
  };

  return (
    <div>

      {/* Menu Start */}
      <div className="container-fluid menu py-6">
        <div className="container">
          <div className="text-center">
            <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">
              Our Menu
            </small>
            <h1 className="display-5 mb-5">Most Popular Food in the World</h1>
          </div>
          <div className="tab-class text-center">
            <ul className="nav nav-pills d-inline-flex justify-content-center mb-5">
              <li className="nav-item p-2">
                <a
                  className="d-flex py-2 mx-2 border border-primary bg-white rounded-pill active"
                  data-bs-toggle="pill"
                  href="#tab-all"
                  onClick={() => filterCategory("ALL")}
                  style={{ cursor: "pointer" }}
                >
                  <span className="text-dark" style={{ width: 150 }}>
                    All Items
                  </span>
                </a>
              </li>
              <li className="nav-item p-2">
                <a
                  className="d-flex py-2 mx-2 border border-primary bg-white rounded-pill"
                  data-bs-toggle="pill"
                  href="#tab-6"
                  onClick={() => filterCategory("STARTER")}
                  style={{ cursor: "pointer" }}
                >
                  <span className="text-dark" style={{ width: 150 }}>
                    Starter
                  </span>
                </a>
              </li>
              <li className="nav-item p-2">
                <a
                  className="d-flex py-2 mx-2 border border-primary bg-white rounded-pill"
                  data-bs-toggle="pill"
                  href="#tab-7"
                  onClick={() => filterCategory("MAIN")}
                  style={{ cursor: "pointer" }}
                >
                  <span className="text-dark" style={{ width: 150 }}>
                    Main Course
                  </span>
                </a>
              </li>
              <li className="nav-item p-2">
                <a
                  className="d-flex py-2 mx-2 border border-primary bg-white rounded-pill"
                  data-bs-toggle="pill"
                  href="#tab-8"
                  onClick={() => filterCategory("DRINKS")}
                  style={{ cursor: "pointer" }}
                >
                  <span className="text-dark" style={{ width: 150 }}>
                    Drinks
                  </span>
                </a>
              </li>
              <li className="nav-item p-2">
                <a
                  className="d-flex py-2 mx-2 border border-primary bg-white rounded-pill"
                  data-bs-toggle="pill"
                  href="#tab-10"
                  onClick={() => filterCategory("DESSERT")}
                  style={{ cursor: "pointer" }}
                >
                  <span className="text-dark" style={{ width: 150 }}>
                    DESSERT
                  </span>
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div id="tab-6" className="tab-pane fade show p-0 active">
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
      {/* Menu End */}

    </div>
  );
}

export default Menu;
