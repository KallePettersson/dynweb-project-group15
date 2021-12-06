import React, { useState } from "react";
import "./Home.css";
import SelectionView from "./SelectionView";
import SelectionModel, { CATEGORIES } from "../SelectionModel";

function SelectionPresenter(props) {
  return (
    <div className="selectionView">
      <SelectionView
        options={CATEGORIES}
        title="Category"
        model={props.model}
      />
      <button
        className="searchButton"
        onClick={() => props.model.search(props.db, props.metaData)}
      >
        Apply filter!
      </button>
    </div>
  );
}

export default SelectionPresenter;
