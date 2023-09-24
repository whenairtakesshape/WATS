import "./css/usAqiPopUp.scss";
import { useState } from 'react';

interface UsAqiPopUpProps {
  active: boolean;
}

export const UsAqiPopUp = (props: UsAqiPopUpProps) => {
  if (props.active) {
    return (
      <div className="us-aqi-pop-up-container">
        <h2>US AQI</h2>
        <h3>What is US AQI?</h3>
        <p>
          The US AQI, or United States Air Quality Index,
          is a 0 to 500 scale conveying air quality, with lower
          values denoting better, and higher values denoting worse air quality.
          It is calculated based on the concentrations of various air pollutants, i
          ncluding particulate matter (PM2.5 and PM10), ground-level ozone (O3),
          sulfur dioxide (SO2), nitrogen dioxide (NO2), and carbon monoxide (CO).
        </p>
      </div>
    );
  }
  else return <div></div>;
};