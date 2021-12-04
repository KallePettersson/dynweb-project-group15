import React from "react";
import "./Home.css";
import Header from "./Header";
import SelectionView from "./SelectionView";
import MapView from "./MapView";
function HomePresenter() {
  return (
    <div className="wrapper">
      <Header></Header>
      <SelectionView></SelectionView>
      <MapView></MapView>
    </div>
  );
}

export default HomePresenter;
