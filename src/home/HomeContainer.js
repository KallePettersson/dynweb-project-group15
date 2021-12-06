import React from "react";
import "./Home.css";
import MapPresenter from "./MapPresenter";
import SelectionPresenter from "./SelectionPresenter";
function HomeContainer(props) {
  return (
    <div className="wrapper">
      <SelectionPresenter model={props.model} db={props.db } metaData={props.metaData}/>
      <MapPresenter countryData={props.db.db} metaData={props.metaData} />
    </div>
  );
}

export default HomeContainer;
