import React from "react";
import MapComponent from "./mapComponent";
import ColorGradientComponent from "./colorGradientComponent";
import * as d3 from "d3";
import "./mapPresenter.css";
import PromiseNoData from "./promieNoData";
import { useSelector } from "react-redux";
import DetailsView from "./DetailsView";
import Criteria from "../criteria";

function MapPresenter(props) {
  console.log("Num renders");

  // //Setup states
  // const [promise, setPromise] = React.useState(null);
  // const [data, setData] = React.useState(null);
  // const [error, setError] = React.useState(null);
  //
  // //Init mapComponent
  //
  // React.useEffect(() => {
  //     setPromise(
  //         props.model.fetchGlobalData()
  //             .then((data) => setData(data))
  //             .catch((error) => setError(error))
  //     );
  // }, []);

  const countriesData = useSelector(
    (state) => state.countriesReducer.countries
  );
  const selectedCountry = useSelector((state) => state.selectorReducer.country);

  const selectedCriteria = useSelector(
    (state) => state.selectorReducer.criteria
  );

  const mapLoaded = useSelector((state) => state.mapReducer.mapLoaded);

  const dataFetched = useSelector(
    (state) => state.countriesReducer.dataFetched
  );

  return (
    <div className="space-between">
      <div className="outer-map-container">
        <div className="inner-map-container">
          {/*{PromiseNoData(promise, data, error) ||*/}
          {/*    (<MapComponent model={props.model} countryData={data.countryData} cityData={data.cityData} colourConfig={data.colourConfig} metaData={data.metaData} />*/}
          {/*    )}*/}
          {/*<div id="map" className="world-map"></div>*/}
          {/*{PromiseNoData(promise, data, error, true) ||*/}
          {/*    (*/}
          {/*        <ColorGradientComponent*/}
          {/*            metaData={data.metaData}*/}
          {/*            colourConfig={data.colourConfig}*/}
          {/*        />*/}
          {/*    )}*/}

          {dataFetched ? (
            MapComponent(
              countriesData,
              null,
              selectedCountry,
              selectedCriteria,
              mapLoaded
            )
          ) : (
            <div>test</div>
          )}
          <div id="map" className="world-map" />
          {/*<ColorGradientComponent*/}
          {/*        metaData={data.metaData}*/}
          {/*        colourConfig={data.colourConfig}/>*/}
        </div>
      </div>
      <div>
        <DetailsView
          countryData={countriesData}
          metaData={Criteria}
        ></DetailsView>
      </div>
    </div>
  );
}

export default MapPresenter;
