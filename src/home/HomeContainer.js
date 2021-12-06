import React from "react";
import "./Home.css";
import MapPresenter from "./MapPresenter";
import SelectionPresenter from "./SelectionPresenter";
function HomeContainer(model, db) {
  console.log("model", model.db.Afghanistan);
  console.log("db", db);
  return (
    <div className="wrapper">
      <SelectionPresenter model={model.SelectionModel} db={db} />
      <MapPresenter db={db.getResults()} />
    </div>
  );
}

export default HomeContainer;
