//styles and assets
import "../css/compareCitiesAqiScale.scss";
import unhealthy_for_sensitive from "../../assets/scaleAssets/unhealthyForSensitive.svg";
import good from "../../assets/scaleAssets/good.svg";
import unhealthy from "../../assets/scaleAssets/unhealthy.svg";
import hazardous from "../../assets/scaleAssets/hazardous.svg";
import very_unhealthy from "../../assets/scaleAssets/veryUnhealthy.svg";
import moderate from "../../assets/scaleAssets/moderate.svg";

//library imports
import { useState, useEffect } from "react";
import RenderEmoji from "../RenderEmoji";

interface CompareCitiesAqiScaleProps {
    aqi: number;
}


const CompareCitiesAqiScale = (props: CompareCitiesAqiScaleProps) => {
  /** constants */
  const goodRange = 51;
  const moderateRange = 101;
  const unhealthyForSensitiveGroupsRange = 151;
  const unhealthyRange = 201;
  const veryUnhealtyRange = 301;

  /** STATES */
  const [status, setStatus] = useState("");
  const [color, setColor] = useState("");

  /** LOGIC */
  /**
   * @returns different color scale according to the range of datapoint aqi chosen by user.
   * if datapoint is null, returns undefined
   */
  const renderScale = (): (JSX.Element | undefined) => {
    if (props.aqi < goodRange) {
        return <img src={good} />;
    } else if (props.aqi < moderateRange) {
        return <img src={moderate} />;
    } else if (props.aqi < unhealthyForSensitiveGroupsRange) {
        return <img src={unhealthy_for_sensitive} />;
    } else if (props.aqi < unhealthyRange) {
        return <img src={unhealthy} />;
    } else if (props.aqi < veryUnhealtyRange) {
        return <img src={very_unhealthy} />;
    } else {
        return <img src={hazardous} />;
    }
  };

  /**
   * sets status and color to appropiate status and color based on chosen location
   */
  const chooseStatusColor = () => {
    if (props.aqi < goodRange) {
        setStatus("Good");
        setColor("#A8E05F");
    } else if (props.aqi < moderateRange) {
        setStatus("Moderate");
        setColor("#FDD64B");
    } else if (props.aqi < unhealthyForSensitiveGroupsRange) {
        setStatus("Unhealthy For Sensitive Groups");
        setColor("#FE9B57");
    } else if (props.aqi < unhealthyRange) {
        setColor("#F55E5F");
        setStatus("Unhealthy");
    } else if (props.aqi < veryUnhealtyRange) {
        setColor("#A070B6");
        setStatus("Very Unhealthy");
    } else {
        setStatus("Hazardous");
        setColor("#A06A7B");
    }
  };

  /**
   * calls choseStatusColor on first render of Scale component 
   */
  useEffect(() => {
    chooseStatusColor();
  }, []);

  return (
    <div className="compare-cities-aqi-container">
        <div className="compare-cities-aqi-rating-container" style={{background: color}}>
            {RenderEmoji(props.aqi)}
            <div className="aqi-rating-container-content">
                <div className="aqi-rating">AQI - {props.aqi}</div>
                <div className="aqi-category">{status}</div>

            </div>

        </div>
        <div className="compare-cities-aqi-scale">
            {renderScale()}
        </div>
      <div className="compare-cities-scale-numbers">
        <p>0</p>
        <p>500</p>
      </div>
    </div>
  );
}



export default CompareCitiesAqiScale;