// css styles import
import "./css/navbar.scss";

// assets
import atta_logo from "../assets/navBar/attaLogo.svg";
import home_icon from "../assets/navBar/homeIcon.svg";
import pin_icon from "../assets/navBar/pinIcon.svg";
import compare_icon from "../assets/navBar/compareIcon.svg";
import action_icon from "../assets/navBar/actionIcon.svg";
import people_icon from "../assets/navBar/peopleIcon.svg";
import info_icon from "../assets/navBar/infoIcon.svg";
import hamburger_icon from "../assets/navBar/hamburgerIcon.svg";

// libraries import
import react, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

export const NavBar = () => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: "768px" });
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderNavMenu = () => (
    <div className={`nav-menu ${isMenuOpen ? "show-menu" : ""}`}>
      <div className="nav-button-section">
        <button
          className="navbar-button"
          onClick={() => {
            setIsMenuOpen(false);
            navigate("/");
          }}
        >
          <img className="navbar-button-logo" src={home_icon} />
          {isMobile ? "Start here" : "Login"}
        </button>
        <hr className="navbar-hr navbar-vertical-home-hr" />
        <button
          className="navbar-button"
          onClick={() => {
            setIsMenuOpen(false);
            navigate("/mapRoute");
          }}
        >
          <img className="navbar-button-logo" src={pin_icon} />
          Map
        </button>
        {/* <button className="navbar-button">
                        <img src={compare_icon} />
                        Compare Cities
                    </button> */}
        {/* TODO: Add navigation to Take Actions page */}
        <button
          className="navbar-button"
          onClick={() => {
            setIsMenuOpen(false);
            navigate("/take-action");
          }}
        >
          <img className="navbar-button-logo" src={action_icon} />
          Take Action
        </button>
        <button
          className="navbar-button"
          onClick={() => {
            setIsMenuOpen(false);
            navigate("/about-page");
          }}
        >
          <img className="navbar-button-logo" src={people_icon} />
          About Us
        </button>
        <button
          className="navbar-button"
          onClick={() => {
            setIsMenuOpen(false);
            navigate("/intro");
          }}
        >
          <img className="navbar-button-logo" src={info_icon} />
          How To
        </button>
      </div>
      <hr className="navbar-hr" />
      <div className="nav-admin-login-section">
        <button className="navbar-button admin-login-button">
          Admin Login
        </button>
      </div>
    </div>
  );

  return (
    <div className="navbar-container">
      <div className="nav-atta-section">
        <button
          className="navbar-atta-button"
          onClick={() => {
            setIsMenuOpen(false);
            navigate("/mapRoute");
          }}
        >
          <img src={atta_logo} />
          <label className="nav-wata-title">When Air Takes Shape</label>
        </button>
      </div>
      <hr className="navbar-hr" />
      {isMobile ? (
        <div className="tablet-nav-menu-div">
          <button className="tablet-nav-hamburger-button" onClick={toggleMenu}>
            <img src={hamburger_icon} />
          </button>
          {renderNavMenu()}
        </div>
      ) : (
        renderNavMenu()
      )}
    </div>
  );
};
export default NavBar;
