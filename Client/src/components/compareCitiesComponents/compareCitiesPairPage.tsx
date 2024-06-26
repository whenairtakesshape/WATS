// css styles 
import "../css/compareCitiesPairPage.scss";

// assets 
import back_arrow from "../../assets/compareCitiesAssets/icons/backArrow.svg";
import industry_icon from "../../assets/compareCitiesAssets/icons/industryIcon.svg";
import georaphy_icon from "../../assets/compareCitiesAssets/icons/geographyIcon.svg";
import climate_icon from "../../assets/compareCitiesAssets/icons/climateIcon.svg";
import green_space_icon from "../../assets/compareCitiesAssets/icons/greenSpaceIcon.svg";
import travel_icon from "../../assets/compareCitiesAssets/icons/travelIcon.svg";

// data 
import { City, compareCitiesData } from "../../data/compareCitiesData";

// libraries import 
import React, { useState } from 'react';
import CompareCitiesAqiScale from "./compareCitiesAqiScale";
import axios from "axios";
import { useNavigate } from "react-router-dom";


interface CompareCitiesPairPageProps {
    city: City;
    onBackArrowClick: () => void;
}


const CompareCitiesPairPage = (props: CompareCitiesPairPageProps) => {

    const navigate = useNavigate();

    const [keyFactsSelected, setKeyFactsSelected] = useState(true);

    const vancouverData = compareCitiesData[0];

    const {city, onBackArrowClick} = props;

    const renderCitySummary = (cityData: City) => {
        return (
            <div className="city-summary">
                <div className="city-summary-header">
                    <div className="city-summary-header-title">{cityData.cityName}</div>
                    <div className="city-summary-header-country">{cityData.country}</div>
                </div>
                <img src={require("../../assets/compareCitiesAssets/images/" + cityData.imageName)}/>
                <div className="city-summary-description">{cityData.description}</div>
                <CompareCitiesAqiScale aqi={cityData.aqiRating}/>
            </div>
        );
    }

    /**
   * makes request to the server API and sends value of the air quality index (aqi) of the 
   * chosen location by the user. 
   * then navigates to breatheRoute if request is succesfull.
   * alerts error message otherwise.
   */
    const makeApiRequest = async (aqi: number) => {
        try {
            const res = await axios.post(`http://localhost:3001/aqi?value=${aqi}`);
            console.log(res);
            alert(`request succesful: ` + res.status);
            // navigate("/breathe-page"); // TODO: navigate to breathe-page? 
        }
        catch (error: any) {
            alert(error.message);
            console.error(error);
        }
    };

    return (
        <div className="city-pair-info-page">
            <div className="city-pair-upper-div">
                <button className="city-pair-back-arrow-button" onClick={onBackArrowClick}>
                    <img src={back_arrow} />
                </button>
                <div className="city-pair-summary-container">
                    <div className="city-pair-summary-vancouver">
                        {renderCitySummary(vancouverData)}

                    </div>
                    <div className="city-pair-summary-selected-city">
                        {renderCitySummary(city)}
                    </div>


                </div>  

            </div>
            <div className="city-pair-lower-div">
                <div className="city-pair-tabs">
                    <button 
                        className={keyFactsSelected ? "city-pair-tab selected" : "city-pair-tab"}
                        onClick={() => setKeyFactsSelected(true)}
                    >
                        Key facts
                    </button>
                    <button
                        className={keyFactsSelected ? "city-pair-tab" : "city-pair-tab selected"}
                        onClick={() => setKeyFactsSelected(false)}
                    >
                        Environmental facts
                    </button>
                </div>
                {keyFactsSelected ? 
                    <div className="facts-container">
                        <div className="fact">
                            <div className="fact-key">Population:</div>
                            <div className="key-fact-values"> 
                                <div className="fact-val">{vancouverData.population.toLocaleString()}</div>
                                <div className="fact-val">{city.population.toLocaleString()}</div>
                            </div>
                        </div>
                        <div className="fact">
                            <div className="fact-key">Population density:</div>
                            <div className="key-fact-values"> 
                                <div className="fact-val">{vancouverData.populationDensity} people per square km</div>
                                <div className="fact-val">{city.populationDensity} people per square km</div>
                            </div>
                        </div>
                        <div className="fact">
                            <div className="fact-key">Average base salary (CAD):</div>
                            <div className="key-fact-values"> 
                                <div className="fact-val">${vancouverData.avgBaseSalary.toLocaleString()}</div>
                                <div className="fact-val">${city.avgBaseSalary.toLocaleString()}</div>
                            </div>
                        </div>

                    </div> 
                    : 
                    <div className="facts-container">
                        <div className="fact">
                            <div className="fact-key">
                                <img src={industry_icon}/>
                                Main heavy industry
                            </div>
                            <div className="environmental-fact-values"> 
                                <div className="fact-val">{vancouverData.mainHeavyIndustry}</div>
                                <div className="fact-val">{city.mainHeavyIndustry}</div>
                            </div>
                        </div>
                        <div className="fact">
                            <div className="fact-key">
                                <img src={georaphy_icon} />
                                Surrounding geography:
                            </div>
                            <div className="environmental-fact-values"> 
                                <div className="fact-val">{vancouverData.surroundingGeography}</div>
                                <div className="fact-val">{city.surroundingGeography}</div>
                            </div>
                        </div>
                        <div className="fact">
                            <div className="fact-key">
                                <img src={climate_icon} />
                                Typical climate:
                            </div>
                            <div className="environmental-fact-values"> 
                                <div className="fact-val">{vancouverData.typicalClimate}</div>
                                <div className="fact-val">{city.typicalClimate}</div>
                            </div>
                        </div>
                        <div className="fact">
                            <div className="fact-key">
                                <img src={green_space_icon} />
                                Urban green space:
                            </div>
                            <div className="environmental-fact-values"> 
                                <div className="fact-val">{vancouverData.urbanGreenSpace}</div>
                                <div className="fact-val">{city.urbanGreenSpace}</div>
                            </div>
                        </div>
                        <div className="fact">
                            <div className="fact-key">
                                <img src={travel_icon} />
                                Active travel & transit:
                            </div>
                            <div className="environmental-fact-values"> 
                                <div className="fact-val">{vancouverData.activeTravelAndTransit}</div>
                                <div className="fact-val">{city.activeTravelAndTransit}</div>
                            </div>
                        </div>

                    </div>
                }
                <button className="compare-cities-breathe-button" onClick={() => makeApiRequest(city.aqiRating)}>Start breathing!</button>
                
            </div>
            
        </div>
    );
}

export default CompareCitiesPairPage;