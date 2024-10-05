// styles
import "./css/aqiScaleRoute.scss";

// assets

// libraries
import axios from "axios";

// components
import { AQIScale } from "../components/aqiScaleComponents/AQIScale";

export const AQIScaleRoute = () => {

  const postAQI = async (aqi : number) => {
    try {
      const res = await axios.post(`http://localhost:3001/aqi?value=${aqi}`);
      console.log(res);
      
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    }
  };

  const postStopRequest = async() =>  {
    try {
      const res = await axios.post(`http://localhost:3001/command?command=s`);
      console.log(res);

    } catch (error: any) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="aqiscale-outer-container">  
      <div className="aqiscale-box">

        <div className="aqiscale-box-section-01">
          <p>Explore the AQI Scale</p>
        </div>

        <div className="aqiscale-box-section-02">
          <p>
            The Air Quality Index (AQI) condenses information about complex pollutant concentration data
            into a unitless number often accompanied by a color and a categorical label.
            AQIs are an effective communication tool that enable the wider public to understand air
            quality data and associated health risks.

            air quality standards, data collection capabilities and health guidelines.
          </p>

          <p>
          It is important to be mindful that the AQI is a regionalised scale developed by local regulatory bodies. Each country and body can have widely varying AQI calculation methods reflecting

          </p>

          <p>
            ( A line about the AQI data we are using for the installation)
          </p>

          <p className="action-item">
            Select an AQI range from the scale below to interact with the installation.
          </p>

        </div>

       
          <AQIScale />
  

        <div className="aqiscale-references">
          <p className="ref-title" >References </p>
          <p>"Introduction" OpenAQ - AQI Hub, https://aqihub.info/.</p>
          <p>Ravindra, Khaiwal et al. "Why we should have a universal air quality index?" Environment International, Vol. 187, May 2024, https://doi.org/10.1016/j.envint.2024.108698.</p>
        </div>

      </div>

    </div>

  );
};
