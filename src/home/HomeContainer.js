import React, { useEffect, useState } from "react";
import "./Home.css";
import MapPresenter from "./MapPresenter";
import SelectionPresenter from "./SelectionPresenter";
function HomeContainer(props) {
  const [state, setstate] = useState();
  return (
    <div className="wrapper">
      <SelectionPresenter
        model={props.model}
        db={props.db}
        metaData={props.metaData}
      />
      <button onClick={(e) => setstate(e)}>Click me to rerender!</button>
      <MapPresenter countryData={props.db.db} metaData={props.metaData} />
    </div>
  );
}

export default HomeContainer;
