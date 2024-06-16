// css styles import
import "./css/landingPageRoute.scss";

// libraries import
import unsplash from "../assets/unsplash.png";
import landingPageBackground from "../assets/landingPageBackground.png";
import React from "react";

// components
import { SwipeCard } from "../components/SwipeCard";

export function LandingPage() {
  return (
    <div className="landing-route-container">
      {/* <img src={landingPageBackground} /> */}
      <SwipeCard />
    </div>
  );
}
