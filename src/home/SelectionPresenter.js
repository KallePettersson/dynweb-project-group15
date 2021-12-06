import React, { useState } from "react";
import "./Home.css";
import SelectionView from "./SelectionView";

function SelectionPresenter(model, db) {
  const [state, setState] = useState();
  function setter(selectedCategory) {
    setState(selectedCategory);
  }

  return (
    <div className="selectionView">
      <SelectionView
        options={model.getCategories()}
        title="Category"
        callback={model.setCategory(state)}
      />
      {/* <button className="searchButton" onClick={model.setCategory(state)}>
        Apply filter!
      </button> */}
    </div>
  );
}

export default SelectionPresenter;
