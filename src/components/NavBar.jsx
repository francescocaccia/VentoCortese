import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../logoColleponi.png";
import { BiHomeHeart } from "react-icons/bi";
import { GiMushroomHouse, GiShoppingCart } from "react-icons/gi";
import { BsShop } from "react-icons/bs";
import { AiOutlinePhone } from "react-icons/ai";
const Navbar = () => {
  return (
    <nav className="navbar sticky-top ">
      <div className="navbar__logo">
        <NavLink to="/">
          <img src={logo} alt="logo" width={110} height={110} />
        </NavLink>
      </div>
      <div className="navbar__links fw-semibold">
        <NavLink to="/" exact activeClassName="navbar__link--active">
          <div className="d-flex align-items-center">
            <span className="fs-5">
              <BiHomeHeart /> Home
            </span>
          </div>
        </NavLink>
        <NavLink to="/room" activeClassName="navbar__link--active">
          <div className="d-flex align-items-center">
            <span className="fs-5">
              <GiMushroomHouse /> le nostre camere
            </span>
          </div>
        </NavLink>
        <NavLink to="/contacts" activeClassName="navbar__link--active">
          <div className="d-flex align-items-center">
            <span className="fs-5">
              <AiOutlinePhone />
              contatti
            </span>
          </div>
        </NavLink>
        <NavLink to="/shop" exact activeClassName="navbar__link--active">
          <div className="d-flex align-items-center">
            <span className="fs-5">
              <BsShop /> shop
            </span>
          </div>
        </NavLink>
        <NavLink to="/shop" exact activeClassName="navbar__link--active">
          <div className="d-flex align-items-center">
            <span className="fs-5">
              <GiShoppingCart />
              <span></span> carrello
            </span>
          </div>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
