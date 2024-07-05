// css styles import
import "./css/introduction.scss";

// assets
import attaLogo from "../assets/attaLogo.png";

// libraries import
import React from "react";
import select from "../assets/selectIcon.png";
import breathe from "../assets/breatheIcon.png";
import { useNavigate } from "react-router-dom";

export function AboutPage() {
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
          <p>About ATTA</p>
        </div>
        <div className="introduction-container-section-02">
          <p>
          Activism Through Technology and Art (ATTA) Society is a community of creatives of from across 
          Canada, collaborating on projects that promote social and environmental transformation.
          </p>
          <br />
          <p>
            To learn more about ATTA, visit attasociety.org, or find us on
            social media @attasociety.
          </p>
        </div>
        <div className="introduction-container-section-03">
          <p>About the installation</p>
        </div>
        <div className="introduction-container-section-02">
          <p>
          According to the World Health Organization (WHO), approximately 7 million deaths occur 
          prematurely each year due to air pollution. 9 out of 10 people in the world breathe air that contains 
          high levels of pollutants and exceeds the WHO's air pollution limits
          </p>
          <br />
          <p>
          Low- and middle-income countries are experiencing the greatest consequences of these challenges, 
          with 90% of air pollution-related deaths occurring in these regions.
          </p>
          <br />
          <p>
          We created the installation to connect you with people living in different cities across the world, 
          highlight the challenges faced by these communities, and equip you with tools to make a difference
          </p>
        </div>
        <div className="introduction-container-section-05">
          <button onClick={() => navigate("/choosing-pathway")}>Next</button>
        </div>
      </div>
    </div>
  );
}
