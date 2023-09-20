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

      <div className="introduction-container-box">
        <div className="introduction-container-section-01">
          <p>About</p>
        </div>
        <div className="introduction-container-section-02">
          <p>
            Air plays a vital role in our health from birth,
            and this structure visually adapts to real-time, location-specific data,
            representing the diverse impact of air quality on us all.
            <p></p>
            <br />Ready to embark on a thought-provoking journey?
          </p>
        </div>
        <div className="introduction-container-section-03">
          <p>How it Works</p>
        </div>
        <div className="introduction-container-section-04">
          <div className="introduction-container-section-04-left">
            <img src={select} />
            <div className="introduction-container-section-04-left-text-container">
              <p className="introduction-container-section-04-left-text-container-title">
                01 <i><b>Select</b></i> a City</p>
              <p>Inhale as it expands, exhale as it contracts, connecting you to their breathing experience.</p>
            </div>
          </div>
          <div className="introduction-container-section-04-right">
            <img src={breathe} />
            <div className="introduction-container-section-04-right-text-container">
              <p className="introduction-container-section-04-right-text-container-title">
                02 <i><b>Breathe</b></i> with the structure
              </p>
              <p>Our structure will simulate the breathing experience of someone from that region.</p>
            </div>
          </div>
        </div>
        <div className="introduction-container-section-05">
          <button onClick={() => navigate("/mapRoute")}>Begin my journey</button>
        </div>
      </div >

    </div >
  );
}
