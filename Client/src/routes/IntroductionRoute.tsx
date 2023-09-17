// css styles import
import "./css/introduction.scss";

// assets
import attaLogo from "../assets/attaLogo.png";

// libraries import
import React from "react";
import select from "../assets/selectIcon.png";
import breathe from "../assets/breatheIcon.png";
import { useNavigate } from "react-router-dom";

export function Introduction() {

  // navigation hook used to navigate to other routes
  const navigate = useNavigate();

  return (
    <div className="introduction-container">

      <div className="introduction-container-header">
        <img src={attaLogo} />
        <p>When Air Takes Shape</p>
      </div>

      <div className="introduction-container-body" >
        <div className="introduction-container-box">
          <div className="introduction-container-section-01">
            <p>About</p>
          </div>
          <div className="introduction-container-section-02">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim</p>
          </div>
          <div className="introduction-container-section-03">
            <p>How it Works</p>
          </div>
          <div className="introduction-container-section-04">
            <div className="introduction-container-section-04-left">
              <img src={select} />
              <p>01 Select a City</p>
            </div>
            <div className="introduction-container-section-04-right">
              <img src={breathe} />
              <p>02 Breathe with the structure</p>
            </div>
          </div>
          <div className="introduction-container-section-05">
            <button onClick={() => navigate("/mapRoute")}>Begin my journey</button>
          </div>
        </div >
      </div>

    </div >
  );
}
