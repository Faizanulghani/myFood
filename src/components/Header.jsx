import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Model from "../Model";
import Carts from "./screens/Carts";

const Header = () => {
  let navigate = useNavigate();
  let [cartView,setCartView] = useState(false)
  let handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <a className="navbar-brand fs-1 fst-italic" href="#">
          MyFood
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item">
              <Link className="nav-link active fs-5" aria-current="page" to="/">
                Home
              </Link>
            </li>
            {localStorage.getItem("authToken") ? (
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/myOrder"
                >
                  My Orders
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>
          {localStorage.getItem("authToken") ? (
            <div>
              <button
                className="btn bg-white text-success mx-2"
                aria-current="page"
                onClick={()=>setCartView(true)}
              >
                My Cart
              </button>
              {cartView ? <Model onClose={()=>setCartView(false)}><Carts/></Model>:null}
              <div
                className="btn bg-white text-danger mx-2"
                aria-current="page"
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          ) : (
            <div className="d-flex">
              <Link className="btn bg-white text-success mx-1" to="/login">
                Login
              </Link>
              <Link className="btn bg-white text-success mx-1" to="/signup">
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
