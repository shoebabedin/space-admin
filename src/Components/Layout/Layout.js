import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SideNav from "../Header/SideNav";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="row">
        <div className="col-2">
          <SideNav />
        </div>
        <div className="col-10">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
