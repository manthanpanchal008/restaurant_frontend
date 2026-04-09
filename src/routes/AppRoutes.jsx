import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Home from "../features/Website/Pages/Home";
import About from "../features/Website/Pages/About";
import Service from "../features/Website/Pages/Service";
import NotFound from "../features/Website/Pages/NotFound";
import Blogs from "../features/Website/Pages/Blogs";
import Booking from "../features/Website/Pages/Booking";
import Contact from "../features/Website/Pages/Contact";
import Events from "../features/Website/Pages/Events";
import Menu from "../features/Website/Pages/Menu";
import Team from "../features/Website/Pages/Team";
import Testi from "../features/Website/Pages/Testi";
import Dashboard from "../features/Admin/dashboard/Dashboard";
import ServiceMange from "../features/Admin/service/ServiceMange";
import EventManage from "../features/Admin/event/EventManage";
import MenuManage from "../features/Admin/menu/MenuManage";
import Register from "../features/Website/Pages/Register";
import Login from "../features/Website/Pages/Login";
import EventAdd from "../features/Admin/event/EventAdd";
import Menuadd from "../features/Admin/menu/Menuadd";
import ServicesAdd from "../features/Admin/service/ServicesAdd";
import BlogAdd from "../features/Admin/blog/BlogAdd";
import BlogManage from "../features/Admin/blog/BlogManage";
import TeamAdd from "../features/Admin/team/TeamAdd";
import TeamManage from "../features/Admin/team/TeamManage";
import PrivateRoute from "./PrivateRoute";
import Cart from "../features/Website/Pages/Cart";
import AdminDashboard from "../features/Admin/admin/AdminDashboard";
import AdminRoute from "./AdminRoutes";
import Profile from "../features/Website/Pages/Profile";
import UserRoutes from "./UserRoutes";
import MyOrders from "../features/Website/Pages/MyOrders";
import OrderSuccess from "../features/Website/Pages/OrderSuccess";
import BlogDetail from "../features/Website/Pages/BlogDetail";
import WebsiteLayout from "./WebsiteLayout";
import OrderManage from "../features/Admin/ordermanage/OrderManage";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        {/* website Routes */}
        <Route element={<WebsiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/event" element={<Events />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/book" element={<Booking />} />
          <Route path="/team" element={<Team />} />
          <Route path="/test" element={<Testi />} />

          {/* user protected routes */}
          <Route element={<UserRoutes />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/myorders" element={<MyOrders />} />
            <Route path="/order-success" element={<OrderSuccess />} />
          </Route>
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="dash" element={<Dashboard />} />
          <Route path="servicemange" element={<ServiceMange />} />
          <Route path="eventsmange" element={<EventManage />} />
          <Route path="eventadd" element={<EventAdd />} />
          <Route path="menumanage" element={<MenuManage />} />
          <Route path="menuadd" element={<Menuadd />} />
          <Route path="serviceadd" element={<ServicesAdd />} />
          <Route path="blogadd" element={<BlogAdd />} />
          <Route path="blogmanage" element={<BlogManage />} />
          <Route path="teamadd" element={<TeamAdd />} />
          <Route path="teammanage" element={<TeamManage />} />
          <Route path="ordermanage" element={<OrderManage />} />
        </Route>

        {/* super admin */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        {/* not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
