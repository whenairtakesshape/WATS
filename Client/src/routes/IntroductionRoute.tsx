// css styles import
import "./css/introduction.scss";

// assets
import attaLogo from "../assets/attaLogo.png";

// libraries import
import React from "react";
import select from "../assets/selectIcon.png";
import breathe from "../assets/breatheIcon.png";
import learn from "../assets/learn.png";
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
          <p>How it works</p>
        </div>
        <div className="introduction-container-section-02">
          <p>
            Across the world, the quality of the air we breathe can differ
            vastly causing lasting impacts on lives.
          </p>
          <br />
          <p>
            Experience how it feels to breathe in different cities, as the
            structure uses real-time data to show you the impact of air quality
            on our health.
          </p>
        </div>
        <div className="introduction-container-section-03">
          <p>Get Started:</p>
        </div>
        <div className="introduction-container-section-04">
          <div className="introduction-container-section-04-grid">
            <div className="introduction-container-section-04-grid-item">
              <div className="introduction-container-section-04-grid-item-img">
                <img src={select} />
              </div>
              <div className="introduction-container-section-04-grid-item-text">
                <p className="introduction-container-section-04-grid-item-text-title">
                  1.{" "}
                  <i>
                    <b>Choose</b>
                  </i>{" "}
                  a city
                </p>
                <p>Find a city from the map or use the search bar.</p>
              </div>
            </div>
            <div className="introduction-container-section-04-grid-item">
              <div className="introduction-container-section-04-grid-item-img">
                <img src={learn} />
              </div>
              <div className="introduction-container-section-04-grid-item-text">
                <p className="introduction-container-section-04-grid-item-text-title">
                  2.{" "}
                  <i>
                    <b>Learn</b>
                  </i>{" "}
                  about air quality
                </p>
                <p>
                  Get real-time air quality data and information about the city.
                </p>
              </div>
            </div>
            <div className="introduction-container-section-04-grid-item">
              <div className="introduction-container-section-04-grid-item-img">
                <img src={breathe} />
              </div>
              <div className="introduction-container-section-04-grid-item-text">
                <p className="introduction-container-section-04-grid-item-text-title">
                  3.{" "}
                  <i>
                    <b>Breathe</b>
                  </i>{" "}
                  with the structure
                </p>
                <p>Inhale as the structure expands, exhale as it contracts.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="introduction-container-section-05">
          <button onClick={() => navigate("/mapRoute")}>Choose a city</button>
        </div>
      </div>
    </div>
  );
}
