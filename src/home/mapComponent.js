import React from "react";
import * as Datamap from "datamaps";
import * as d3 from "d3";
import * as d3Geo from "d3-geo";
import * as d3Zoom from "d3-zoom";
import ColorConfig from "../colorConfig";
import { useDispatch, useSelector } from "react-redux";
import store from "../store";
import { Criteria } from "../criteria";
import updateColorGradient from "./colorGradientPresenter";
import "./Home.css";

var globalZoomRef = null; //TODO move this somewhere

function MapComponent(
  countriesData,
  cityData,
  selectedCountry,
  selectedCriteria,
  mapLoaded,
  colorGradientOrder
) {
  const dispatch = useDispatch();
  console.log(
    "mapLoaded",
    colorGradientOrder,
    colorGradientOrder === "ascending"
  );

  // const colorGradientOrder = "descending"

  if (!mapLoaded) {
    let fills = ColorConfig.fills;
    if (colorGradientOrder === "ascending") {
      console.log("reverse");
      fills = ReverseFills(fills);
    }

    // Set mapLoaded flag
    dispatch({
      type: "SET_MAP_LOADED_TRUE",
    });

    //Reset old map data
    const myNode = document.getElementById("map");
    let width = myNode.offsetWidth;
    let height = width / 2;
    myNode.innerHTML = "";

    //Setup main map
    console.log("selectedCountry", selectedCountry);
    var map = new Datamap({
      element: document.getElementById("map"),
      width: width,
      height: height,
      responsive: true,
      aspectRatio: 0.1,
      fills: fills,
      data: countriesData,
      done: onClickCountyHook,
      geographyConfig: {
        highlightFillColor: ColorConfig.highlightColorHover,
        highlightBorderColor: ColorConfig.highlightBorderColor,
        popupTemplate: countryPopupTemplate,
      },
      setProjection: selectedCountry !== "World" ? zoomToCountry : null, //Function set if country-view is selected
    });

    //Render country-view
    if (selectedCountry !== "World") {
      //Draw cities
      console.log("props.cityData", cityData);
      map.bubbles(cityData["cities"], {
        popupTemplate: cityPopupTemplate,
      });

      //Re-color map
      resetAllColorsExcept(map, countriesData, selectedCountry);
    }

    //Add zoom functionality to map
    let mapElem = document.getElementById("map");
    let zoom = d3Zoom
      .zoom()
      .scaleExtent([1, 8])
      .on("zoom", function (event) {
        d3.select(mapElem)
          .select("svg")
          .selectAll("g")
          .selectAll("path")
          .attr("transform", event.transform);
        d3.select(mapElem)
          .select("svg")
          .selectAll("g")
          .selectAll("circle")
          .attr("transform", event.transform);
      });

    d3.select(document.getElementById("map")).select("svg").call(zoom);

    //Add resizing when window changes
    d3.select(window).on("resize", function () {
      map.resize();
    });

    //Ugly solution to access zoomRef for zooming
    globalZoomRef = zoom;

    dispatch({
      type: "SET_MAP_REFERENCE",
      payload: {
        mapReference: map,
      },
    });

    dispatch({
      type: "SET_MAP_ZOOM_REFERENCE",
      payload: {
        mapZoomReference: zoom,
      },
    });
  } else {
    reColorMap();
    updateColorGradient();
  }

  // const criteria = useSelector(
  //     state => state.selectorReducer.criteria
  // );

  // console.log("componenet rerendered", criteria)
  // return <></>
  return (
    <div id="Useless-div?" className="reset-zoom-container">
      <button className="reset-zoom" onClick={ResetMapZooming}>
        Reset Zoom
      </button>
      {/* <button onClick={() => reColorMap(countriesData)}>Re Color map</button> */}
    </div>
  );
}

function ReverseFills(fills) {
  // console.log("reverseFills ", fills)
  // console.log("reverseFills ", Object.values(fills).length-1)
  let res = {};
  let reversedFills = Object.values(fills)
    .slice(0, Object.values(fills).length)
    .reverse();
  Object.assign(
    res,
    ...ColorConfig.colourKeys.map((n, index) => ({ [n]: reversedFills[index] }))
  );
  res["defaultFill"] = fills["defaultFill"];
  // console.log("reverseFills ", res)
  return res;
}

