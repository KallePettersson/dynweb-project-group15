import React from "react";
import "./Home.css";

import MapPresenter from "./MapPresenter";
import SelectionPresenter from "./SelectionPresenter";
function HomeContainer() {
  return (
    <div className="wrapper">
      <SelectionPresenter />
      <MapPresenter />
    </div>
  );
}

export default HomeContainer;
