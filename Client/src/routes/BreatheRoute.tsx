// styles
import "./css/breatheRoute.scss";

// assets
import warning_amber from "../assets/warningAmber.svg";
import breathe_gif from "../assets/breathe.gif";

// libraries
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// components
import { SearchInfoContext } from "../contexts/SearchInfoContext";
import CountDown from "../components/CountDown";

export const BreatheRoute = () => {
  // navigation hook used to navigae to other routes.
  const navigate = useNavigate();

  // searchInfo global state becomes available by the use of SearchInfoContext.
  const { searchInfo, setSearchInfo } = useContext(SearchInfoContext);

  /**
   * on first render of this component the following logic will execute.
   * if the datapoint point property of searchInfo is null, app will navigate to mapRoute.
   */
  useEffect(() => {
    if (searchInfo.datapoint == null) {
      //alert("no location selected");
      //makeApiRequest();
      //navigate("/intro");
    }
  }, []);

  /**
   * makes post request to the server API and sends query to stop the physical installation.
   * alerts for error otherwise.
   */
  const makeApiRequest = async () => {
    try {
      const res = await axios.post(`http://localhost:3001/command?command=s`);
      console.log(res);
      //alert(`request succesful: ` + res.status);
      // app navigates to mapRoute after request to halt the physical installation executes correctly.
      navigate("/mapRoute");
    } catch (error: any) {
      alert(error.message);
      console.error(error);
    }
  };

  return (
    <div className="breathe-route-container">
      <div className="breathe-route-container-header">
        <p className="breathe-route-title">Breathe with the sculpture</p>
        <CountDown seconds={60} />
      </div>
      <p className="breathe-route-subtitle">
        Inhale as it expands, exhale as it contracts...
      </p>
      <img className="breathe-gif" src={breathe_gif} />
      <div className="breathe-route-bottom">
        <img src={warning_amber} />
        <p>
          Caution: This activity is for educational purposes only. While
          enjoyable for most, <br />
          we urge those with underlying health issues, seniors, pregnant women,
          and <br /> children to participate with caution. Prioritize your
          safety and well-being by <br /> consulting a medical professional
          before engaging in this activity.
        </p>
      </div>
      <div className="breathe-route-buttun-div"> 
      <button
        className="breathe-route-nav-button"
        onClick={() => {
          makeApiRequest();
        }}
      >
        Go back to the map page
      </button>
      <button
        className="breathe-route-nav-button"
        onClick={() => {
          navigate("/take-action");
        }}
      >
        Learn how to take action
      </button>
      </div>

    </div>
  );
};
