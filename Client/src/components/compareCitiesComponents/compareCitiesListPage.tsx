// css styles 
import "../css/compareCitiesListPage.scss";

// data 
import { City, compareCitiesData } from "../../data/compareCitiesData";

// libraries import 
import React, { useState } from 'react';

interface CompareCitiesListPageProps {
    onButtonClick: (city: City) => void;
}




const CompareCitiesListPage = (props: CompareCitiesListPageProps) => {

    const [showFullCityList, setShowFullCityList] = useState(false);

    const renderCityTile = (city: City) => {
        return (
            <button className="city-button" onClick={() => props.onButtonClick(city)}>
                <img className="city-button-image" src={require("../../assets/compareCitiesAssets/images/" + city.imageName)}/>
                <div className="city-button-label">{city.cityName}</div>
             </button>
    
        )
    }

    return (
    <div className="compare-cities-container">
        <div className="compare-cities-header">Welcome to the Air Quality Comparison!</div>
        <div className="compare-cities-content">
            <div className="compare-cities-description">Here you can compare air quality data between Vancouver and another city of your choice.</div>
            <div className="compare-cities-subtitle">How it works:</div>
            <ol className="compare-cities-how-it-works-list">
                <li>Select a city </li>
                <li>Compare key factors impacting air quality</li>
                <li>Get insights on how the cities are related to each other</li>
                <li>Breathe and notice the differences between the two cities</li>
                <li>Choose another city</li>
            </ol>
            <div className="compare-cities-subtitle">City pair:</div>
            <div className="compare-cities-city-list">
                {showFullCityList ? 
                    compareCitiesData.slice(1).map((city) => (renderCityTile(city)))
                    : 
                    compareCitiesData.slice(1,5).map((city) => (renderCityTile(city)))
                }
            </div>
            {!showFullCityList && (<button className= "show-full-list-button" onClick={() => setShowFullCityList(true)}>Show full list →</button>)}
        </div>
    </div>
    );
}

export default CompareCitiesListPage;