//Reset zoom and dragging on map
function ResetMapZooming() {
  d3.select(document.getElementById("map"))
    .select("svg")
    .transition()
    .duration(750)
    .call(
      globalZoomRef.transform,
      d3Zoom.zoomIdentity,
      d3Zoom
        .zoomTransform(
          d3.select(document.getElementById("map")).select("svg").node()
        )
        .invert([1225 / 2, 700 / 2])
    );
}

function getColourGradient(value) {
  if (value === null) {
    return "defaultFill"; //Default color when data is not available
  }
  // let min = this.metaData[this.metaData.currentDataKey].min;
  // let max = this.metaData[this.metaData.currentDataKey].max;
  let min = 0;
  let max = 100;
  if (value < min) {
    value = min;
  } else if (value >= max) {
    value = max - 0.01; //ugly hack to fix edge case
  }
  let colourIndex = Math.floor((value - min) / ((max - min) / 10));
  return ColorConfig.colourKeys[colourIndex];
}

function reColorMap() {
  console.log("reColorMap");
  // console.log("state from recolor", store.getState())
  // console.log("state from recolor", countriesData)
  let selectedCriteria = store.getState().selectorReducer.criteria;
  let fills =
    store.getState().colorReducer.order === "ascending"
      ? ReverseFills(ColorConfig.fills)
      : ColorConfig.fills;

  let newColors = Object.entries(
    store.getState().countriesReducer.countries
  ).map((country) => {
    let res = {};
    // res[country[0]] = "#f94144"
    // console.log(getColourGradient(country[1][selectedCriteria]))
    if (country[1][selectedCriteria]) {
      res[country[0]] = fills[getColourGradient(country[1][selectedCriteria])];
    } else {
      res[country[0]] = { fillKey: "defaultFill" };
    }
    // res[country[0]] = { "fillKey": country[1]["fillkey"] };
    // console.log(res);
    return res;
  });
  newColors = Object.assign({}, ...newColors);
  console.log(newColors);
  store.getState().mapReducer.mapReference.updateChoropleth(newColors);
}

function resetAllColorsExcept(mapRef, countriesData, countryCode) {
  let newColours = Object.entries(countriesData).map((country) => {
    if (countryCode === country[0]) {
      return null;
    } else {
      let res = {};
      res[country[0]] = { fillKey: "defaultFill" };
      return res;
    }
  });
  newColours = Object.assign({}, ...newColours);
  // console.log(newColours);
  mapRef.updateChoropleth(newColours);
}

function onClickCountyHook(datamap) {
  datamap.svg.selectAll(".datamaps-subunit").on("click", onCountryClicked);
  console.log("hej");
}

function countryPopupTemplate(geo, data) {
  // console.log("data from popuptemplate", data)
  let state = store.getState();
  return [
    '<div class="hoverinfo">',
    "<strong>" + geo.properties.name + "</strong>",
    // (data ? ('<br/>' + data.keyToString[data.currentDataKey] + ' : ' + data[data.currentDataKey].toFixed(2)) : '<br/> No data'),
    data
      ? "<br/>" +
        Criteria[state.selectorReducer.criteria] +
        " : " +
        data[state.selectorReducer.criteria].toFixed(2)
      : "<br/> No data",
    "</div>",
  ].join("");
}

function cityPopupTemplate(geo, data) {
  return [
    '<div class="hoverinfo">',
    "<strong>" + data.city + "</strong>",
    // (data[data.currentDataKey] ? ('<br/>' + data.keyToString[data.currentDataKey] + ' : ' + data[data.currentDataKey].toFixed(2)) : '<br/> No data'),
    "</div>",
  ].join("");
}

function onCountryClicked(geography) {
  console.log(geography);
  alert(geography.id);
  // globalMap.svg.selectAll(".datamaps-subunits").transition().duration(750).attr("transform", "scale(1.5)translate(-106.3468, 68.1304)");
}

function zoomToCountry(element) {
  console.log(element);
  var projection = d3Geo
    .geoMercator()
    .center([10, 62.7667655]) // always in [East Latitude, North Longitude]
    .scale(900)
    .translate([element.offsetWidth / 2, element.offsetHeight / 2]);

  var path = d3Geo.geoPath().projection(projection);
  return { path: path, projection: projection };
}

export default MapComponent;
