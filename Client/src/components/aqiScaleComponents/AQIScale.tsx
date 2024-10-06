//styles and assets
import "./css/AQIscale.scss";

//libraries 
import axios from "axios";

//components
import { useState, useEffect } from "react";



interface Bar {
  label: string, // for dev readibility 
  aqiText: string, // display on scale
  aqiNumber : number, // Post to backend when selected
  description: string // display below bar when selected

}

export function AQIScale() {

  /** constants */


  const goodRange = 1;
  const moderateRange = 51;
  const unhealthyForSensitiveGroupsRange = 101;
  const unhealthyRange = 151;
  const veryUnhealtyRange = 201;
  const HazardousRange = 301;

  const bars: Bar[] = [{

    label: "green",
    aqiText: "<= 50 ",
    aqiNumber : goodRange,
    description: "Good"

  },
  {

    label: "yellow",
    aqiText: "51 - 100",
    aqiNumber : moderateRange,
    description: "Moderate"


  },
  {

    label: "orange",
    aqiText: "101 - 150",
    aqiNumber : unhealthyForSensitiveGroupsRange,
    description: "Unhealthy For Sensitive Groups"


  },
  {

    label: "red",
    aqiText: "151 - 200",
    aqiNumber : unhealthyRange,
    description: "Unhealthy"


  },
  {

    label: "purple",
    aqiText: "201 - 300",
    aqiNumber : veryUnhealtyRange,
    description: "Very Unhealthy"


  },
  {

    label: "brown",
    aqiText: "> 300",
    aqiNumber : HazardousRange,
    description: "Hazardous"


  }];

  /** STATES */
  const [selectedBar, setSelectedBar] = useState<Bar | null>(null);

  /** LOGIC */

  const postAQI = async (aqi : number) => {
    try {
      const res = await axios.post(`http://localhost:3001/aqi?value=${aqi}`);
      console.log(res);
      
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    }
  };

  const postStopRequest = async() =>  {
    try {
      const res = await axios.post(`http://localhost:3001/command?command=s`);
      console.log(res);

    } catch (error: any) {
      console.error(error);
      alert(error.message);
    }
  };

  // TODO : do we want a time out between selects?

  const handleSelect = (bar: Bar) => {

    if (selectedBar && bar.label == selectedBar.label) {
      postStopRequest();
      setSelectedBar(null);
    } else {
      postAQI(bar.aqiNumber);
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
              <p>{selectedBar?.label != bar.label ? bar.aqiText : 'Click To Stop'}</p>
            </div>
            <div className="bar-description"> <p>{bar.description}</p> </div>
          </div>

        ))}
              
      </div>
  );

}



