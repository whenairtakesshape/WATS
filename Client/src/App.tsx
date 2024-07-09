// styles import
import "./css/App.scss";

// libraries
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// components and routes
import { MapRoute } from "./routes/MapRoute";
import { InfoPage } from "./routes/InfoPageRoute";
import { LandingPage } from "./routes/LandingPageRoute";
import { IntroductionMap } from "./routes/IntroductionMapRoute";
import { IntroductionCompare } from "./routes/IntroductionCompareRoute";
import { AboutPage } from "./routes/AboutPageRoute";
import TakeActionPageRoute from "./routes/TakeActionPageRoute";
import CompareCitiesRoute from "./routes/CompareCitiesRoute";
import { ThankYouPage } from "./routes/ThankYouPageRoute";
import { SearchInfo, SearchInfoContext } from "./contexts/SearchInfoContext";
import { DataHandler, Country, City } from "./model/DataHandler";
import { WindowSize } from "./model/interfaces";
import { WindowContext } from "./contexts/WindowSizeContext";
import { Data, DataContext } from "./contexts/DataContext";
import { BreatheRoute } from "./routes/BreatheRoute";
import { AdminWindow } from "./components/AdminWindow";
import NavBar from "./components/NavBar";
import { ChoosingPathwayRoute } from "./routes/ChoosingPathwayRoute";


/* 
Project Structure...
This is the main component of the web app.
The App function renders the main routes of the app.
Each route has its own .tsx file under routes folder. 

Routes vs Components:
Routes serve as higher level component for all other within those routes. 
For example MapRoute render subcomponents that need to be rendered in that route. 
Subcomponents could be cards, figures, charts, data visualizations, etc. 

CSS styles...
Most .tsx files have a .css file associated with it and can be found in the css directories. 
*/

function App() {
  // data handler object, used to obtain data on cities and countries.
  const dataHandler: DataHandler = new DataHandler();

  // screenSize global state used to track the size of current screen.
  // this state is useful to make the app responsive to different screen sizes and update css throughout app's lifecycle.
  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  // searchInfo global state is initally set to the following default properties.
  const [searchInfo, setSearchInfo] = useState<SearchInfo>({
    term: "",
    zoom: 3,
    center: {
      lat: 45.765001,
      lng: -76.001027,
    },
    activeMarker: null,
    datapoint: null,
  });

  // data global state
  const [data, setData] = useState<Data>({
    all_data: dataHandler.getData(),
    city_countries: dataHandler.getCityCountries(),
    priority_data: dataHandler.getPriorityData(),
    priority_city_countries: dataHandler.getPriorityCityCountries(),
  });

  /**
   * @returns current size of app window
   */
  function getCurrentDimension(): WindowSize {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  // updates screen size state when called
  const updateDimension = () => {
    setScreenSize(getCurrentDimension());
  };

  /** after the first render of this component, an event listener is appended to the window.
   * the callback updateDimension() gets invoked when the event is dispatched (when a "resize" event takes place).
   * updateDimension updates screenSize state, which will cause a re-render of the App component since
   * one of it states changed.
   * When this re-render occurs, the old event listener is removed and a new one is appended to the window.
   */
  useEffect(() => {
    window.addEventListener("resize", updateDimension);
    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, []);

  return (
    <Router>
      <div className="app-outer">
        <main>
          {/**
           * the main routes of the app are wrapped by three contexts.
           * DataContext, WindowContext, SearchInfoContext.
           * This context providers make available global states throughout the app's lifecycle under any component
           * rendered in these routes.
           */}
          <DataContext.Provider value={{ data, setData }}>
            <WindowContext.Provider
              value={{
                windowObject: screenSize,
                setWindowObject: setScreenSize,
              }}
            >
              <NavBar />
              <SearchInfoContext.Provider value={{ searchInfo, setSearchInfo }}>
                <Routes>
                  <Route path="/mapRoute" element={<MapRoute />}></Route>
                  <Route path="/" element={<LandingPage />}></Route>
                  <Route path="/intro-map" element={<IntroductionMap />}></Route>
                  <Route path="/intro-compare" element={<IntroductionCompare />}></Route>
                  <Route path="/info-page" element={<InfoPage />}></Route>
                  <Route path="/about-page" element={<AboutPage />}></Route>
                  <Route path='/choosing-pathway' element={<ChoosingPathwayRoute />}></Route>
                  <Route
                    path="/breathe-page"
                    element={<BreatheRoute />}
                  ></Route>
                  <Route
                    path="/compare-cities"
                    element={<CompareCitiesRoute />}
                  ></Route>
                  <Route
                    path="/take-action"
                    element={<TakeActionPageRoute />}
                  ></Route>
                  <Route path = "/thank-you" element = {<ThankYouPage />}></Route>
                </Routes>
                {/* <button onClick={() => sendAQI(55)}>1</button> */}
              </SearchInfoContext.Provider>
            </WindowContext.Provider>
          </DataContext.Provider>
        </main>
      </div>
    </Router>
  );
}

export default App;
