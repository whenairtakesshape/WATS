//styles and assets
import "./css/scale.scss";
import unhealthy_for_sensitive from "../../assets/scaleAssets/unhealthyForSensitive.svg";
import good from "../../assets/scaleAssets/good.svg";
import unhealthy from "../../assets/scaleAssets/unhealthy.svg";
import hazardous from "../../assets/scaleAssets/hazardous.svg";
import very_unhealthy from "../../assets/scaleAssets/veryUnhealthy.svg";
import moderate from "../../assets/scaleAssets/moderate.svg";

//library imports
import { useContext, useMemo, useState, useEffect } from "react";
import { SearchInfoContext } from "../../contexts/SearchInfoContext";
import { Popup } from "react-map-gl";
import { ScalePopUp } from "./ScalePopUp";


export function Scale() {
  /** constants */
  const goodRange = 51;
  const moderateRange = 101;
  const unhealthyForSensitiveGroupsRange = 151;
  const unhealthyRange = 201;
  const veryUnhealtyRange = 301;

  /** STATES */
  const { searchInfo, setSearchInfo } = useContext(SearchInfoContext);
  const [status, setStatus] = useState("");
  const [color, setColor] = useState("");

  /** LOGIC */
  /**
   * @returns different color scale according to the range of datapoint aqi chosen by user.
   * if datapoint is null, returns undefined
   */
  const renderScale = (): (JSX.Element | undefined) => {
    if (searchInfo.datapoint) {
      if (searchInfo.datapoint.aqi < goodRange) {
        return <img src={good} />;
      } else if (searchInfo.datapoint.aqi < moderateRange) {
        return <img src={moderate} />;
      } else if (searchInfo.datapoint.aqi < unhealthyForSensitiveGroupsRange) {
        return <img src={unhealthy_for_sensitive} />;
      } else if (searchInfo.datapoint.aqi < unhealthyRange) {
        return <img src={unhealthy} />;
      } else if (searchInfo.datapoint.aqi < veryUnhealtyRange) {
        return <img src={very_unhealthy} />;
      } else {
        return <img src={hazardous} />;
      }
    };
  };

  /**
   * sets status and color to appropiate status and color based on chosen location
   */
  const chooseStatusColor = () => {
    if (searchInfo.datapoint) {
      if (searchInfo.datapoint.aqi < goodRange) {
        setStatus("Good");
        setColor("#A8E05F");
      } else if (searchInfo.datapoint.aqi < moderateRange) {
        setStatus("Moderate");
        setColor("#FDD64B");
      } else if (searchInfo.datapoint.aqi < unhealthyForSensitiveGroupsRange) {
        setStatus("Unhealthy For Sensitive Groups");
        setColor("#FE9B57");
      } else if (searchInfo.datapoint.aqi < unhealthyRange) {
        setColor("#F55E5F");
        setStatus("Unhealthy");
      } else if (searchInfo.datapoint.aqi < veryUnhealtyRange) {
        setColor("#A070B6");
        setStatus("Very Unhealthy");
      } else {
        setStatus("Hazardous");
        setColor("#A06A7B");
      }
    };
  };

  /**
   * calls choseStatusColor on first render of Scale component 
   */
  useEffect(() => {
    chooseStatusColor();
  }, []);

  return (
    <div className="scale-outer-container">
      <ScalePopUp status={status} color={color} />
      {renderScale()}
      <div className="scale-numbers">
        <p>0</p>
        <p>500</p>
      </div>
    </div>
  );
}



