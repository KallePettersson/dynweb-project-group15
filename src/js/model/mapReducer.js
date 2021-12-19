import * as Datamap from "datamaps";
import * as d3 from "d3";
import * as d3Geo from "d3-geo";
import * as d3Zoom from "d3-zoom"
import store from "./store";
import {Criteria} from "../criteria"
import {getColorGradient, ColorConfig} from "../colorConfig";

const initialState = {
    mapLoaded: false,
    mapReference: null,
    mapZoomReference: null,
}

const reducer = (state = initialState, action, globalState) => {
    switch (action.type) {
        case "SET_MAP_LOADED_TRUE":
            return {
                ...state,
                mapLoaded: true
            }
        case "SET_MAP_LOADED_FALSE":
            return {
                ...state,
                mapLoaded: false
            }
        case "SET_MAP_REFERENCE":
            return {
                ...state,
                mapReference: action.payload.mapReference
            }
        case "SET_MAP_ZOOM_REFERENCE":
            return {
                ...state,
                mapZoomReference: action.payload.mapZoomReference
            }
        case "RENDER_MAP":
            return renderMap(state, globalState);
        case "RESET_MAP_ZOOMING":
            return ResetMapZooming(state);
        default:
            return state
    }
}


/**
 * Renders the map view
 * @param state
 * @param globalState
 * @returns {*|(*&{mapReference, mapZoomReference, mapLoaded: boolean})}
 */
function renderMap(state, globalState) {

    let countriesData = globalState.countriesReducer.countries;
    let cityData = globalState.citiesReducer.cities;
    let selectedCountry = globalState.selectorReducer.country;
    let mapLoaded = state.mapLoaded
    let colorGradientOrder = globalState.colorReducer.order;

    if (!mapLoaded) {

        //Determine in which orders the colors should be applied to the map, descending by default
        let fills = colorGradientOrder === "ascending" ? ColorConfig.ascendingFills : ColorConfig.descendingFills;

        //Reset old map data
        const myNode = document.getElementById("map");
        let width = myNode.offsetWidth
        let height = width / 2
        myNode.innerHTML = '';

        //Setup main map
        var map = new Datamap({
            element: myNode,
            width: width,
            height: height,
            responsive: true,
            aspectRatio: 0.1,
            fills: fills,
            data: countriesData,
            done: onClickCountyHook,
            geographyConfig: {
                // highlightFillColor: ColorConfig.highlightColorHover,
                highlightBorderColor: ColorConfig.highlightBorderColor,
                popupTemplate: countryPopupTemplate,
            },
            setProjection: (selectedCountry !== "World" ? zoomToCountry : null) //Function set if country-view is selected

        });


        //Render country-view
        if (selectedCountry !== "World") {

            //Draw cities
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


        return {
            ...state,
            mapLoaded: true,
            mapReference: map,
            mapZoomReference: zoom,
        }
    } else {
        reColorMap(globalState);
        // updateColorGradient(store.dispatch, countriesData, globalState.selectorReducer.criteria); //Not allowed here
    }

    return {
        ...state,
    }
}

// Reset zoom and dragging on map
function ResetMapZooming(state) {

    if (state.mapZoomReference) {
        d3.select(document.getElementById("map"))
            .select("svg")
            .transition()
            .duration(750)
            .call(
                state.mapZoomReference.transform,
                d3Zoom.zoomIdentity,
                d3Zoom
                    .zoomTransform(
                        d3.select(document.getElementById("map")).select("svg").node()
                    )
                    .invert([1225 / 2, 700 / 2])
            );
    }

    return state;
}


/**
 * Recolor the entire map, used after the chosen criteria has changed
 * @param globalState
 */
function reColorMap(globalState) {

    let selectedCriteria = globalState.selectorReducer.criteria
    let fills = globalState.colorReducer.order === "ascending" ? ColorConfig.ascendingFills : ColorConfig.descendingFills;

    let newColors = Object.entries(globalState.countriesReducer.countries).map(country => {
        let res = {};
        if (country[1][selectedCriteria]) {
            res[country[0]] = fills[getColorGradient(
                country[1][selectedCriteria],
                globalState.colorReducer.minValue,
                globalState.colorReducer.maxValue)]
        } else {
            res[country[0]] = {"fillKey": "defaultFill"};
        }
        return res
    })
    newColors = Object.assign({}, ...newColors);
    globalState.mapReducer.mapReference.updateChoropleth(newColors);
}

/**
 * Reset all the country colors except the selected country.
 * @param mapRef
 * @param countriesData
 * @param countryCode
 */
function resetAllColorsExcept(mapRef, countriesData, countryCode) {
    let newColours = Object.entries(countriesData).map(country => {
        if (countryCode === country[0]) {
            return null;
        } else {
            let res = {};
            res[country[0]] = {"fillKey": "defaultFill"};
            return res
        }
    })
    newColours = Object.assign({}, ...newColours);
    mapRef.updateChoropleth(newColours);
}


function onClickCountyHook(datamap) {
    datamap.svg.selectAll(".datamaps-subunit").on("click", onCountryClicked);
}

/**
 * Popup banner for when a country is hovered
 * @param geo
 * @param data
 * @returns {string}
 */
function countryPopupTemplate(geo, data) {
    let state = store.getState();
    // store.dispatch({
    //     type:"UPDATE_COUNTRY_HOVERED",
    //     payload: {
    //         countryHovered:geo.id,
    //     }
    // })

    return ['<div class="hoverinfo">',
        '<strong>' + geo.properties.name + '</strong>',
        (data ? ('<br/>' + Criteria[state.selectorReducer.criteria] + ' : ' + data[state.selectorReducer.criteria].toFixed(2)) : '<br/> No data'),
        '</div>'].join('');
}


/**
 * Popup banner for when a city is hovered
 * @param geo
 * @param data
 * @returns {string}
 */
function cityPopupTemplate(geo, data) {
    return ['<div class="hoverinfo">',
        '<strong>' + data.city + '</strong>',
        // (data[data.currentDataKey] ? ('<br/>' + data.keyToString[data.currentDataKey] + ' : ' + data[data.currentDataKey].toFixed(2)) : '<br/> No data'),
        '</div>'].join('');
}

function onCountryClicked(geography) {
    // alert(geography.id);

    //Code to trigger rerendering of map with country view
    // store.dispatch({
    //     type: "SELECT_COUNTRY",
    //     payload: {
    //         country: geography.id
    //     }
    // })
    // store.dispatch({
    //     type: "SET_MAP_LOADED_FALSE",
    // })
}

/**
 * Zoom into a given country (not finished)
 */
function zoomToCountry(element) {
    var projection = d3Geo
        .geoMercator()
        .center([10, 62.7667655]) // always in [East Latitude, North Longitude]
        .scale(900)
        .translate([element.offsetWidth / 2, element.offsetHeight / 2]);

    var path = d3Geo.geoPath().projection(projection);
    return {path: path, projection: projection};
}

export default reducer;