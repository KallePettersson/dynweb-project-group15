import ApiHandler from "./api-handler";
import { COUNTRIES } from "./SelectionModel";

class DBCountriesModel {
  /**
   * Will create a local database that holds the data of each country
   */
  constructor() {
    // A list of results for each country
    let results = {};
    for (let i in COUNTRIES) {
      ApiHandler.getCountryIndices(COUNTRIES[i]).then(
        (result) => (results[COUNTRIES[i]] = result)
      );
    }
    this.db = results;
  }
  getResults() {
    return this.db;
  }
}

export default DBCountriesModel;
