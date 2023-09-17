// css import
import "./css/impactOnHealthSection.scss";

// libraries
import { useContext } from "react";

// components
import { ImpactOnHealth, ImpactOnHealthLogic } from "./ImpactOnHealthLogic";
import { DominantPollutantContext } from "../../contexts/DominantPollutantContext";
import { ImpactOnHealthCard } from "./ImpactOnHealthCard";


export const ImpactOnHealthSection = () => {

  //dominant pollutant state
  const { dominantPollutant } = useContext(DominantPollutantContext);

  // ImpactOnHealthLogic class
  const impactOnHealthLogic: ImpactOnHealthLogic = new ImpactOnHealthLogic();

  // array of ImpactOnHealth or null value for given dominant pollutant.
  // see ImpactOnHealthLogic.ts for when getImpactsOnHealth() returns null.
  const healthImpacts: Array<ImpactOnHealth> | null =
    impactOnHealthLogic.getHealthImpacts(dominantPollutant);

  /**
   * message that will display when there is no information available regarding health impacts.
   * this message will be rendered either when healthImpacts.length == 0
   * or healthImpacts == null.
   */
  const notAvailableMessage: string =
    "We're sorry, but we don't have information available right now due to " +
    "technical difficulties. Please feel free to check back later. " +
    "Thank you for your understanding!";

  const healthImpactsRender = () => {
    // checks if healthImpacts is null
    if (!healthImpacts) {
      return (
        <div className="impact-on-health-section-not-available-message">
          {notAvailableMessage}
        </div>);
    }
    // checks if healthImpacts is empty
    if (!healthImpacts.length) {
      return (
        <div className="impact-on-health-section-not-available-message">
          {notAvailableMessage}
        </div>);
    }

    // length of healthImpacts array
    const N = healthImpacts.length;
    // number of items to be rendered per row
    const itemsPerRow: number = 2;
    // array that contains rows of ImpactOnHealth objects to be rendered
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

    // render each row of ImpactOnHealth objects in rows
    return (rows.map((row) => {
      if (row.length == 2) {
        return (
          <div className="impact-on-health-section-block">
            <ImpactOnHealthCard
              name={healthImpacts[row[0]].name}
              description={healthImpacts[row[0]].description}
              png={healthImpacts[row[0]].png}
            />
            <ImpactOnHealthCard
              name={healthImpacts[row[1]].name}
              description={healthImpacts[row[1]].description}
              png={healthImpacts[row[1]].png}
            />
          </div>
        );
      } else {
        return (
          <div className="impact-on-health-section-block">
            <ImpactOnHealthCard
              name={healthImpacts[row[0]].name}
              description={healthImpacts[row[0]].description}
              png={healthImpacts[row[0]].png}
            />
            <ImpactOnHealthCard
              name={healthImpacts[row[0]].name}
              description={healthImpacts[row[0]].description}
              png={healthImpacts[row[0]].png}
              opacity={0}
            />

          </div>
        );
      }
    }));
  };

  return (
    <div className="impact-on-health-section-container">
      {healthImpactsRender()}
    </div>
  );
};