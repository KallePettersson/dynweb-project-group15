import React from "react";
import "./Home.css";
import Header from "./Header";
import SelectionView from "./SelectionView";
import MapView from "./MapView";
function SelectionPresenter() {
  return (
    <div>
      <SelectionView></SelectionView>
    </div>
  );
}

export default SelectionPresenter;
