// css styles import
import "./css/navbar.scss";

// assets
import atta_logo from "../assets/navBar/attaLogo.svg";
import home_icon from "../assets/navBar/homeIcon.svg";
import map_icon from "../assets/navBar/mapIcon.svg";
import compare_icon from "../assets/navBar/compareIcon.svg";
import action_icon from "../assets/navBar/actionIcon.svg";
import about_icon from "../assets/navBar/aboutIcon.svg";
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
          {isMobile ? "Start here" : "Home"}
        </button>
        <button
          className="navbar-button"
          onClick={() => {
            setIsMenuOpen(false);
            navigate("/mapRoute");
          }}
        >
          <img className="navbar-button-logo" src={map_icon} />
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
          <img className="navbar-button-logo" src={about_icon} />
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
      {/* <div className="nav-admin-login-section">
                    <button className="navbar-button admin-login-button">
                        Admin Login
                    </button>
                </div> */}
    </div>
  );

  return (
    <div className="navbar-container">
      <div className="nav-atta-section">
        <div className="navbar-atta-div">
          <img src={atta_logo} />
        </div>
      </div>
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
