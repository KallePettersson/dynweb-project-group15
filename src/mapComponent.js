import React from "react"
import * as Datamap from 'datamaps'
// import * as d3 from 'd3'
{/* <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.4.11/d3.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/topojson/1.6.9/topojson.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/datamaps/0.5.8/datamaps.world.min.js"></script> */}

class MapComponent extends React.Component {
    constructor(props){
        super(props);
    }


    componentDidMount(){
        var defaultColor = '#c3c3c3';
        var activeColor = '#00b3c6';
        var highlightColorHover = '#037582';
        var highlightBorderColor = '#037582';

        var map = new Datamap({
            element: document.getElementById('map'),
            responsive: false,
            height: 600,
            width: 900,
            fills: {
                ZERO:"#5EFF5Bff",
                ONE:"#6FEC5Aff",
                TWO:"#81D95Aff",
                THREE:"#92C659ff",
                FOUR:"#A3B358ff",
                FIVE:"#B5A158ff",
                SIX:"#C68E57ff",
                SEVEN:"#D77B56ff",
                EIGHT:"#E96856ff",
                NINE:"#FA5555f",
                defaultFill: defaultColor
            },
            data: this.props.data,
            geographyConfig: {
                highlightFillColor: highlightColorHover,
                highlightBorderColor: highlightBorderColor,
                popupTemplate: this.popupTemplate,
            },
        });
        this.setState({
            map
        })
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