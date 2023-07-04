import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SideNav from "../Header/SideNav";

const Layout = () => {
  return (
    <>
      <Header />
          <SideNav />
          <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
