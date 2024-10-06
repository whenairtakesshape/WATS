// styles
import "./css/aqiScaleRoute.scss";

// components
import { AQIScale } from "../components/aqiScaleComponents/AQIScale";

export const AQIScaleRoute = () => {

  return (
    <div className="aqiscale-outer-container">  
      <div className="aqiscale-box">

        <div className="aqiscale-box-section-01">
          <p>Explore the AQI Scale</p>
        </div>

        <div className="aqiscale-box-section-02">
        <p> The Air Quality Index (AQI) simplifies complex pollution data into easy-to-understand numbers, colors, and categories, helping the public grasp air quality and the health risks associated with it. </p>
        <p> AQI scales are region-specific & developed by local regulatory bodies, which may vary significantly in their calculation methods and thresholds.</p>
        <p> This scale follows the US AQI system, which divides air quality into 6 categories ranging from good to hazardous. Each category reflects a different level of health impact. </p>
        <p> Our installation visually interprets these health effects by changing its movement based on the selected air quality. As the AQI worsens, the motion becomes more constrained and labored, illustrating the impact on our health. </p>
        <p className="action-item"> Choose an AQI range below to experience the installation's response. </p>
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
