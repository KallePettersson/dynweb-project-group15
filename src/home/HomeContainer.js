import React, { useEffect, useState } from "react";
import DetailsView from "./DetailsView";
import "./Home.css";
import MapPresenter from "./MapPresenter";
import SelectionPresenter from "./SelectionPresenter";
import PromiseNoData from "./promieNoData";
import IndexView from "./IndexView";
function HomeContainer(props) {
  //temporary data

  const [promise, setPromise] = React.useState(null);
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);

  //Init mapComponent

  React.useEffect(() => {
    setPromise(
      props.model
        .fetchGlobalData()
        .then((data) => setData(data))
        .catch((error) => setError(error))
    );
  }, []);

  //Reset old model hook
  props.model.removeObserver(function tmp() {
    setPromise(
      props.model
        .fetchGlobalData()
        .then((data) => setData(data))
        .catch((error) => setError(error))
    );
  });

  //Add observer hook to model
  props.model.addObserver(function tmp() {
    setPromise(
      props.model
        .fetchGlobalData()
        .then((data) => setData(data))
        .catch((error) => setError(error))
    );
  });
  return (
    <div className="wrapper">
      <SelectionPresenter
        model={props.model}
        db={props.db}
        metaData={props.metaData}
      />

      <MapPresenter model={props.model} />
    </div>
  );
}

export default HomeContainer;
