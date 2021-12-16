import React from "react"
import * as Datamap from 'datamaps'
import * as d3 from 'd3'
import * as d3Geo from "d3-geo";
import * as d3Zoom from "d3-zoom"

var globalZoomRef = null; //TODO move this somewhere

/**
 * The map component renders the actual map inside the div with id=map.
 * The component itself return buttons so that a user can interact with the map.
 * @param {*} props 
 * @returns 
 */
function MapComponent(props) {


    //Reset old map data
    const myNode = document.getElementById("map");
    let width = myNode.offsetWidth
    let height = width/2
    console.log("myNode", myNode.offsetHeight);
    console.log("myNode", myNode.offsetWidth);
    console.log("myNode", height);
    console.log("myNode", width);
    myNode.innerHTML = '';

    //Setup main map
    var map = new Datamap({
        element: document.getElementById('map'),
        width: width,
        height: height,
        responsive: true,
        aspectRatio: 0.1,
        fills: props.colourConfig.fills,
        data: props.countryData,
        done: onClickCountyHook,
        geographyConfig: {
            highlightFillColor: props.colourConfig.highlightColorHover,
            highlightBorderColor: props.colourConfig.highlightBorderColor,
            popupTemplate: countryPopupTemplate,
        },
        setProjection: (props.metaData.countrySelected !== "World" ? zoomToCountry : null) //Function set if country-view is selected

    });

    
    //Render country-view
    if (props.metaData.countrySelected !== "World") {
        
        //Draw cities
        console.log("props.cityData", props.cityData);
        map.bubbles(props.cityData["cities"], {
            popupTemplate: cityPopupTemplate,
        });
        
        //Re-color map
        resetAllColorsExcept(map, props.countryData, props.metaData.countrySelected);
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
    d3.select(window).on('resize', function() {
        map.resize();
    });
    
    //Ugly solution to access zoomRef for zooming
    globalZoomRef = zoom;

    return <div id="Useless-div?">
        <button onClick={() => props.model.testFun("World")}>View Worldmap</button>
        <button onClick={() => props.model.testFun("SWE")}>Select Sweden</button>
        <button onClick={ResetMapZooming}>Reset Zoom</button>
    </div>
}


//Reset zoom and dragging on map
function ResetMapZooming() {
    d3.select(document.getElementById("map")).select('svg').transition().duration(750).call(
        globalZoomRef.transform,
        d3Zoom.zoomIdentity,
        d3Zoom.zoomTransform(d3.select(document.getElementById("map")).select('svg').node()).invert([1225 / 2, 700 / 2])
    );
}


function resetAllColorsExcept(mapRef, countryData, countryCode) {
    let newColours = Object.entries(countryData).map(country => {
        console.log(country[1]);
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





function onClickCountyHook(datamap) {
    datamap.svg.selectAll('.datamaps-subunit').on('click', onCountryClicked);
}




function countryPopupTemplate(geo, data) {
    return ['<div class="hoverinfo">',
        '<strong>' + geo.properties.name + '</strong>',
        (data ? ('<br/>' + data.keyToString[data.currentDataKey] + ' : ' + data[data.currentDataKey].toFixed(2)) : '<br/> No data'),
        '</div>'].join('');
}


function cityPopupTemplate(geo, data) {
    return ['<div class="hoverinfo">',
        '<strong>' + data.city + '</strong>',
        (data[data.currentDataKey] ? ('<br/>' + data.keyToString[data.currentDataKey] + ' : ' + data[data.currentDataKey].toFixed(2)) : '<br/> No data'),
        '</div>'].join('');
}



function onCountryClicked(geography) {
    console.log(geography);
    alert(geography.properties.name);
    // globalMap.svg.selectAll(".datamaps-subunits").transition().duration(750).attr("transform", "scale(1.5)translate(-106.3468, 68.1304)");
}

function zoomToCountry(element) {
    console.log(element);
    var projection = d3Geo.geoMercator()
        .center([10, 62.7667655]) // always in [East Latitude, North Longitude]
        .scale(900)
        .translate([element.offsetWidth / 2, element.offsetHeight / 2]);

    var path = d3Geo.geoPath().projection(projection);
    return { path: path, projection: projection };
}


export default MapComponent;
