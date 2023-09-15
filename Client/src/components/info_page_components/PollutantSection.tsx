// styles
import "./css/pollutantsection.scss";

// assets
import coal_mining from "../../assets/contributingFactors/coalMining.png";

// libraries
import { useContext, useEffect, useState } from "react";
import axios from 'axios';

// components
import { ContributingFactor } from "./ContributingFactor";
import { PollutantCard } from "./PollutantCard";
import { SearchInfoContext } from "../../contexts/SearchInfoContext";

export const PollutantSection = () => {
  // constants
  const goodRange = 51;
  const moderateRange = 101;
  const unhealthyForSensitiveGroupsRange = 151;
  const unhealthyRange = 201;
  const veryUnhealtyRange = 301;

  // pollutant bool used for logic render below
  const [pollutantBool, setPollutantBool] = useState<boolean>(true);

  // global searchInfo state
  const { searchInfo } = useContext(SearchInfoContext);

  //pollutant states
  const [PM25, setPM25] = useState(null);
  const [PM10, setPM10] = useState(null);
  const [O3, setO3] = useState(null);
  const [CO, setCO2] = useState(null);
  const [NO2, setNO2] = useState(null);
  const [SO2, setSO2] = useState(null);

  // category and indicator states
  const [category, setCategory] = useState(null);
  const [indicator, setIndicator] = useState(null);

  // token needed to make a request to pollutant API
  const POLLUTANT_API_TOKEN = process.env.REACT_APP_POLLUTANT_TOKEN;
  // pollutant api url will be used to fecth data on PM2.5, PM10, O3, CO, NO2, and SO2 for chosen location
  const pollutantApiUrl =
    `https://api.waqi.info/feed/geo:${searchInfo.datapoint?.lat};${searchInfo.datapoint?.lon}/?token=${POLLUTANT_API_TOKEN}`;

  // async function that fetches pollutant data and sets the pollutant states accordingly
  const getPollutantData = async () => {
    try {
      const res = await axios.get(pollutantApiUrl);
      const data = res.data.data.iaqi;
      setPM25(data.pm25?.v);
      setPM10(data.pm10?.v);
      setO3(data.o3?.v);
      setCO2(data.co?.v);
      setNO2(data.no2?.v);
      setSO2(data.so2?.v);
      console.log(data);
    }
    catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getPollutantData();
  }, []);

  // sets the category and indicator state according to the pollutant
  const categoryAndIndicatorSetter = () => {
    if (searchInfo.datapoint) {
      // good range: [0,50]
      if (searchInfo.datapoint.aqi < goodRange) {
        // moderate range: [51, 100]
      } else if (searchInfo.datapoint.aqi < moderateRange) {
        // unhealthy for sensitive groups range: [101, 150]
      } else if (searchInfo.datapoint.aqi < unhealthyForSensitiveGroupsRange) {
        // unhealthy range: [151, 200]
      } else if (searchInfo.datapoint.aqi < unhealthyRange) {
        // very unhealthy range: [201, 300]
      } else if (searchInfo.datapoint.aqi < veryUnhealtyRange) {
      } else {
        // hazardous range: [301-500]
      }
    }
  };

  return (
    <div className="pollutant-container">
      <div className="pollutant-section-top">
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
      {pollutantBool ?
        <div className="pollutant-section-middle">
          <PollutantCard name={"PM2.5"} concentration={PM25} category="good" indicator="green" />
          <PollutantCard name={"PM10"} concentration={PM10} category="good" indicator="green" />
          <PollutantCard name={"O3"} concentration={O3} category="good" indicator="green" />
        </div> :
        <div className="contributing-factor-middle">
          <ContributingFactor name="Coal Mining" img={coal_mining} />
          <ContributingFactor name="Coal Mining" img={coal_mining} />
          <ContributingFactor name="Coal Mining" img={coal_mining} />
        </div>}
      {pollutantBool ?
        <div className="pollutant-section-bottom">
          <PollutantCard name={"CO"} concentration={CO} category="good" indicator="green" />
          <PollutantCard name={"NO2"} concentration={NO2} category="good" indicator="green" />
          <PollutantCard name={"SO2"} concentration={SO2} category="Good" indicator="#A8E05F" />
        </div> :
        <div className="contributing-factor-bottom">
          <ContributingFactor name="Open Burning of Garbage Waste" img={coal_mining} />
          <ContributingFactor name="Coal Mining" img={coal_mining} />
          <ContributingFactor name="Coal Mining" img={coal_mining} />
        </div>}
    </div>
  );
};