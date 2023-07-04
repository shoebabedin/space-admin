import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [loggedIn, setLoggedIn] = useState();
  const navigate = useNavigate();
  const [user, setUser] = useState();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("user"));
    setUser(items);
    if (items == null) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };


  return (
    <>
      <div className="header">
        <div className="logo">
          <Link to={"/"}>Logo</Link>
        </div>

        {loggedIn ? (
          <>
            <div className="menu">
              <ul>
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link to={"blog"}>Blog</Link>
                </li>
              </ul>
            </div>
            <div className="auth">
              <ul>
                <li>
                  <Button className="btn btn-secondary">{user.u_name}</Button>
                </li>
                <li>
                  <Button onClick={handleLogout}>Logout</Button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <div className="auth">
              <ul>
                <li>
                  <Link to={"/login"}>Login</Link>
                </li>
                <li>
                  <Link to={"/signup"}>Signup</Link>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Header;
