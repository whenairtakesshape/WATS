import "./css/pollutantCard.scss";
import info_icon from "../../../assets/infoIcon.svg";

interface PollutantCardProps {
  name: string;
  concentration: number | null;
  category: string | null;
  indicator: string | null;
}

export const PollutantCard = (props: PollutantCardProps) => {
  return (
    <div className="pollutant-card-container">
      {/** top section of pollutant card */}
      <div className="pollutant-card-top">
        <div className="pollutant-card-name-and-unit">
          <p className="pollutant-card-name">{props.name}</p>
          <p className="pollutant-card-unit">(ug/m3)</p>
        </div>
        <img src={info_icon} />
      </div>

      {/** Middle section of pollutant card.
       *   if props.concentration is not null, the concentration is rendered in div.
       *   otherwise Not Available is rendered.
       */}
      {props.concentration ?
        <div className="pollutant-card-middle">{props.concentration}</div>
        :
        <p className="pollutant-card-name-na">Not Available</p>}

      {/** category will always render, possibly sometimes with a null value.
       *   this is done to keep the size of card consistent. 
       *   opacity is set to 0 if props.category is null, so the element appears as not visible.
       */}
      <div style={{ opacity: props.category ? 1 : 0 }} className="pollutant-card-category">{props.category}</div>

      {/** the indicator bar will also always render but sometimes an opacity of 0 so that elements appears as not visble.
       *   when props.indicator is null, opacity is 0.
       */}
      <div
        className="pollutant-card-bottom" style={{
          opacity: props.indicator ? 1 : 0,
          background: props.indicator ? props.indicator : "transparent"
        }}></div>
    </div>
  );
};