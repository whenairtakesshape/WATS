// css styles 
import "./css/infoPageRoute.scss";

// assets
import logo from "../assets/attaLogo.webp";
import infoIcon from "../assets/infoIcon.svg";
import warning from "../assets/warning.svg";
import admin from "../assets/admin.svg";
import backArrow from "../assets/backArrow.svg";

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
import { WindowContext } from "../contexts/WindowSizeContext";
import { AdminWindow } from "../components/AdminWindow";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import { UsAqiPopUp } from "../components/infoPageComponents/UsAqiPopUp";
import RenderEmoji from "../components/RenderEmoji";
import { IncomeGroupPopUp } from "../components/infoPageComponents/IncomeGroupPopUp";

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

  // window size state
  const { windowObject } = useContext(WindowContext);

  // dominant pollutant. 
  // used for render logic in PollutantAndContributingFactorSection.tsx, 
  // ContributingFactorSection.tsx, ImpactOnHealthSection.tsx
  const [dominantPollutant, setDominantPollutant] = useState<string | null>(null);

  // state used to determine if the modal that pops up over the infoPageRoute is active or not
  const [modalIsActive, setModal] = useState<boolean>(false);

  // state used to render admin window 
  const [adminAuthWindow, setAdminAuthWindow] = useState<boolean>(false);
  // state used to determine if user has been authenticated
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  // state used to render US AQI pop up
  const [usAqiPopUpState, setUsAqiPopUpState] = useState(false);

  // state used for AQI 
  const [aqi, setAqi] = useState<number | undefined>(undefined);

  // state used to render Income Group pop up
  const [incomePopUpState, setIncomePopUpState] = useState(false);

  const getAqi = async (lat: number, lon: number): Promise<void> => {
    const POLLUTANT_API_TOKEN = process.env.REACT_APP_POLLUTANT_TOKEN;
    if (!POLLUTANT_API_TOKEN) {
        throw new Error('Pollutant API token is not provided.');
    }

    const pollutantApiUrl = `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${POLLUTANT_API_TOKEN}`;

    try {
        const res = await axios.get(pollutantApiUrl);
        if (res.data.data.aqi) {
          setAqi(res.data.data.aqi);
        }
    } catch (error: any) {
        console.error('Error fetching AQI data:', error.message);
        throw new Error('Failed to fetch AQI data.');
    }
};


  // following logic will execute upon first render of InfoPage component 
  useEffect(() => {
    /**
     * if datapoint property of searchInfo global state it means the user has not selected a location in the map.
     * app will navigate back to mapRoute if that is the case
     */
    if (searchInfo.datapoint == null) {
      navigate("/mapRoute");
      alert("no location selected");
    }

    // get aqi data
    if (searchInfo.datapoint)
    getAqi(searchInfo.datapoint?.lat, searchInfo.datapoint?.lon);
  }, []);

  /**
   * @returns smile, nuetral, or sadFace emoji based on the range of aqi
   */
  const renderEmoji = (): (JSX.Element | undefined) => {
    if (aqi) {
      return RenderEmoji(aqi);
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
      const res = await axios.post(`http://localhost:3001/aqi?value=${aqi}`);
      console.log(res);
      // alert(`request succesful: ` + res.status);
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
      <AuthenticationContext.Provider
        value={{ authenticated, setAuthenticated, adminAuthWindow, setAdminAuthWindow }}>
        <DominantPollutantContext.Provider value={{ dominantPollutant, setDominantPollutant }} >
          <div className="info-page-outer-container">
            {/** InfoPage header */}
            <div className="info-page-header">

              <div className="info-page-logo">
                <div
                  className="info-page-header-back-button"
                  onClick={() => {
                    navigate("/mapRoute");
                  }}>
                  <img id="back-arrow" src={backArrow} />
                </div>
                <img src={logo} />
                <p>When Air Takes Shape</p>
              </div>

              <div className="info-page-header-admin">
                <img src={admin} onClick={() => setAdminAuthWindow(true)} />
                <p>Admin</p>

                {/** logic to render admin authentication window */}
                {adminAuthWindow ? <AdminWindow /> : null}
              </div>


            </div>
            {/** InfoPage blocks begin.
         * if modalIsActive is set to true, the opacity of all elements inside info-page-blocks div
         * will be set to 0.5 in order to allow the popup modal to stand out over these elements. 
         */}
            <div
              className="info-page-blocks"
              style={
                {
                  opacity: modalIsActive || adminAuthWindow ? 0.5 : 1,
                  height: windowObject.height > windowObject.width ? "100%" : ""
                }
              }>
              <div className="info-page-block-01">{searchInfo.datapoint?.cityCountry}</div>

              <div className="info-page-block-02">
                <div className="info-page-block-02-section-01">{renderEmoji()}</div>
                <div className="into-page-block-02-section-02">
                  <div className="info-page-block-02-section-02-us-aqi">
                    <p>US AQI</p>
                    <img className="info-page-info-icon" src={infoIcon} onClick={() => setUsAqiPopUpState(true)}/>
                     <UsAqiPopUp active={usAqiPopUpState} onClose={() => setUsAqiPopUpState(false)}/>
                  </div>
                  <p className="aqi-number">{aqi}</p>
                </div>
                {/** Scale component is info-page-block-02-section-03 */}
                {aqi && <Scale aqi={aqi} />}
                <div className="info-page-block-02-section-04">
                  <div className="info-page-block-02-section-04-header-and-popup">
                    <p className="first">Income Group</p>
                    <img className="info-page-info-icon" src={infoIcon} onClick={() => setIncomePopUpState(true)}/>
                    <IncomeGroupPopUp active={incomePopUpState} onClose={() => setIncomePopUpState(false)} />
                  </div>
                  {searchInfo.datapoint.incomeGroup ?
                    <p className="second">{searchInfo.datapoint.incomeGroup}</p> :
                    <p className="second">N/A</p>
                  }
                </div>
              </div>

              {/** PollutantSection component is info-page-block-03 */}
              <PollutantAndContributingFactorSection />
              {/** ImpactOnHealthAndHealthRecommendationSection component is info-page-block-04 */}
              <ImpactOnHealthAndHealthRecommendationSection aqi={aqi}/>

              {/** DidYouKnow component is info-page-block-05 */}
              {/** <DidYouKnowSection />}
             * 
            {/** BreathSection component is info-page-block-06.
           * setModal state is passed as props to BreatheSection,
           * this component sets isModalActive state to active when prompt by user.
           */}
              <BreathSection modal={modalIsActive} setModal={setModal} />
              {/**<Debugger >*/}
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
      </AuthenticationContext.Provider>
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
