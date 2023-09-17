// css styles
import "./css/contributingFactorSection.scss";

//libraries
import { useState } from 'react';

// components
import { ContributingFactor, ContributingFactorLogic } from "./ContributingFactorLogic";
import { ContributingFactorCard } from "./ContributingFactorCard";

// prop interface for ContributingFactorSection
interface ContributingFactorSectionProps {
  dominantPollutant: string | null;
}

export const ContributingFactorSection = ({ dominantPollutant }: ContributingFactorSectionProps) => {

  // contributing factor logic class
  const contributingFactorLogic: ContributingFactorLogic = new ContributingFactorLogic();

  // array of ContributingFactor or null value.
  // see ContributingFactorLogic.ts for when getContributingFactors() returns null.
  const contributingFactorsArray: Array<ContributingFactor> | null =
    contributingFactorLogic.getContributingFactors(dominantPollutant);

  /**
   * message that will display when there is no information available regarding contributing factors.
   * this message will be rendered either when contributingFactorsArray.length == 0
   * or contributingFactors == null.
   */
  const notAvailableMessage: string =
    "We're sorry, but we don't have information about pollutants" +
    "available right now due to technical difficulties." +
    "Please feel free to check back later. Thank you for your understanding!";

  /**
   * 
   * @returns not-available-message div element if contributingFactorsArray is null,
   * or contributing-factor-section-block div element if contributingFactorsArray is not null or empty.
   */
  const contributingFactorRender = () => {
    // checks if contributingFactorsArray is null
    if (!contributingFactorsArray) {
      return <div className="not-available-message">{notAvailableMessage}</div>;
    }
    // checks if contributingFactorsArray is empty
    if (!contributingFactorsArray.length) {
      return <div className="not-available-message">{notAvailableMessage}</div>;
    }

    // length of array
    const n: number = contributingFactorsArray.length;
    /**
     * ContributingFactorSection must render a grid of 3 ContributingFactorCard per row. 
     * so if the array contains 4 ContributingFactor objects, the number of groups will be 2,
     * as first row will render 3 contributing factors and bottom row only 1.
     */
    const numberOfGroups = Math.ceil(n / 3);

    /**
     * array of array of numbers.
     * used to store the range of ContributingFactor that must render per row.
     * each array stored in ranges represents a range in contributingFactorsArray
     * For example, [[0, 1, 2], [3, 4]] means first row contains contributing factors 0 to 2 
     * and second row contains contributing factors 3 to 4. 
     */
    const ranges: Array<Array<number>> = [];
    let start = 0;
    let middle = 1;
    let finish = 2;

    for (let i = 0; i < numberOfGroups; i++) {
      // if finish is still less than n, it means row i can still hold three elements as they are
      // available in contributingFactorsArray
      if (finish < n) {
        ranges.push([start, middle, finish]);
        // if middle is still less than n, there are only two elements in contributingFactorsArray that can 
        // render in this row i
      } else if (middle < n) {
        ranges.push([start, middle]);
        // if start is less than n, there is only one element that can render in this row i
      } else if (start < n) {
        ranges.push([start]);
      }
      // increase start, middle, finish counts 3 at a time
      start += 3;
      middle += 3;
      finish += 3;
    }

    // map through ranges array and render rows contained in ranges array.
    return (ranges.map((range, index) => {
      // if range contains three elements, all three should be rendered. 
      // this would be the ContributingFactor at range[0], range[1], range[2].
      // range[0] corresponds to a Contributing factor in contributingFactorsArray. so does range[1] and range[2].
      if (range.length == 3) {
        return (
          <div key={index} className="contributing-factor-section-block">
            <ContributingFactorCard
              name={contributingFactorsArray[range[0]].name} img={contributingFactorsArray[range[0]].png} />
            <ContributingFactorCard name={contributingFactorsArray[range[1]].name} img={contributingFactorsArray[range[1]].png} />
            <ContributingFactorCard name={contributingFactorsArray[range[2]].name} img={contributingFactorsArray[range[2]].png} />
          </div>
        );
        /**
         * range contains two elements, range[0] and range[1].
         * However a third element is rendered to keep the css structure of the row, but it is rendered 
         * with opacity of 0.
         * This invisible third element could be either range[0] or range[1].
         * 
         */
      } else if (range.length == 2) {
        return (
          <div key={index} className="contributing-factor-section-block">
            <ContributingFactorCard name={contributingFactorsArray[range[0]].name} img={contributingFactorsArray[range[0]].png} />
            <ContributingFactorCard name={contributingFactorsArray[range[1]].name} img={contributingFactorsArray[range[1]].png} />
            <ContributingFactorCard name={contributingFactorsArray[range[1]].name}
              img={contributingFactorsArray[range[1]].png}
              opacity={0} />
          </div>
        );
        /**
         * range contains only one element. 
         * Yet, two additional elements are rendered to keep structure of row but are rendered wit opacity of 0.
         * This two additional elements must be range[0], as it is the only element contained in range array.
         */
      } else {
        return (
          <div key={index} className="contributing-factor-section-block">
            <ContributingFactorCard name={contributingFactorsArray[range[0]].name} img={contributingFactorsArray[range[0]].png} />
            <ContributingFactorCard
              name={contributingFactorsArray[range[0]].name}
              img={contributingFactorsArray[range[0]].png}
              opacity={0} />
            <ContributingFactorCard
              name={contributingFactorsArray[range[0]].name}
              img={contributingFactorsArray[range[0]].png}
              opacity={0} />

          </div>
        );
      }
    }));
  };

  return (
    <div className="contributing-factor-section-container">
      {contributingFactorRender()}
    </div>
  );
};