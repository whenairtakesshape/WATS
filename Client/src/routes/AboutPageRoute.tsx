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
            Activism Through Technology and Art (ATTA) is a community of
            creatives from across Canada; collaborating on projects to promote
            social and environmental transformation.
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
            Each year, 7 million people die prematurely due to air pollution.
          </p>
          <br />
          <p>
            When Air Takes Shape was created by ATTA, with the help of Dr.
            Zimmerman, to educate the public about the life-changing impact of
            air pollution for life on our planet.
          </p>
          <br />
          <p>
            This installation was created to connect you with people living in
            different cities across the world, highlighting the challenges faced
            by these communities, and giving you the tools to make a difference.
          </p>
        </div>
        <div className="introduction-container-section-05">
          <button onClick={() => navigate("/intro")}>Next</button>
        </div>
      </div>
    </div>
  );
}
