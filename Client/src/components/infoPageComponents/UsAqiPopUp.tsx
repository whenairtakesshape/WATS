import "./css/usAqiPopUp.scss";
import { useState } from 'react';

interface UsAqiPopUpProps {
  active: boolean;
  onClose: () => void;
}

export const UsAqiPopUp = (props: UsAqiPopUpProps) => {
  if (props.active) {
    return (
      <div className="us-aqi-pop-up-container">
        <div className="us-aqi-pop-up-x">
          <button onClick={props.onClose}>x</button>
        </div>
        <h2 className="us-aqi-pop-up-header">US AQI</h2>
        <h3 className="us-aqi-pop-up-subtitle">What is US AQI?</h3>
        <p>
        The US AQI, or United States Air Quality Index, is a 0 to 500 
        scale conveying air quality, with lower values denoting better, 
        and higher values denoting worse air quality. 
        </p>
        <h3 className="us-aqi-pop-up-subtitle">How does it work?</h3>
        <p>
        The US AQI is calculated based on the concentrations of various 
        air pollutants, including particulate matter (PM2.5 and PM10), 
        ground-level ozone (O3), sulfur dioxide (SO2), nitrogen dioxide (NO2),
         and carbon monoxide (CO). 
        </p>
        <h3 className="us-aqi-pop-up-subtitle">How does it assess health risks?</h3>
        <p>
        The US AQI plays a vital role in informing people about potential health 
        risks linked to different air pollution levels. It achieves this by 
        categorizing air quality into levels like "Good," "Moderate," "Unhealthy 
        for Sensitive Groups," "Unhealthy," "Very Unhealthy," and "Hazardous," 
        helping individuals understand local air quality's health implications.
        </p>

      </div>
    );
  }
  else return <div></div>;
};