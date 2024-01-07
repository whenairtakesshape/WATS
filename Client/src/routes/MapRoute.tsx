// styles
import "./css/map.scss";

// assets
import backArrow from "../assets/backArrow.svg";

// libraries
import { useRef, useContext, useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";

// components
import { MapFilter } from "../components/MapFilter";
import { WindowContext } from "../contexts/WindowSizeContext";
import { DataContext } from "../contexts/DataContext";
import { SearchInfoContext } from "../contexts/SearchInfoContext";
import { Datapoint } from "../model/DataHandler";

// MapRoute that is rendered in App.tsx
export function MapRoute() {
  // google maps API key extracted from .env file
  const key: string | undefined = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  /**
   * subKey is the value that should be passed in useLoadScript to googleMapsApiKey.
   * the reason for this is that key can be undefined and googleMapsApiKey only takes string.
   * so if environment variable is not available, the Google Maps Api will not load properly.
   * */
  let subKey: string = "apiKeyNotAvailable";

  // set subkey equal to key if environment variable is available.
  if (key) {
    subKey = key;
  }

  // use google maps api hook useLoadScript to load the google maps interface into the app.
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: subKey,
  });

  // if google maps interface is not loaded then loading div is returned, otherwise the Map component is rendered.
  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

// renders GoogleMap component
function Map() {
  //navigation hook used to navigate to other routes
  const navigate: NavigateFunction = useNavigate();

  /**
   * data global state that becomes available via DataContext.
   * stores information pertaining to cities and countries (see DataContext.tsx)
   */
  const { data, setData } = useContext(DataContext);

  // searchInfo global state
  const { searchInfo, setSearchInfo } = useContext(SearchInfoContext);

  // windowObject global state used to make app aware of the current sreen size throughout the app's lifecycle.
  // in this component the width of window is used to set the zoom of the google maps.
  const { windowObject, setWindowObject } = useContext(WindowContext);

  // this is a reference to the Google Map Object.
  // used to manipulate or get information from this object such as the current zoom of the map.
  const mapRef = useRef<google.maps.Map | null>(null);

  // updates center of map in response to window width limit of 600px.
  useEffect(() => {
    if (windowObject.width < 600) {
      setSearchInfo({ ...searchInfo, zoom: 2 });
    } else {
      setSearchInfo({ ...searchInfo, zoom: 3 });
    }
  }, [windowObject]);

  /**
   * on first render of MapRoute, sets properties of searchInfo to default properties and
   * prevents user from navigating to infoPage route without selecting a location.
   */
  useEffect(() => {
    setSearchInfo({
      term: "",
      zoom: 3,
      center: {
        lat: 45.765001,
        lng: -76.001027,
      },
      activeMarker: null,
      datapoint: null,
    });
  }, []);

  /**
   * searchFiltered is an array that has been filtered by the search term that the user has input in the search bar.
   * if searchInfo.term is equal to empty string, data.priorityData is returned.
   * if searchInfo.term is not empty string, meaning user has started to search for a location,
   * data.allData must be the filtered array because this array contains all locations available.
   * data.priorityData only contains the locations that are rendered on the map and the search bar upon first render
   * of this component.
   */
  //.filter((datapoint) =>
  //datapoint.city_country.toLocaleLowerCase().includes(searchInfo.term.toLocaleLowerCase()))
  const searchFiltered: Array<Datapoint> =
    searchInfo.term == ""
      ? data.priority_data
      : data.all_data.filter((datapoint) =>
          datapoint.cityCountry
            .toLocaleLowerCase()
            .includes(searchInfo.term.toLocaleLowerCase())
        );

  /**
   * @param Datapoint object
   * @returns immediately if selected marker is already the active marker, else it
   * sets the searchInfo.center.lat and searchInfo.center.lon to the the lat and lng of the
   * location selected by user
   */
  const handleActiveMarker = (datapoint: Datapoint) => {
    if (datapoint.uid === searchInfo.activeMarker) {
      return;
    }
    setSearchInfo({
      ...searchInfo,
      zoom: 4,
      center: { lat: datapoint.lat, lng: datapoint.lon },
      activeMarker: datapoint.uid,
    });
  };

  return (
    <div className="map-route-container">
      <div
        className="map-route-container-back-button"
        onClick={() => navigate("/intro")}
      >
        <img src={backArrow} />
      </div>
      {/* <p>{windowObject.width}</p> */}
      {/**MapFilter is the overlay component that hoves over the google map */}
      <MapFilter />
      {/**GoogleMap component.
       * it consumes a zoom and center props.
       * onLoad sets mapRef.current to the curreng Google Map Object.
       * onZoomChanged updates the searchInfo.zoom property
       */}
      <GoogleMap
        zoom={searchInfo.zoom}
        center={searchInfo.center}
        mapContainerClassName="google-map-container"
        onLoad={(map) => {
          mapRef.current = map;
        }}
        onZoomChanged={() => {
          if (mapRef.current != null) {
            setSearchInfo({ ...searchInfo, zoom: mapRef.current.getZoom() });
          }
        }}
      >
        {/** searchFiltered.map returns a MarkerF for each datapoint.
         *   DataPoint has a lat and lng, also a unique identifier (uid) which is used
         *   to handle the logic for when InfoWindowF should popup over a specific location marker
         */}
        {searchFiltered.map((datapoint: Datapoint) => (
          /**
           * MarkerF takes a key and positon.
           * when this marker is clicked, handleActiveMarker() and the DataPoint
           * pertaining to this marker/location.
           */
          <MarkerF
            key={datapoint.uid}
            position={{ lat: datapoint.lat, lng: datapoint.lon }}
            onClick={() => handleActiveMarker(datapoint)}
          >
            {/**
             * if this marker is active (means it has been clicked by user), then InfoWindowF component renders.
             * InfoWindowF must be aware of the lat and lng over which it will pop up.
             * when the info window is closed, searchInfo.activeMarker is set to null user is in process
             * of selecting another marker.
             * However, if the select button inside InfoWindowF is clicked, the app will navigate to infoPage
             * and the properties of searchInfo must be set to the default except for the datapoint property.
             */}
            {searchInfo.activeMarker === datapoint.uid ? (
              <InfoWindowF
                position={{ lat: datapoint.lat, lng: datapoint.lon }}
                onCloseClick={() =>
                  setSearchInfo({ ...searchInfo, activeMarker: null })
                }
              >
                <div className="map-route-container-info-window">
                  <p>
                    {datapoint.city},<br />
                    <b>{datapoint.country}</b>
                  </p>
                  <button
                    onClick={() => {
                      setSearchInfo({
                        term: "",
                        zoom: 3,
                        center: { lat: 45.765001, lng: -76.001027 },
                        activeMarker: null,
                        datapoint: datapoint,
                      });
                      navigate("/info-page");
                    }}
                  >
                    Select
                  </button>
                </div>
              </InfoWindowF>
            ) : null}
          </MarkerF>
        ))}
      </GoogleMap>
    </div>
  );
}
