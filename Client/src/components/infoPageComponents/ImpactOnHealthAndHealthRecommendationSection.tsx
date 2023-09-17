// css imports
import "./css/impactOnHealthAndHealthRecommendation.scss";

// libraries
import { useState } from 'react';

// components
import { ImpactOnHealthSection } from "./ImpactOnHealthSection";
import { HealthRecommendationSection } from "./HealthRecommendationSection";


export const ImpactOnHealthAndHealthRecommendationSection = () => {

  // if true, ImpactOnHealth component renders, HealthRecommendation component renders otherwise
  const [impactOnHealthActive, setImpactOnHealthActive] = useState<boolean>(true);

  return (
    <div
      className="impact-on-health-and-health-recommendation-section-container">
      {/** top section.
       *   buttons set impactOnHealthActive state to true/false
       */}
      <div className="impact-on-health-and-health-recommendation-section-top">
        <button
          style={{ borderBottom: impactOnHealthActive ? "2px solid black" : "2px solid transparent" }}
          onClick={() => { setImpactOnHealthActive(true); }}>Impact on Your Health</button>
        <button
          style={{ borderBottom: impactOnHealthActive ? "2px solid transparent" : "2px solid black" }}
          onClick={() => { setImpactOnHealthActive(false); }}>Health Recommendations</button>
      </div>
      {/** second section.
       * if impactOnHealthActive is true, ImpactOnHealthSection renders.
       */}
      {impactOnHealthActive ? <ImpactOnHealthSection /> : <HealthRecommendationSection />}
    </div>
  );
};