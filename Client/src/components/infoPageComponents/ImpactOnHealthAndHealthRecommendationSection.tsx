// css imports
import "./css/impactOnHealthAndHealthRecommendation.scss";

// libraries
import { useState } from 'react';

// components
import { ImpactOnHealthSection } from "./impactOnHealthComponents/ImpactOnHealthSection";
import { HealthRecommendationSection } from "./healthRecommendationComponents/HealthRecommendationSection";

interface ImpactOnHealthAndHealthProps {
  aqi?: number;
}


export const ImpactOnHealthAndHealthRecommendationSection = (props: ImpactOnHealthAndHealthProps) => {

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
          style={{
            borderBottom: impactOnHealthActive ? "2px solid black" : "2px solid transparent",
            fontWeight: impactOnHealthActive ? "bold" : "normal"
          }}
          onClick={() => { setImpactOnHealthActive(true); }}>Impact on Your Health</button>
        <button
          style={{
            borderBottom: impactOnHealthActive ? "2px solid transparent" : "2px solid black",
            fontWeight: impactOnHealthActive ? "normal" : "bold"
          }}
          onClick={() => { setImpactOnHealthActive(false); }}>Health Recommendations</button>
      </div>
      {/** second section.
       * if impactOnHealthActive is true, ImpactOnHealthSection renders.
       */}
      {impactOnHealthActive ? <ImpactOnHealthSection /> : <HealthRecommendationSection aqi={props.aqi} />}
    </div>
  );
};