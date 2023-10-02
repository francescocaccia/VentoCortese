import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../logoColleponi.png";
import { BiHomeHeart } from "react-icons/bi";
import { GiMushroomHouse, GiShoppingCart } from "react-icons/gi";
import { BsShop } from "react-icons/bs";
import { AiOutlinePhone } from "react-icons/ai";
import { connect } from "react-redux";

const Navbar = ({ cartItemCount }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

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
        <Link to="/" className={isActive("/") ? "navbar__link--active" : ""}>
          <BiHomeHeart /> Home
        </Link>
        <Link
          to="/room"
          className={isActive("/room") ? "navbar__link--active" : ""}
        >
          <GiMushroomHouse /> Appartamentini
        </Link>
        <Link
          to="/contacts"
          className={isActive("/contacts") ? "navbar__link--active" : ""}
        >
          <AiOutlinePhone /> contatti
        </Link>
        <Link
          to="/shop"
          className={isActive("/shop") ? "navbar__link--active" : ""}
        >
          <BsShop /> shop
        </Link>
        <Link
          to="/cart"
          className={isActive("/cart") ? "navbar__link--active" : ""}
        >
          <GiShoppingCart /> <span>{cartItemCount}</span>
        </Link>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItemCount: state.cart.length,
  };
};

export default connect(mapStateToProps)(Navbar);
