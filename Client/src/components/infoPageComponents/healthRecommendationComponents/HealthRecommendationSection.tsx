// css styles
import "./css/healthRecommendationSection.scss";

// libraries
import { useContext } from "react";

// components
import { HealthRecommendation, HealthRecommendationLogic } from "./HealthRecommendationLogic";
import { HealthRecommendationCard } from "./HealthRecommendationCard";
import { SearchInfoContext } from "../../../contexts/SearchInfoContext";

export const HealthRecommendationSection = () => {

  // searchInfo state
  const { searchInfo } = useContext(SearchInfoContext);

  // HealthRecommendationLogic class
  const healthRecommendationLogic: HealthRecommendationLogic = new HealthRecommendationLogic();

  // array of HealthRecommendation or null value.
  // see HealthRecommendationLogic.ts for when getHealthRecommendations() returns null.
  const healthRecommendations: Array<HealthRecommendation> | null =
    healthRecommendationLogic.getHealthRecommendations(searchInfo.datapoint?.aqi);

  /**
   * message that will display when there is no information available regarding health recommendations.
   * this message will be rendered either when healthRecommendation.length == 0 or healthRecommendation == null.
   * */
  const notAvailableMessage: string =
    "We're sorry, but we don't have information available right now due to " +
    "technical difficulties. Please feel free to check back later. " +
    "Thank you for your understanding!";

  const healthRecommendationRender = () => {
    // checks if health recommendations array is null
    if (!healthRecommendations) {
      return (
        <div className="health-recommendation-section-not-available-message">
          {notAvailableMessage}
        </div>);
    }
    // check if health recommendations array is empty
    if (healthRecommendations.length == 0) {
      return (
        <div className="health-recommendation-section-not-available-message">
          {notAvailableMessage}
        </div>);
    }

    // length of health recommendation array
    const N = healthRecommendations.length;

    // number of items to be rendered per row
    const itemsPerRow: number = 2;
    // array that contains the rows of HealthRecommendation objects to be rendered
    let rows: Array<Array<number>> = [];

    // logic to populate each row in rows with two elements
    let first = 0;
    let second = 1;
    for (let i = 0; i < N; i += itemsPerRow) {
      if (second < N) {
        rows.push([first, second]);
      } else if (first < N) {
        rows.push([first]);
      }
      first += itemsPerRow;
      second += itemsPerRow;
    }

    // render each row of HealthRecommendation objects in rows
    return (rows.map((row) => {
      if (row.length == 2) {
        return (
          <div className="health-recommendation-section-block">
            <HealthRecommendationCard
              name={healthRecommendations[row[0]].title}
              description={healthRecommendations[row[0]].description}
              png={healthRecommendations[row[0]].png}
            />
            <HealthRecommendationCard
              name={healthRecommendations[row[1]].title}
              description={healthRecommendations[row[1]].description}
              png={healthRecommendations[row[1]].png}
            />
          </div>
        );
      } else {
        return (
          <div className="health-recommendation-section-block">
            <HealthRecommendationCard
              name={healthRecommendations[row[0]].title}
              description={healthRecommendations[row[0]].description}
              png={healthRecommendations[row[0]].png}
            />
            <HealthRecommendationCard
              name={healthRecommendations[row[0]].title}
              description={healthRecommendations[row[0]].description}
              png={healthRecommendations[row[0]].png}
              opacity={0}
            />

          </div>
        );
      }
    }));
  };

  return (
    <div className="health-recommendation-section-container">
      {healthRecommendationRender()}
    </div>
  );
};