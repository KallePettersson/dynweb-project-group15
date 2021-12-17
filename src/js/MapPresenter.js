import React from "react";
import MapComponent from "./mapComponent";
import "../css/mapPresenter.css";
import { useSelector } from "react-redux";
import DetailsView from "./DetailsView";
import {Criteria} from "./criteria";
import ColorGradiantPresenter from "./presenters/colorGradientPresenter";
import ColorGradientView from "./views/colorGradientView";
import {min} from "d3";
import ColorConfig from "./colorConfig";

function MapPresenter() {
  console.log("Num renders");

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

  const colorGradientOrder = useSelector(
      state => state.colorReducer.order
  );

  const minValue = useSelector(
      state => state.colorReducer.minValue
  )
  const maxValue = useSelector(
      state => state.colorReducer.maxValue
  )

  let fills = colorGradientOrder === "ascending" ? Object.entries(ColorConfig.fills).reverse() : Object.entries(ColorConfig.fills)



  return (
    <div className="map-flex">
      <div className="outer-map-container">
        <div className="inner-map-container">
          {dataFetched ? (
            MapComponent(
              countriesData,
              null,
              selectedCountry,
              selectedCriteria,
              mapLoaded,
              colorGradientOrder
            )
          ) : (
            <div>test</div>
          )}
          <div id="map" className="world-map" />
          <ColorGradientView
              minValue={minValue}
              maxValue={maxValue}
              order={colorGradientOrder}
              fills={fills}
          />
          {/*<ColorGradiantPresenter/>*/}
          {/*<ColorGradientView />*/}
        </div>
      </div>
      <div>
        <DetailsView countryData={countriesData} metaData={Criteria} />
      </div>
    </div>
  );
}

export default MapPresenter;
