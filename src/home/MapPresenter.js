import React from "react";
import MapComponent from "./mapComponent";
import ColorGradientComponent from "./colorGradientComponent";
import "./mapPresenter.css";

class MapPresenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colourConfig: {
        colourKeys: [
          "ZERO",
          "ONE",
          "TWO",
          "THREE",
          "FOUR",
          "FIVE",
          "SIX",
          "SEVEN",
          "EIGHT",
          "NINE",
        ],
        fills: {
          ZERO: "#5EFF5Bff",
          ONE: "#6FEC5Aff",
          TWO: "#81D95Aff",
          THREE: "#92C659ff",
          FOUR: "#A3B358ff",
          FIVE: "#B5A158ff",
          SIX: "#C68E57ff",
          SEVEN: "#D77B56ff",
          EIGHT: "#E96856ff",
          NINE: "#FA5555ff",
          defaultFill: "#c3c3c3",
        },
        highlightColorHover: "#037582",
        highlightBorderColor: "#037582",
      },
      //Data below should be replaced with data from props, dummy data for now.
      //metaData:this.props.model.metaData ?
      //currentDataKey:this.props.model.currentDataKey ?
      //countryData:this.props.model.countryData ?
      metaData: {
        currentDataKey: "crime_index", //Current category being displayed
        keyToString: {
          crime_index: "Crime Index",
          climate_index: "Climate Index",
        },
        crime_index: {
          max: 100,
          min: 0,
        },
        climate_index: {
          max: 100,
          min: 0,
        },
        //One of these for each option we want to visualize
      },
      countryData: {
        SWE: {
          crime_index: 48.972638040217525,
          traffic_time_index: 29.40772532188841,
          cpi_and_rent_index: 49.87271301435428,
          purchasing_power_incl_rent_index: 97.36297313340259,
          restaurant_price_index: 72.59204391171875,
          property_price_to_income_ratio: 7.836507922383823,
          contributors_cost_of_living: 1480,
          contributors_healthcare: 408,
          climate_index: 74.92075987514174,
          safety_index: 51.027361959782475,
          traffic_co2_index: 2383.682403433476,
          cpi_index: 71.15189880255622,
          traffic_inefficiency_index: 135.52015718648167,
          contributors_traffic: 242,
          quality_of_life_index: 174.98785887578714,
          rent_index: 25.693250920853927,
          contributors_pollution: 431,
          health_care_index: 68.74972597269964,
          contributors_crime: 2274,
          traffic_index: 99.13439539305195,
          groceries_index: 65.0377424473812,
          name: "Sweden",
          contributors_property: 396,
          pollution_index: 18.433391862012876,
        },
        USA: {
          crime_index: 48.0419452106151,
          traffic_time_index: 32.8738865745154,
          cpi_and_rent_index: 56.68056049305239,
          purchasing_power_incl_rent_index: 106.69913527598018,
          restaurant_price_index: 70.23326556865034,
          property_price_to_income_ratio: 3.9874026727339844,
          contributors_cost_of_living: 27995,
          contributors_healthcare: 5000,
          climate_index: 77.43838794879277,
          safety_index: 51.9580547893849,
          traffic_co2_index: 7305.818646107403,
          cpi_index: 69.73987458267287,
          traffic_inefficiency_index: 242.1618610658239,
          contributors_traffic: 6529,
          quality_of_life_index: 168.06233050511867,
          rent_index: 41.84130897562975,
          contributors_pollution: 5000,
          health_care_index: 69.04952056285289,
          contributors_crime: 14160,
          traffic_index: 151.39754846511244,
          groceries_index: 69.38488612434237,
          name: "United States",
          contributors_property: 11634,
          pollution_index: 39.94593268466846,
        },
        RUS: {
          crime_index: 39.68063974502552,
          traffic_time_index: 44.60775254502741,
          cpi_and_rent_index: 25.566241130386707,
          purchasing_power_incl_rent_index: 37.767470137799414,
          restaurant_price_index: 35.83197745647355,
          property_price_to_income_ratio: 14.890124151008195,
          contributors_cost_of_living: 2388,
          contributors_healthcare: 1302,
          climate_index: 45.39040718625444,
          safety_index: 60.319360254974484,
          traffic_co2_index: 4358.438997650743,
          cpi_index: 36.18376083260287,
          traffic_inefficiency_index: 189.92010709154954,
          contributors_traffic: 1384,
          quality_of_life_index: 101.69373795081746,
          rent_index: 13.501591771994972,
          contributors_pollution: 1490,
          health_care_index: 58.90163119423096,
          contributors_crime: 2556,
          traffic_index: 181.8908397794631,
          groceries_index: 30.42521065763956,
          name: "Russia",
          contributors_property: 981,
          pollution_index: 62.17701289717685,
        },
      },
    };

    this.setupForEachDataPoint(); // Should probably be propped down to
  }

  getColourGradient(value) {
    let min = this.state.metaData[this.state.metaData.currentDataKey].min;
    let max = this.state.metaData[this.state.metaData.currentDataKey].max;
    if (value < min) {
      value = min;
    } else if (value > max) {
      value = max;
    }
    let colourIndex = Math.floor((value - min) / ((max - min) / 10));
    // console.log(min, value, max, colourIndex);
    return this.state.colourConfig.colourKeys[colourIndex];
  }

  setupForEachDataPoint() {
    var dataPoints = this.state.countryData;
    var newData = Object.entries(dataPoints).map((country) => {
      country[1].fillKey = this.getColourGradient(
        country[1][this.state.metaData.currentDataKey]
      ); // Set colour for given country
      // Extra data needed for popup
      country[1].currentDataKey = this.state.metaData.currentDataKey;
      country[1].keyToString = this.state.metaData.keyToString;
      var key = country[0];
      var value = country[1];
      return { key: value };
    });
    console.log(dataPoints);
    this.setState({
      countryData: newData,
    });
    console.log(this.state.countryData);
  }

  render() {
    // return <MapComponent data={this.state.countryData}/>
    return (
      <div className="outer-map-container">
        {/*  <h1>Map Component title</h1> */}
        {/* Dont use any other title than h1, some weird bug */}
        <div className="inner-map-container">
          <ColorGradientComponent
            metaData={this.state.metaData}
            colourConfig={this.state.colourConfig}
          />
          <MapComponent
            data={this.props.db.results} // results from DBmodel
            colourConfig={this.state.colourConfig}
          />
        </div>
      </div>
    );
  }
}

export default MapPresenter;
