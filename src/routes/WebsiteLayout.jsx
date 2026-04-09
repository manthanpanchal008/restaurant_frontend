import { Outlet, useLocation } from "react-router-dom";
import Heros from "../features/Website/Coman/Heros";
import Home from '../features/Website/Pages/Home'
import About from "../features/Website/Pages/About";
import Profile from "../features/Website/Pages/Profile";
import MyOrders from "../features/Website/Pages/MyOrders";
import Header from "../features/Website/Coman/Header";
import Footer from "../features/Website/Coman/Footer";
import Service from "../features/Website/Pages/Service";
import Menu from "../features/Website/Pages/Menu";
import Contact from "../features/Website/Pages/Contact";
import Cart from "../features/Website/Pages/Cart";


const WebsiteLayout = () => {
    
const routes = [
        { path: "/", element: <Home />, title: "Home", showHero: false },
        { path: "/about", element: <About />, title: "About us", showHero: true },
        {path:'/service', element:<Service /> ,title: "About us", showHero: true },
        {path:'/event', element:<Event /> ,title: "Events", showHero: true },
        {path:'/menu', element:<Menu /> ,title: "Menu", showHero: true },
        {path:'/contact', element:<Contact /> ,title: "Contact us", showHero: true },
        { path: "/profile", element: <Profile />, title: "My Profile", showHero: true },
        { path: "/myorders", element: <MyOrders />, title: "My Orders", showHero: true },
        { path: "/cart", element: <Cart />, title: "Cart", showHero: true },
     ];
  const location = useLocation();
  const currentRoute = routes.find(r => r.path === location.pathname);

  return (
    <>
      <Header />

      {currentRoute?.showHero && (
        <Heros title={currentRoute.title} name={currentRoute.title} />
      )}

      <Outlet />

      <Footer />
    </>
  );
};

export default WebsiteLayout