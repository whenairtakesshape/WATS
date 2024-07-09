// css styles
import "./css/compareCitiesRoute.scss";

// data
import { City, compareCitiesData } from "../data/compareCitiesData";

// libraries import
import React, { useState } from "react";
import CompareCitiesListPage from "../components/compareCitiesComponents/compareCitiesListPage";
import CompareCitiesPairPage from "../components/compareCitiesComponents/compareCitiesPairPage";
import axios from "axios";
import { BreathePage } from "../components/BreathePage";
import { useNavigate } from "react-router-dom";

export enum CompareCitiesBreathingStage {
  NOT_BREATHING,
  FIRST_CITY,
  SECOND_CITY,
  COMPLETION,
}

const CompareCitiesRoute = () => {
  const navigate = useNavigate();

  const [selectedCity, setSelectedCity] = useState<City | undefined>(undefined);

  const [isBreathing, setIsBreathing] = useState(false);

  const [breathingStage, setBreathingStage] =
    useState<CompareCitiesBreathingStage>(
      CompareCitiesBreathingStage.NOT_BREATHING
    );

  const vancouverData = compareCitiesData[0];

  const [showFullCityList, setShowFullCityList] = useState(false);

  /**
   * makes request to the server API and sends value of the air quality index (aqi) of the
   * chosen location by the user.
   * then navigates to breatheRoute if request is succesfull.
   * alerts error message otherwise.
   */
  const handleBreatheButtonClick = async () => {
    if (selectedCity) {
      try {
        const res = await axios.post(
          `http://localhost:3001/aqi?value=${vancouverData.aqiRating}`
        );
        console.log(res);
        // alert(`request succesful: ` + res.status);
        setBreathingStage(CompareCitiesBreathingStage.FIRST_CITY);
        setIsBreathing(true);
      } catch (error: any) {
        alert(error.message);
        console.error(error);
      }
    }
  };

  const handleBackButtonClick = async () => {
    try {
      const res = await axios.post(`http://localhost:3001/command?command=s`);
      console.log(res);
      setIsBreathing(false);
      setSelectedCity(undefined);
    } catch (error: any) {
      alert(error.message);
      console.error(error);
    }
  };

  const handleNextCityButtonClick = async () => {
    if (breathingStage == CompareCitiesBreathingStage.FIRST_CITY) {
      if (selectedCity) {
        try {
          const res = await axios.post(
            `http://localhost:3001/aqi?value=${selectedCity.aqiRating}`
          );
          console.log(res);
          setBreathingStage(CompareCitiesBreathingStage.SECOND_CITY);
        } catch (error: any) {
          alert(error.message);
          console.error(error);
        }
      }
    } else if (breathingStage == CompareCitiesBreathingStage.SECOND_CITY) {
      try {
        const res = await axios.post(`http://localhost:3001/command?command=s`);
        console.log(res);
        setBreathingStage(CompareCitiesBreathingStage.COMPLETION);
      } catch (error: any) {
        alert(error.message);
        console.error(error);
      }
    } else {
      navigate("/take-action");
    }
  };

  return (
    <div className="compare-cities-route">
      {selectedCity ? (
        isBreathing ? (
          breathingStage == CompareCitiesBreathingStage.FIRST_CITY ? (
            <BreathePage
              backButtonLabel="Back to City Comparison"
              onBackButtonClick={() => handleBackButtonClick()}
              nextButtonLabel="Next City"
              onNextButtonClick={() => handleNextCityButtonClick()}
              cityName={vancouverData.cityName}
            />
          ) : breathingStage == CompareCitiesBreathingStage.SECOND_CITY ? (
            <BreathePage
              backButtonLabel="Back to City Comparison"
              onBackButtonClick={() => handleBackButtonClick()}
              nextButtonLabel="Next"
              onNextButtonClick={() => handleNextCityButtonClick()}
              cityName={selectedCity.cityName}
              aqi={selectedCity.aqiRating}
            />
          ) : (
            <BreathePage
              backButtonLabel="Back to City Comparison"
              onBackButtonClick={() => handleBackButtonClick()}
              nextButtonLabel="Next"
              onNextButtonClick={() => handleNextCityButtonClick()}
              isCompareCitiesCompleted={true}
            />
          )
        ) : (
          <CompareCitiesPairPage
            city={selectedCity}
            onBackArrowClick={() => setSelectedCity(undefined)}
            onBreatheButtonClick={() => handleBreatheButtonClick()}
          />
        )
      ) : (
        <CompareCitiesListPage
          onBackArrowClick={() => setShowFullCityList(true)}
          onButtonClick={(city: City) => setSelectedCity(city)}
          showFullCityList={showFullCityList}
          setShowFullCityList={setShowFullCityList}
        />
      )}
    </div>
  );
};

export default CompareCitiesRoute;
