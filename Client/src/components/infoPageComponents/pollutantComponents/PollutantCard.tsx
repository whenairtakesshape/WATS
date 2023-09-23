// css styles
import "./css/pollutantCard.scss";

// assets
import info_icon from "../../../assets/infoIcon.svg";

// libraries
import { useState } from "react";
import { PollutantCardPopUpData } from "./PollutantCardPopUpData";


interface PollutantCardProps {
  name: string;
  concentration: number | null;
  category: string | null;
  indicator: string | null;
}


export const PollutantCard = (props: PollutantCardProps) => {

  // state used to render modal conditionally
  const [openModal, setOpenModal] = useState(false);

  // pollutant data class container.
  const pollutantData: PollutantCardPopUpData = new PollutantCardPopUpData();

  /**
   * returns an array of facts related to the given pollutant
   * @param pollutant name
   * @returns array of strings. each string is a fact about the given pollutant
   */
  function getTextForCard(pollutant: string): Array<string> {
    switch (pollutant) {
      case "PM2.5":
        return pollutantData.getpm25();
      case "PM10":
        return pollutantData.getpm10();
      case "O3":
        return pollutantData.geto3();
      case "CO":
        return pollutantData.getcO();
      case "NO2":
        return pollutantData.getno2();
      default:
        return pollutantData.getso2();
    }
  };

  /**
   * 
   * @param pollutant name
   * @param category of pollutant [good, moderate, unhealthy for sensitive groups, unhealthy,
   *                               veru unhealthy, hazardous]
   * @param indicator a hex color in string format
   * @returns pollutant-card-container-modal html element
   */
  const renderModal = (pollutant: string, category: string | null, indicator: string | null) => {
    const data = getTextForCard(pollutant);
    return (
      <div className="pollutant-card-container-modal">
        {/** */}
        <div className="pollutant-card-container-modal-x">
          <button onClick={() => setOpenModal(false)}>x</button>
        </div>
        {/** */}
        <div className="pollutant-card-container-modal-header">
          <div className="pollutant-card-container-modal-header-left">
            <p className="pollutant-card-container-modal-header-pollutant-name">{pollutant}</p>
            <p className="pollutant-card-container-modal-header-pollutant-units">(ug/m3)</p>
          </div>
          {category ?
            <div
              className="pollutant-card-container-modal-header-right"
              style={{ background: indicator ? indicator : "#F9F9F" }}>
              {category == "Unhealthy For Sensitive Groups" ? "Unhealthy Sensitive" : category}
            </div>
            :
            null}
        </div>
        {/** rendering of data */}
        <div className="pollutant-card-container-modal-text">
          <p><b>What is {pollutant}?</b></p>
          <p>{data[0]}</p>
        </div>
        <div className="pollutant-card-container-modal-text">
          <p><b>Where does it come from?</b></p>
          <p>{data[1]}</p>
        </div>
        <div className="pollutant-card-container-modal-text">
          <p><b>What are the health impacts?</b></p>
          <p>{data[2]}</p>
        </div>
        {/** */}
      </div>
    );
  };
  return (
    <div className="pollutant-card-container">
      {/** top section of pollutant card */}
      <div className="pollutant-card-top">
        <div className="pollutant-card-name-and-unit">
          <p className="pollutant-card-name">{props.name}</p>
          <p className="pollutant-card-unit">(ug/m3)</p>
        </div>
        <img
          src={info_icon}
          onClick={() => { openModal ? setOpenModal(false) : setOpenModal(true); }}
        />
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
        }}>
      </div>
      {/** conditional rendering of modal */}
      {openModal && renderModal(props.name, props.category, props.indicator)}
    </div>
  );
};