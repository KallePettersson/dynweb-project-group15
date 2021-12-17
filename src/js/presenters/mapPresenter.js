import React from "react";
import "../../css/mapPresenter.css";
import { useSelector, useDispatch } from "react-redux";
import DetailsView from "../views/detailsView";
import {Criteria} from "../criteria";
import ColorGradiantPresenter from "./colorGradientPresenter";
import ColorGradientView from "../views/colorGradientView";
import ColorConfig from "../colorConfig";
import DetailsPresenter from "./detailsPresenter";

function MapPresenter() {
  console.log("Num renders");
  const dispatch = useDispatch();
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

  //Dispatches a call to the renderMap function that inserts the map view into the map div
  if(dataFetched){
    dispatch({
      type: "RENDER_MAP",
    });
  }


  return (
    <div className="map-flex">
      <div className="outer-map-container">
        <div className="inner-map-container">

          <div id="map" className="world-map" />
          <ColorGradientView
              minValue={minValue}
              maxValue={maxValue}
              order={colorGradientOrder}
              fills={fills}
          />
        </div>
      </div>
        <DetailsPresenter/>
    </div>
  );
}

export default MapPresenter;
