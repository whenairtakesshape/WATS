// css styles import
import "./css/landingPageRoute.scss";

// libraries import
import unsplash from "../assets/unsplash.png";
import React from "react";

// components
import { SwipeCard } from "../components/SwipeCard";


export function LandingPage() {
  return (
    <div className="landing-route-container">
      <img src={unsplash} />
      <SwipeCard />
    </div>
  );
}
