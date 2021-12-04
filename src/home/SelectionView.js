import React from "react";
import "./Home.css";
import Selector from "./Selector";
function SelectionView() {
  return (
    <div className="selectionView">
      <Selector title="Country"></Selector>
      <Selector title="Year"></Selector>
      <Selector title="Category"></Selector>
      <button className="searchButton">Search</button>
    </div>
  );
}

export default SelectionView;
