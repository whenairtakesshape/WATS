// styles
import "./css/pollutantAndContributingFactorSection.scss";

// assets
import coal_mining from "../../assets/contributingFactors/coalMining.png";

// libraries
import { useContext, useEffect, useState, useMemo } from "react";
import axios from 'axios';

// components
import { ContributingFactorCard } from "./ContributingFactorCard";
import { PollutantCard } from "./PollutantCard";
import { SearchInfoContext } from "../../contexts/SearchInfoContext";
import { PollutantLogic } from "./PollutantLogic";
import { PollutantSection } from "./PollutantSection";
import { ContributingFactorSection } from "./ContributingFactorSection";

export const PollutantAndContributingFactorSection = () => {

  // pollutant Logic class
  const pollutantLogic = new PollutantLogic();

  // pollutant bool used for logic render below
  const [pollutantBool, setPollutantBool] = useState<boolean>(true);

  // dominant pollutant 
  const [dominantPollutant, setDominantPollutant] = useState<string | null>(null);

  // global searchInfo state
  const { searchInfo } = useContext(SearchInfoContext);

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

      {pollutantBool ? <PollutantSection pm25={PM25} pm10={PM10} o3={O3} cO={CO} no2={NO2} so2={SO2} /> :
        <ContributingFactorSection dominantPollutant={dominantPollutant} />
      }

      {/** pollutantBool ?
        <div className="pollutant-section-middle">
          <PollutantCard name={"PM2.5"}
            concentration={PM25}
            category={pollutantLogic.getPM25Category(PM25)}
            indicator={pollutantLogic.getPM25Indicator(PM25)} />
          <PollutantCard name={"PM10"}
            concentration={PM10}
            category={pollutantLogic.getPM10Category(PM10)}
            indicator={pollutantLogic.getPM10Indicator(PM10)} />
          <PollutantCard name={"O3"}
            concentration={O3}
            category={pollutantLogic.getO3Category(O3)}
            indicator={pollutantLogic.getO3Indicator(O3)} />
        </div> :
        <div className="contributing-factor-middle">
          <ContributingFactorCard name="Coal Mining" img={coal_mining} />
          <ContributingFactorCard name="Coal Mining" img={coal_mining} />
          <ContributingFactorCard name="Coal Mining" img={coal_mining} />
        </div>}

      {pollutantBool ?
        <div className="pollutant-section-bottom">
          <PollutantCard name={"CO"}
            concentration={CO}
            category={pollutantLogic.getCoCategory(CO)}
            indicator={pollutantLogic.getCoIndicator(CO)} />
          <PollutantCard name={"NO2"}
            concentration={NO2}
            category={pollutantLogic.getNO2Category(NO2)}
            indicator={pollutantLogic.getNO2Indicator(NO2)} />
          <PollutantCard name={"SO2"}
            concentration={SO2}
            category={pollutantLogic.getSO2Category(SO2)}
            indicator={pollutantLogic.getSO2Indicator(SO2)} />
        </div> :

        <div className="contributing-factor-bottom">
          <ContributingFactorCard name="Open Burning of Garbage Waste" img={coal_mining} />
          <ContributingFactorCard name="Coal Mining" img={coal_mining} />
          <ContributingFactorCard name="Coal Mining" img={coal_mining} />
      </div> */}


    </div>
  );
};;