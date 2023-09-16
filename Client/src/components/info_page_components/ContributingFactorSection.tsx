// css styles
import "./css/contributingFactorSection.scss";

//libraries
import { useState } from 'react';

// components
import { ContributingFactor, ContributingFactorLogic } from "./ContributingFactorLogic";
import { ContributingFactorCard } from "./ContributingFactorCard";

interface ContributingFactorSectionProps {
  dominantPollutant: string | null;
}

export const ContributingFactorSection = ({ dominantPollutant }: ContributingFactorSectionProps) => {

  // contributing factor logic class
  const contributingFactorLogic: ContributingFactorLogic = new ContributingFactorLogic();
  const array: Array<ContributingFactor> | null =
    contributingFactorLogic.getContributingFactors(dominantPollutant);

  const notAvailableMessage =
    "We're sorry, but we don't have information about pollutants" +
    "available right now due to technical difficulties." +
    "Please feel free to check back later. Thank you for your understanding!";

  const contributingFactorRender = () => {
    if (!array) return;
    if (!array.length) return <div>Research Data Not Available</div>;


    const n: number = array.length;
    const remainder: number = n % 3;
    const numberOfGroups = Math.ceil(n / 3);
    console.log(n);
    console.log(numberOfGroups);

    const ranges = [];
    let start = 0;
    let middle = 1;
    let finish = 2;

    for (let i = 0; i < numberOfGroups; i++) {
      if (finish < n) {
        ranges.push([start, middle, finish]);
      } else if (middle < n) {
        ranges.push([start, middle]);
      } else if (start < n) {
        ranges.push([start]);
      }
      start += 3;
      middle += 3;
      finish += 3;
    }

    console.log(ranges);

    return (ranges.map((range, index) => {
      if (range.length == 3) {
        return (
          <div key={index} className="contributing-factor-section-block">
            <ContributingFactorCard name={array[range[0]].name} img={array[range[0]].png} />
            <ContributingFactorCard name={array[range[1]].name} img={array[range[1]].png} />
            <ContributingFactorCard name={array[range[2]].name} img={array[range[2]].png} />
          </div>
        );
      } else if (range.length == 2) {
        return (
          <div key={index} className="contributing-factor-section-block">
            <ContributingFactorCard name={array[range[0]].name} img={array[range[0]].png} />
            <ContributingFactorCard name={array[range[1]].name} img={array[range[1]].png} />
            <ContributingFactorCard name={array[range[1]].name}
              img={array[range[1]].png}
              opacity={0} />
          </div>
        );
      } else {
        return (
          <div key={index} className="contributing-factor-section-block">
            <ContributingFactorCard name={array[range[0]].name} img={array[range[0]].png} />
            <ContributingFactorCard
              name={array[range[0]].name}
              img={array[range[0]].png}
              opacity={0} />
          </div>
        );
      }
    }));


  };

  return (
    <div className="contributing-factor-section-container">
      {array ? contributingFactorRender() : <div className="not-available-message">{notAvailableMessage}</div>}
    </div>
  );
};