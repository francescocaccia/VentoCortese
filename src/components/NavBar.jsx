import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../logoColleponi.png";
import { BiHomeHeart } from "react-icons/bi";
import { GiMushroomHouse, GiShoppingCart } from "react-icons/gi";
import { BsShop } from "react-icons/bs";
import { AiOutlinePhone } from "react-icons/ai";
import { connect } from "react-redux";
import { FaUserTie } from "react-icons/fa";

const Navbar = ({ cartItemCount, currentUser }) => {
  const location = useLocation();

  // Funzione per troncare basato sul numero di caratteri
  // function truncateToNChars(str, n = 3) {
  //   if (str && str.length <= n) return str;
  //   return str ? str.substring(0, n) + "..." : "";
  // }

  // const renderedName = truncateToNChars(currentUser);
  // console.log("Originale:", currentUser, "Troncato:", renderedName);

  const isActive = (path) => location.pathname === path;

  // ...

  return (
    <nav className="navbar sticky-top ">
      <div className="navbar__logo">
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            width={110}
            height={110}
            className="img-with-shadow"
          />
        </Link>
      </div>
      <div className="navbar__links fw-semibold">
        <Link
          to="/"
          className={`d-flex flex-column align-items-center ${
            isActive("/") ? "navbar__link--active" : ""
          }`}
        >
          <BiHomeHeart /> <span>home</span>
        </Link>
        <Link
          to="/room"
          className={`d-flex flex-column align-items-center ${
            isActive("/room") ? "navbar__link--active" : ""
          }`}
        >
          <GiMushroomHouse /> <span>alloggi</span>
        </Link>
        <Link
          to="/contacts"
          className={`d-flex flex-column align-items-center ${
            isActive("/contacts") ? "navbar__link--active" : ""
          }`}
        >
          <AiOutlinePhone />
          <span>contatti</span>
        </Link>
        <Link
          to="/shop"
          className={`d-flex flex-column align-items-center ${
            isActive("/shop") ? "navbar__link--active" : ""
          }`}
        >
          <BsShop /> <span>shop</span>
        </Link>
        <Link
          to="/cart"
          className={`d-flex flex-column align-items-center ${
            isActive("/cart") ? "navbar__link--active" : ""
          }`}
        >
          <GiShoppingCart /> <span>{cartItemCount}</span>
        </Link>

        <Link
          to="/userProfile"
          className={`d-flex flex-column align-items-center ${
            isActive("/userProfile") ? "navbar__link--active" : ""
          }`}
        >
          <FaUserTie />
          <span>{currentUser ? currentUser : "login"}</span>
        </Link>
      </div>
    </nav>
  );

  // ...
};

const mapStateToProps = (state) => {
  return {
    cartItemCount: state.cart.length,
    currentUser: state.currentUser, // Aggiungi questa linea
  };
};

export default connect(mapStateToProps)(Navbar);
