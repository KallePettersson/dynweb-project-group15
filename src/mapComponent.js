import React from "react"
import * as Datamap from 'datamaps'
import * as d3 from 'd3'
import { geoMercator, geoPath, geoGraticule10 } from "d3-geo";
{/* <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.4.11/d3.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/topojson/1.6.9/topojson.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/datamaps/0.5.8/datamaps.world.min.js"></script> */}

class MapComponent extends React.Component {
    constructor(props){
        super(props);
    }


    componentDidMount(){
        var highlightColorHover = '#037582';
        var highlightBorderColor = '#037582';

        var map = new Datamap({
            element: document.getElementById('map'),
            responsive: false,
            fills: this.props.colourConfig.fills,
            data: this.props.data,
            done: this.onClickCountyHook,
            geographyConfig: {
                highlightFillColor: this.props.colourConfig.highlightColorHover,
                highlightBorderColor: this.props.colourConfig.highlightBorderColor,
                popupTemplate: this.popupTemplate,
            },
        //     setProjection: function (element) {
        //         var projection = geoMercator()
        //       .center([-106.3468, 68.1304]) // always in [East Latitude, North Longitude]
        //       .scale(250)
        //       .translate([element.offsetWidth / 2, element.offsetHeight / 2]);

        //       var path = geoPath().projection(projection);
        //       return { path: path, projection: projection };
        //   },
        

        });
        this.setState({
            map
        })
    }

    onClickCountyHook(datamap) {
        datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
            alert(geography.properties.name);
        });
    }


    popupTemplate(geo,data){
        return ['<div class="hoverinfo">',
        '<strong>' + geo.properties.name + '</strong>',
        (data?('<br/>' + data.keyToString[data.currentDataKey] + ' : ' + data[data.currentDataKey].toFixed(2)) : '<br/> No data'), 
        '</div>'].join('');
    }


    render() {
        return <div id="map" className="world-map"></div>;
    }
}

export default MapComponent;