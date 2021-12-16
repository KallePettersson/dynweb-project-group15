import React from "react";
import * as Datamap from "datamaps";
import * as d3 from "d3";
import * as d3Geo from "d3-geo";
import * as d3Zoom from "d3-zoom"
import ColorConfig from "../colorConfig";
import { useDispatch, useSelector } from "react-redux";
import store from "../store";

var globalZoomRef = null; //TODO move this somewhere

function MapComponent(countriesData, cityData, selectedCountry, selectedCriteria, mapLoaded) {
    const dispatch = useDispatch();
    console.log("mapLoaded", mapLoaded)

    // Set mapLoaded flag
    dispatch({
        type: "SET_MAP_LOADED_TRUE",
    });

    //Reset old map data
    const myNode = document.getElementById("map");
    let width = myNode.offsetWidth
    let height = width / 2
    // console.log("myNode", myNode.offsetHeight);
    // console.log("myNode", myNode.offsetWidth);
    // console.log("myNode", height);
    // console.log("myNode", width);
    myNode.innerHTML = '';

    //Setup main map
    console.log("selectedCountry", selectedCountry)
    var map = new Datamap({
        element: document.getElementById('map'),
        width: width,
        height: height,
        responsive: true,
        aspectRatio: 0.1,
        fills: ColorConfig.fills,
        data: countriesData,
        done: onClickCountyHook,
        geographyConfig: {
            highlightFillColor: ColorConfig.highlightColorHover,
            highlightBorderColor: ColorConfig.highlightBorderColor,
            popupTemplate: countryPopupTemplate,
        },
        setProjection: (selectedCountry !== "World" ? zoomToCountry : null) //Function set if country-view is selected

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
    let mapElem = document.getElementById("map")
    let zoom = d3Zoom.zoom()
        .scaleExtent([1, 8])
        .on("zoom", function (event) {
            d3.select(mapElem).select('svg').selectAll('g').selectAll('path').attr("transform", event.transform);
            d3.select(mapElem).select('svg').selectAll('g').selectAll('circle').attr("transform", event.transform);
        })

    d3.select(document.getElementById("map")).select('svg').call(zoom);

    //Add resizing when window changes
    d3.select(window).on('resize', function () {
        map.resize();
    });

    //Ugly solution to access zoomRef for zooming
    globalZoomRef = zoom;

    dispatch({
        type: "SET_MAP_REFERENCE",
        payload: {
            mapReference: map,
        }
    });

    dispatch({
        type: "SET_MAP_ZOOM_REFERENCE",
        payload: {
            mapZoomReference: zoom,
        }
    });



    // const criteria = useSelector(
    //     state => state.selectorReducer.criteria
    // );

    // console.log("componenet rerendered", criteria)
    // return <></>
    return <div id="Useless-div?">
        <button onClick={ResetMapZooming}>Reset Zoom</button>
        <button onClick={() => reColorMap(countriesData)}>Re Color map</button>
    </div>
  );
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


function resetAllColorsExcept(mapRef, countriesData, countryCode) {
    let newColours = Object.entries(countriesData).map(country => {
        if (countryCode === country[0]) {
            return null;
        } else {
            let res = {};
            res[country[0]] = { "fillKey": "defaultFill" };
            return res
        }
    })
    newColours = Object.assign({}, ...newColours);
    // console.log(newColours);
    mapRef.updateChoropleth(newColours);
}


function reColorMap(countriesData) {
    console.log("state from recolor", store.getState().countriesReducer.countries)
    console.log("state from recolor", countriesData)
    let newColors = Object.entries(store.getState().countriesReducer.countries).map(country => {
        let res = {};
        res[country[0]] = { "fillKey": country[1]["fillkey"] };
        // res[country[0]] = { "fillKey":'#c3c3c3'};

        return res
    })
    newColors = Object.assign({}, ...newColors);
    console.log(newColors);
    store.getState().mapReducer.mapReference.updateChoropleth(newColors);
}





function onClickCountyHook(datamap) {
  datamap.svg.selectAll(".datamaps-subunit").on("click", onCountryClicked);
  console.log("hej");
}

function countryPopupTemplate(geo, data) {
    // console.log("data from popuptemplate", data)
    return ['<div class="hoverinfo">',
        '<strong>' + geo.properties.name + '</strong>',
        // (data ? ('<br/>' + data.keyToString[data.currentDataKey] + ' : ' + data[data.currentDataKey].toFixed(2)) : '<br/> No data'),
        (data ? ('<br/>' + data.keyToString[data.currentDataKey] + ' : ' + data[data.currentDataKey].toFixed(2)) : '<br/> No data'),
        '</div>'].join('');
}

function cityPopupTemplate(geo, data) {
    return ['<div class="hoverinfo">',
        '<strong>' + data.city + '</strong>',
        // (data[data.currentDataKey] ? ('<br/>' + data.keyToString[data.currentDataKey] + ' : ' + data[data.currentDataKey].toFixed(2)) : '<br/> No data'),
        '</div>'].join('');
}

function onCountryClicked(geography) {
  console.log(geography);
  alert(geography.properties.name);
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
