import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../logoColleponi.png";
import { BiHomeHeart } from "react-icons/bi";
import { GiMushroomHouse } from "react-icons/gi";
import { BsTelephoneFill } from "react-icons/bs";
const Navbar = () => {
  return (
    <nav className="navbar sticky-top ">
      <div className="navbar__logo">
        <NavLink to="/">
          <img src={logo} alt="logo" width={110} height={110} />
        </NavLink>
      </div>
      <div className="navbar__links">
        <NavLink to="/" exact activeClassName="navbar__link--active">
          <div className="d-flex align-items-center">
            <span className="fs-5">
              <BiHomeHeart /> Home
            </span>
          </div>
        </NavLink>
        <NavLink to="/Room" activeClassName="navbar__link--active">
          <div className="d-flex align-items-center">
            <span className="fs-5">
              <GiMushroomHouse /> le nostre camere
            </span>
          </div>
        </NavLink>
        <NavLink to="/contact" activeClassName="navbar__link--active">
          <div className="d-flex align-items-center">
            <span className="fs-5">
              <BsTelephoneFill />
              contatti
            </span>
          </div>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
