import ApiHandler from "./api-handler";
import {COUNTRIES} from "./SelectionModel";

class DBCountriesModel {
    /**
     * Will create a local database that holds the data of each country
     */
    constructor() {
        // A list of results for each country
        let results = {}
        Object.keys(COUNTRIES)
            .forEach((key) => ApiHandler.getCountryIndices(COUNTRIES[key])
                .then((result) => results[key] = result))
        this.db = results;
    }
}

export default DBCountriesModel;
