// css styles import
import "./css/choosingPathwayRoute.scss";

// assets
import attaLogo from "../assets/attaLogo.png";
import mapIcon from "../assets/mapIcon.svg";
import compareCitiesIcon from "../assets/compareCitiesIcon.svg";

// libraries import
import React from "react";
import select from "../assets/selectIcon.png";
import breathe from "../assets/breatheIcon.png";
import { useNavigate } from "react-router-dom";

export function ChoosingPathwayRoute() {
  // navigation hook used to navigate to other routes
  const navigate = useNavigate();

  return (
    <div className="choosing-pathway-container">
      <div className="choosing-pathway-container-header">
        <img src={attaLogo} />
        <p>When Air Takes Shape</p>
      </div>

      <div className="choosing-pathway-container-box">
        <div className="choosing-pathway-container-section-01">
          <p>Let's start by...</p>
        </div>
        <div className="choosing-pathway-tiles">
            <div className="choosing-pathway-tile" onClick={() => navigate('/mapRoute')}>
                <img src={mapIcon} alt="map" />
                <p>Choosing any city from the map</p>
            </div>
            <div className="choosing-pathway-tile" onClick={() => navigate('/compare-cities')}>
                <img src={compareCitiesIcon} alt="compare cities" />
                <p>Choosing a suggested city to compare with Vancouver</p>
            </div>
        </div>
      </div>
    </div>
  );
}
