// css styles 
import "./css/infoPageRoute.scss";

// assets
import logo from "../assets/attaLogo.webp";
import smile from "../assets/emojiAssets/smile.png";
import neutral from "../assets/emojiAssets/neutral.png";
import sadFace from "../assets/emojiAssets/sadFace.png";
import infoIcon from "../assets/infoIcon.svg";
import disappointed from "../assets/emojiAssets/disappointed.png";
import deadSkin from "../assets/emojiAssets/deadSkin.png";
import warning from "../assets/warning.svg";

// libraries import 
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

// components 
import { SearchInfoContext } from "../contexts/SearchInfoContext";
import { Scale } from "../components/infoPageComponents/Scale";
import { PollutantAndContributingFactorSection } from "../components/infoPageComponents/PollutantAndContributingFactorSection";
import { DidYouKnowSection } from "../components/infoPageComponents/DidYouKnowSection";
import { BreathSection } from "../components/BreathSection";
import { ImpactOnHealthAndHealthRecommendationSection } from "../components/infoPageComponents/ImpactOnHealthAndHealthRecommendationSection";
import { DominantPollutantContext } from "../contexts/DominantPollutantContext";
import { Debugger } from "../components/Debugger";

export function InfoPage() {
  // constants
  const goodRange = 51;
  const moderateRange = 101;
  const unhealthyForSensitiveGroupsRange = 151;
  const unhealthyRange = 201;
  const veryUnhealtyRange = 301;

  // navigation hook used to navigate to other routes
  const navigate = useNavigate();

  // searchInfo global state that becomes available via the SearchInfoContext
  const { searchInfo, setSearchInfo } = useContext(SearchInfoContext);

  // dominant pollutant. 
  // used for render logic in PollutantAndContributingFactorSection.tsx, 
  // ContributingFactorSection.tsx, ImpactOnHealthSection.tsx
  const [dominantPollutant, setDominantPollutant] = useState<string | null>(null);

  // state used to determine if the modal that pops up over the infoPageRoute is active or not
  const [modalIsActive, setModal] = useState<boolean>(false);

  // following logic will executre upon first render of InfoPage component 
  useEffect(() => {
    /**
     * if datapoint property of searchInfo global state it means the user has not selected a location in the map.
     * app will navigate back to mapRoute if that is the case
     */
    if (searchInfo.datapoint == null) {
      navigate("/mapRoute");
      alert("no location selected");
    }
  }, []);

  /**
   * @returns smile, nuetral, or sadFace emoji based on the range of datapoint.aqi
   */
  const renderEmoji = (): (JSX.Element | undefined) => {
    if (searchInfo.datapoint) {
      // good range: [0,50]
      if (searchInfo.datapoint.aqi < goodRange) {
        return <img src={smile} />;
        // moderate range: [51, 100]
      } else if (searchInfo.datapoint.aqi < moderateRange) {
        return <img src={neutral} />;
        // unhealthy for sensitive groups range: [101, 150]
      } else if (searchInfo.datapoint.aqi < unhealthyForSensitiveGroupsRange) {
        return <img src={sadFace} />;
        // unhealthy range: [151, 200]
      } else if (searchInfo.datapoint.aqi < unhealthyRange) {
        return <img src={sadFace} />;
        // very unhealthy range: [201, 300]
      } else if (searchInfo.datapoint.aqi < veryUnhealtyRange) {
        return <img src={disappointed} />;
      } else {
        // hazardous range: [301-500]
        return <img src={deadSkin} />;
      }
    }
  };

  /**
   * makes request to the server API and sends value of the air quality index (aqi) of the 
   * chosen location by the user. 
   * then navigates to breatheRoute if request is succesfull.
   * alerts error message otherwise.
   */
  const makeApiRequest = async () => {
    try {
      const res = await axios.post(`http://localhost:3001/aqi?value=${searchInfo.datapoint?.aqi}`);
      console.log(res);
      //alert(`request succesful: ` + res.status);
      navigate("/breathe-page");
    }
    catch (error: any) {
      alert(error.message);
      console.error(error);
    }
  };

  /**
   * the elements of InfoPage component should only render if a location has been chosen by user.
   * data related to this location lives in the searchInfo global state, in the datapoint property.
   */
  if (searchInfo.datapoint) {
    return (
      <DominantPollutantContext.Provider value={{ dominantPollutant, setDominantPollutant }} >
        <div className="info-page-outer-container">
          {/** InfoPage header */}
          <div className="info-page-header">
            <div className="info-page-logo">
              <img src={logo} />
            </div>
            <p>When Air Takes Shape</p>
          </div>
          {/** InfoPage blocks begin.
         * if modalIsActive is set to true, the opacity of all elements inside info-page-blocks div
         * will be set to 0.5 in order to allow the popup modal to stand out over these elements. 
         */}
          <div className="info-page-blocks" style={{ opacity: modalIsActive ? 0.5 : 1 }}>
            <div className="info-page-block-01">{searchInfo.datapoint?.cityCountry}</div>
            <div className="info-page-block-02">
              <div className="info-page-block-02-section-01">{renderEmoji()}</div>
              <div className="into-page-block-02-section-02">
                <div className="info-page-block-02-section-02-us-aqi">
                  <p>US AQI</p>
                  <img src={infoIcon} />
                </div>
                <p className="aqi-number">{searchInfo.datapoint?.aqi}</p>
              </div>
              {/** Scale component is info-page-block-02-section-03 */}
              <Scale />
              <div className="info-page-block-02-section-04">
                <p className="first">Income Group</p>
                {searchInfo.datapoint.incomeGroup ?
                  <p className="second">{searchInfo.datapoint.incomeGroup}</p> :
                  <p className="second">N/A</p>
                }
              </div>
            </div>
            {/** PollutantSection component is info-page-block-03 */}
            <PollutantAndContributingFactorSection />
            {/** ImpactOnHealthAndHealthRecommendationSection component is info-page-block-04 */}
            <ImpactOnHealthAndHealthRecommendationSection />
            {/** DidYouKnow component is info-page-block-05 */}
            <DidYouKnowSection />
            {/** BreathSection component is info-page-block-06.
           * setModal state is passed as props to BreatheSection,
           * this component sets isModalActive state to active when prompt by user.
           */}
            <BreathSection modal={modalIsActive} setModal={setModal} />
            <Debugger />
          </div>
          {/** info-page-modal div only renders when modalIsActive is set to true, 
         * second part of ternary operator executes and renders null */}
          {modalIsActive ?
            <div className="info-page-modal">
              {/** opacity of modal is set to 1 so that it overlays the elements in info-page-blocks  div */}
              <div className="info-page-modal-top" style={{ opacity: 1 }}>
                <img src={warning} />
              </div>
              <div className="info-page-modal-middle">
                <p className="p-01">You have selected</p>
                <p className="p-02">{searchInfo.datapoint.cityCountry}</p>
                <p className="p-03">for the structure to simulate breathing</p>
                <p className="p-04">
                  Warning: By  continuing with your current selection, <br />
                  you will be unable to change it while the structure is <br />
                  in motion for approximately 1 minute
                </p>
              </div>
              <div className="info-page-modal-bottom">
                {/** button sets isModalActive to false */}
                <button className="modal-cancel-button" onClick={() => setModal(false)}>Cancel</button>
                <button className="modal-continue-button" onClick={() => {
                  makeApiRequest();
                }}>Continue</button>
              </div>
            </div> : null}
        </div>
      </DominantPollutantContext.Provider >
    );
  } else {
    /** if searchPoint.datapoint is null, a loading div is returned since 
     *  the user has not selected a location. 
     *  thus elements in InfoPage should not render, loading element renders while user
     *  is redirected to mapRoute.
     */
    return (
      <div>Loading...</div>
    );
  }
}
