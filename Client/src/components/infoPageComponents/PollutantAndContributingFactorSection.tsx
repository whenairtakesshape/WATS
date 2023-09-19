// styles
import "./css/pollutantAndContributingFactorSection.scss";

// assets
import coal_mining from "../../assets/contributingFactors/coalMining.png";

// libraries
import { useContext, useEffect, useState, useMemo } from "react";
import axios from 'axios';

// components
import { ContributingFactorCard } from "./contributingFactorComponents/ContributingFactorCard";
import { PollutantCard } from "./pollutantComponents/PollutantCard";
import { SearchInfoContext } from "../../contexts/SearchInfoContext";
import { PollutantLogic } from "./pollutantComponents/PollutantLogic";
import { PollutantSection } from "./pollutantComponents/PollutantSection";
import { ContributingFactorSection } from "./contributingFactorComponents/ContributingFactorSection";
import { DominantPollutantContext } from "../../contexts/DominantPollutantContext";

export const PollutantAndContributingFactorSection = () => {

  // pollutant bool used for logic render below
  const [pollutantBool, setPollutantBool] = useState<boolean>(true);

  // global searchInfo state
  const { searchInfo } = useContext(SearchInfoContext);

  // dominant pollutant state
  const { dominantPollutant, setDominantPollutant } = useContext(DominantPollutantContext);

  //pollutant states
  const [PM25, setPM25] = useState(null);
  const [PM10, setPM10] = useState(null);
  const [O3, setO3] = useState(null);
  const [CO, setCO2] = useState(null);
  const [NO2, setNO2] = useState(null);
  const [SO2, setSO2] = useState(null);

  // token needed to make a request to pollutant API
  const POLLUTANT_API_TOKEN = process.env.REACT_APP_POLLUTANT_TOKEN;
  // pollutant api url will be used to fecth data on PM2.5, PM10, O3, CO, NO2, and SO2 for chosen location
  const pollutantApiUrl =
    `https://api.waqi.info/feed/geo:${searchInfo.datapoint?.lat};${searchInfo.datapoint?.lon}/?token=${POLLUTANT_API_TOKEN}`;

  // async function that fetches pollutant data and sets the pollutant states accordingly, catches error otherwise
  const getPollutantData = async () => {
    try {
      const res = await axios.get(pollutantApiUrl);
      const data = res.data.data.iaqi;
      console.log(res.data.data);
      setPM25(data.pm25?.v);
      setPM10(data.pm10?.v);
      setO3(data.o3?.v);
      setCO2(data.co?.v);
      setNO2(data.no2?.v);
      setSO2(data.so2?.v);

      // set dominant pollutant
      setDominantPollutant(res.data.data.dominentpol);
    }
    catch (error: any) {
      console.log(error.message);
    }
  };

  // calls getPollutantData on first render of this component
  useEffect(() => {
    getPollutantData();
  }, []);

  //<DataContext.Provider value={{ data, setData }}>
  return (
    <div className="pollutant-and-contributing-factor-section-container">
      <div className="pollutant-and-contributing-factor-section-top">
        <button
          style={{ borderBottom: pollutantBool ? "2px solid black" : "2px solid transparent" }}
          onClick={() => setPollutantBool(true)}>
          Pollutants
        </button>
        <button
          style={{ borderBottom: pollutantBool ? "2px solid transparent" : "2px solid black" }}
          onClick={() => setPollutantBool(false)}>
          Contributing Factors
        </button>
      </div>
      {/** if pollutant bool is active, PollutantSection component renders*/}
      {pollutantBool ? <PollutantSection pm25={PM25} pm10={PM10} o3={O3} cO={CO} no2={NO2} so2={SO2} /> :
        <ContributingFactorSection />
      }
    </div>
  );
};;