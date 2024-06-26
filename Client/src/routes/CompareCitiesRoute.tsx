// css styles 
import "./css/compareCitiesRoute.scss";

// data 
import { City, compareCitiesData } from "../data/compareCitiesData";

// libraries import 
import React, { useState } from 'react';
import CompareCitiesListPage from "../components/compareCitiesComponents/compareCitiesListPage";
import CompareCitiesPairPage from "../components/compareCitiesComponents/compareCitiesPairPage";




const CompareCitiesRoute = () => {

    const [selectedCity, setSelectedCity] = useState<City | undefined>(undefined)

    return (
        <div>
            {selectedCity 
                ? <CompareCitiesPairPage city={selectedCity} onBackArrowClick={() => setSelectedCity(undefined)}/> 
                : <CompareCitiesListPage onButtonClick={(city: City) => setSelectedCity(city)}/>}
        </div>
    )

}

export default CompareCitiesRoute;