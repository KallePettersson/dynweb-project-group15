import React, { useEffect, useState } from "react";
import "./Home.css";
import MapPresenter from "./MapPresenter";
import SelectionPresenter from "./SelectionPresenter";
function HomeContainer(props) {

  return (
    <div className="wrapper">
      <SelectionPresenter
        model={props.model}
        db={props.db}
        metaData={props.metaData}
      />
      
      <MapPresenter model = {props.model} />
    </div>
  );
}

export default HomeContainer;
