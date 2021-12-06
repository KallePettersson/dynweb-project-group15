class MetaDataModel {
  constructor() {
    this.currentDataKey = "crime_index"; //Current category being displayed
    this.keyToString = {
      crime_index: "Crime Index",
      climate_index: "Climate Index",
      cpi_index: "Cpi Index",
    };
    this.crime_index = {
      max: 100,
      min: 0,
    };
    this.climate_index = {
      max: 100,
      min: 0,
    };
    this.cpi_index = {
      max: 100,
      min: 0,
    };
    //One of these for each option we want to visualize
  }

  setCurrentDataKey(key) {
    this.currentDataKey = key;
  }
}

export default MetaDataModel;
