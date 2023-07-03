import React from "react";
import { Link } from "react-router-dom";

const SideNav = () => {
  return (
    <div className="SideNav">
      <div className="menu">
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
