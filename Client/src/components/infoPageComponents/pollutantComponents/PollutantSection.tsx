// css styles
import "./css/pollutantSection.scss";

// components
import { PollutantCard } from "./PollutantCard";
import { PollutantLogic } from "./PollutantLogic";

export interface PollutantSectionProps {
  pm25: number | null;
  pm10: number | null;
  o3: number | null;
  cO: number | null;
  no2: number | null;
  so2: number | null;
}

export const PollutantSection = (props: PollutantSectionProps) => {

  // pollutant Logic class
  const pollutantLogic = new PollutantLogic();

  return (
    <div className="pollutant-section-container">
      <div className="pollutant-section-item">
        <PollutantCard name={"PM2.5"}
          concentration={props.pm25}
          category={pollutantLogic.getPM25Category(props.pm25)}
          indicator={pollutantLogic.getPM25Indicator(props.pm25)} />
      </div>
      <div className="pollutant-section-item">
        <PollutantCard name={"PM10"}
          concentration={props.pm10}
          category={pollutantLogic.getPM10Category(props.pm10)}
          indicator={pollutantLogic.getPM10Indicator(props.pm10)} />
      </div>
      <div className="pollutant-section-item">
        <PollutantCard name={"O3"}
          concentration={props.o3}
          category={pollutantLogic.getO3Category(props.o3)}
          indicator={pollutantLogic.getO3Indicator(props.o3)} />
      </div>
      <div className="pollutant-section-item">
        <PollutantCard name={"CO"}
          concentration={props.cO}
          category={pollutantLogic.getCoCategory(props.cO)}
          indicator={pollutantLogic.getCoIndicator(props.cO)} />
      </div>
      <div className="pollutant-section-item">
        <PollutantCard name={"NO2"}
          concentration={props.no2}
          category={pollutantLogic.getNO2Category(props.no2)}
          indicator={pollutantLogic.getNO2Indicator(props.no2)} />
      </div>
      <div className="pollutant-section-item">
        <PollutantCard name={"SO2"}
          concentration={props.so2}
          category={pollutantLogic.getSO2Category(props.so2)}
          indicator={pollutantLogic.getSO2Indicator(props.so2)} />
      </div>
    </div>
  );
};;