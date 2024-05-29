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

// libraries import 
import react from 'react';
import { useNavigate } from "react-router-dom";

export const NavBar = () => {

    const navigate = useNavigate();

    return (
        <div className="navbar-container">
            <div className="navbar-top-section">
                <button className="navbar-button" onClick={() => navigate("/mapRoute")}>
                    <img src={atta_logo} />
                </button>
            </div>
            <hr />
            <div className="navbar-mid-section">
                <button className="navbar-button" onClick={() => navigate("/")}>
                    <img src={home_icon} />
                    Home
                </button>
                <button className="navbar-button" onClick={() => navigate("/mapRoute")}>
                    <img src={pin_icon} />
                    Map
                </button>
                <button className="navbar-button">
                    <img src={compare_icon} />
                    Compare Cities
                </button>
                <button className="navbar-button">
                    <img src={action_icon} />
                    Take Action
                </button>
                <button className="navbar-button" onClick={() => navigate("/about-page")}>
                    <img src={people_icon} />
                    About Us
                </button>
                <button className="navbar-button" onClick={() => navigate("/intro")}>
                    <img src={info_icon} />
                    How To
                </button>
            </div>
            <hr />
            <div className="navbar-bottom-section">
                <button className="navbar-button">
                    Admin Login
                </button>
            </div>
        </div>

    
      );

}
export default NavBar;