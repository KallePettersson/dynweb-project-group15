import React from "react";
import "./Home.css";
import Header from "./Header";
import MapPresenter from "./MapView";
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
