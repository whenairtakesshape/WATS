//styles and assets
import "./css/AQIscale.scss";

import { useState, useEffect } from "react";



interface Bar {
  label: string,
  aqiText: string,
  description: string

}

export function AQIScale() {

  /** constants */


  const goodRange = 51;
  const moderateRange = 101;
  const unhealthyForSensitiveGroupsRange = 151;
  const unhealthyRange = 201;
  const veryUnhealtyRange = 301;

  const bars: Bar[] = [{

    label: "green",
    aqiText: "<= 50 ",
    description: "Good"

  },
  {

    label: "yellow",
    aqiText: "51 - 100",
    description: "Moderate"


  },
  {

    label: "orange",
    aqiText: "101 - 150",
    description: "Unhealthy For Sensitive Groups"


  },
  {

    label: "red",
    aqiText: "151 - 200",
    description: "Unhealthy"


  },
  {

    label: "purple",
    aqiText: "201 - 300",
    description: "Very Unhealthy"


  },
  {

    label: "brown",
    aqiText: "> 300",
    description: "Hazardous"


  }];

  /** STATES */
  const [selectedBar, setSelectedBar] = useState<Bar | null>(null);

  /** LOGIC */


  const handleSelect = (bar: Bar) => {

    if (selectedBar && bar.label == selectedBar.label) {
      setSelectedBar(null);
    } else {
      setSelectedBar(bar);
    }

  };


  return (


    <div className="scale-container">
      {bars.map((bar) => (
        <div key={bar.label + "container"} className={`bar-container ${selectedBar?.label === bar.label ? 'selected' : ''}`}>

          <div
            key={bar.label}
            className={`bar ${bar.label} ${selectedBar?.label === bar.label ? 'selected' : ''}`}
            onClick={() => handleSelect(bar)}
          >
            <p>{bar.aqiText}</p>
          </div>
          <div className="bar-description"> <p>{bar.description}</p> </div>
        </div>

      ))}
    </div>
  );

}



