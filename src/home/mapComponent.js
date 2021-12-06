import React from "react"
import * as Datamap from 'datamaps'
import * as d3 from 'd3'
import { geoMercator, geoPath, geoGraticule10 } from "d3-geo";

{/* <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.4.11/d3.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/topojson/1.6.9/topojson.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/datamaps/0.5.8/datamaps.world.min.js"></script> */}

var globalMap = null; //Could declare global map ref, state doesnt seem to work very well


class MapComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            map:null,
        };
    }


    componentDidMount(){

        var map1 = new Datamap({
            element: document.getElementById('map'),
            responsive: false,
            fills: this.props.colourConfig.fills,
            data: this.props.countryData,
            done: this.onClickCountyHook,
            geographyConfig: {
                highlightFillColor: this.props.colourConfig.highlightColorHover,
                highlightBorderColor: this.props.colourConfig.highlightBorderColor,
                popupTemplate: countryPopupTemplate,
            },
            setProjection: (this.props.metaData.countrySelected !== "World"?zoomToCountry:null) //Only set projection function if a country is selected
        
    });

        if(this.props.metaData.countrySelected !== "World"){

            //Re-color map
            this.resetAllColorsExcept(map1, this.props.metaData.countrySelected);
            
            //Draw cities
            map1.bubbles(this.props.cityData["cities"], {
                popupTemplate: cityPopupTemplate,
            });
        }

        // console.log(map1);
        this.setState({
            map:map1,
        })
        // console.log(this.state);
        globalMap = map1;
    }

    onClickCountyHook(datamap) {
        datamap.svg.selectAll('.datamaps-subunit').on('click', onCountryClicked);
    }

    resetAllColorsExcept(mapRef, countryCode){
        console.log(this.props.countryData);
        let newColours = Object.entries(this.props.countryData).map(country => {
            if(countryCode === country[0] ){
                return null;
            } else{
                let res = {};
                res[country[0]] = {"fillKey": "defaultFill"};
                return res
            } 
        })
        newColours = Object.assign({}, ...newColours);
        // console.log(newColours);
        mapRef.updateChoropleth(newColours);
    }

    


    render() {
        return <div id="map" className="world-map"></div>;
    }
}



function countryPopupTemplate(geo,data){
    return ['<div class="hoverinfo">',
    '<strong>' + geo.properties.name + '</strong>',
    (data?('<br/>' + data.keyToString[data.currentDataKey] + ' : ' + data[data.currentDataKey].toFixed(2)) : '<br/> No data'), 
    '</div>'].join('');
}


function cityPopupTemplate(geo, data) {
    return ['<div class="hoverinfo">',
    '<strong>' + data.city + '</strong>',
    (data[data.currentDataKey]?('<br/>' + data.keyToString[data.currentDataKey] + ' : ' + data[data.currentDataKey].toFixed(2)) : '<br/> No data'), 
    '</div>'].join('');
}



function onCountryClicked(geography) {
    console.log(geography);
    alert(geography.properties.name);
    // globalMap.svg.selectAll(".datamaps-subunits").transition().duration(750).attr("transform", "scale(1.5)translate(-106.3468, 68.1304)");
}

function zoomToCountry(element) {
    var projection = geoMercator()
  .center([10, 62.7667655]) // always in [East Latitude, North Longitude]
  .scale(900)
  .translate([element.offsetWidth / 2, element.offsetHeight / 2]);

  var path = geoPath().projection(projection);
  return { path: path, projection: projection };
}


export default MapComponent;
