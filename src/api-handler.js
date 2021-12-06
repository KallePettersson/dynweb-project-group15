import apiConfig from './api-config.json';

const ApiHandler = {   // JS object creation literal
    defaultApiCall(endpoint, params = null) {
        return fetch(apiConfig.BASE_URL + endpoint + "?api_key=" + apiConfig.API_KEY + params, {
            "method": "GET",              // HTTP method
        })
            // from HTTP response headers to HTTP response data
            .then(response => response.json());

    },
    getCities(countryCode = null) {

        return this.defaultApiCall("/cities", "&country=" + countryCode)
            .then(data => console.log(data));
    },
    /**
     * Will return a dictionary containing different values for the given country.
     *
     * @param country The selected country.
     * @return {Promise<any>} The data of the selected country as a dictionary.
     */
    getCountryIndices(country) {
        return this.defaultApiCall("/country_indices", "&country=" + country)
    }
};


export default ApiHandler;
