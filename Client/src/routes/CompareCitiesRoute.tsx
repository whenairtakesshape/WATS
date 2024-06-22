// css styles 
import "./css/compareCitiesRoute.scss";

// assets

// libraries import 
import React from 'react';


const CompareCitiesRoute = () => {
    return (
    <div className="compare-cities-container">
        <div className="compare-cities-header">Compare Cities</div>
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
            <div className="compare-cities-subtitle">City Pair</div>
        </div>
    </div>
    );
}

export default CompareCitiesRoute;