// css styles import
import "./css/introductionMap.scss";

// assets
import attaLogo from "../assets/attaLogo.png";
import chooseCityIcon from "../assets/chooseCityIcon.svg";
import actNowIcon from "../assets/actNowIcon.svg";
import airQualityIcon from "../assets/airQualityIcon.svg";
import breatheStructureIcon from "../assets/breatheStructureIcon.svg";

// libraries import
import React from "react";
import { useNavigate } from "react-router-dom";

export function IntroductionMap() {
  // navigation hook used to navigate to other routes
  const navigate = useNavigate();

  return (
    <div className="introduction-container">
      <div className="introduction-container-header">
        <img src={attaLogo} alt='ATTA' />
        <p>When Air Takes Shape</p>
      </div>

      <div className="introduction-container-box">
        <div className="introduction-container-section-01">
          <p>How it works:</p>
        </div>
        <div className="introduction-container-section-04">
          <div className="introduction-container-section-04-grid">
            <div className="introduction-container-section-04-grid-item">
              <div className="introduction-container-section-04-grid-item-img">
                <img src={chooseCityIcon} alt="chooseCityIcon" />
              </div>
              <div className="introduction-container-section-04-grid-item-text">
                <p className="introduction-container-section-04-grid-item-text-title">
                  1. Choose a city
                </p>
                <p>Pick a suggested city from the map or find any city using the search bar.</p>
              </div>
            </div>
            <div className="introduction-container-section-04-grid-item">
              <div className="introduction-container-section-04-grid-item-img">
                <img src={airQualityIcon} alt="airQualityIcon" />
              </div>
              <div className="introduction-container-section-04-grid-item-text">
                <p className="introduction-container-section-04-grid-item-text-title">
                  2. Learn about air quality
                </p>
                <p>
                  Get real-time air quality data and information about the city.
                </p>
              </div>
            </div>
            <div className="introduction-container-section-04-grid-item">
              <div className="introduction-container-section-04-grid-item-img">
                <img src={breatheStructureIcon} alt="breatheStructureIcon" />
              </div>
              <div className="introduction-container-section-04-grid-item-text">
                <p className="introduction-container-section-04-grid-item-text-title">
                  3. Breathe with the structure
                </p>
                <p>Inhale as the structure expands, exhale as it contracts.</p>
              </div>
            </div>
            <div className="introduction-container-section-04-grid-item">
              <div className="introduction-container-section-04-grid-item-img">
                <img src={actNowIcon} alt="actNowIcon" />
              </div>
              <div className="introduction-container-section-04-grid-item-text">
                <p className="introduction-container-section-04-grid-item-text-title">
                  4.{" "}Act now{" "}
                </p>
                <p>Discover practices that fight against air pollution.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="introduction-container-section-06">
          <p>Want to explore more? You can switch between pages using the navigation bar later!</p>
        </div>
        <div className="introduction-container-section-05">
          <button onClick={() => navigate("/mapRoute")}>Get started</button>
        </div>
      </div>
    </div>
  );
}
