import React from "react";
import MapComponent from "./mapComponent";
import ColorGradientComponent from "./colorGradientComponent";
import * as d3 from "d3";
import "./mapPresenter.css";
import PromiseNoData from "./promieNoData";
import SelectorView from "./SelectionView";
import { CATEGORIES } from "../SelectionModel";
import DetailsView from "./DetailsView";

function MapPresenter(props) {
  console.log("Num renders");
  //Setup states
  const [promise, setPromise] = React.useState(null);
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);

  //Init mapComponent

  React.useEffect(() => {
    setPromise(
      props.model
        .fetchGlobalData()
        .then((data) => setData(data))
        .catch((error) => setError(error))
    );
  }, []);

  //Reset old model hook
  props.model.removeObserver(function tmp() {
    setPromise(
      props.model
        .fetchGlobalData()
        .then((data) => setData(data))
        .catch((error) => setError(error))
    );
  });

  //Add observer hook to model
  props.model.addObserver(function tmp() {
    setPromise(
      props.model
        .fetchGlobalData()
        .then((data) => setData(data))
        .catch((error) => setError(error))
    );
  });

  return (
    <div className="map-flex ">
      <div className="outer-map-container">
        <div className="inner-map-container">
          {PromiseNoData(promise, data, error) || (
            <MapComponent
              model={props.model}
              countryData={data.countryData}
              cityData={data.cityData}
              colourConfig={data.colourConfig}
              metaData={data.metaData}
            />
          )}
          <div id="map" className="world-map"></div>
          {PromiseNoData(promise, data, error, true) || (
            <ColorGradientComponent
              metaData={data.metaData}
              colourConfig={data.colourConfig}
            />
          )}
        </div>
      </div>
      {PromiseNoData(promise, data, error, true) || (
        <DetailsView
          countryData={data.countryData}
          metaData={data.metaData.countrySelected}
        ></DetailsView>
      )}
    </div>
  );
}

export default MapPresenter;
