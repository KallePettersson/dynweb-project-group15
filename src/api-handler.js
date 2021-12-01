import apiConfig from './api-config.json';
const ApiHandler = {   // JS object creation literal
    defaultApiCall(endpoint, params=null){
        return fetch(apiConfig.BASE_URL + endpoint + "?api_key=" + apiConfig.API_KEY + params, {
            "method": "GET",              // HTTP method
        })
            // from HTTP response headers to HTTP response data
            .then(response => response.json());
        
    },
    getCities(countryCode=null){
    
        return this.defaultApiCall("/cities", "&country=" + countryCode)
            .then(data => console.log(data));
    }
};

// ApiHandler.getCities("Sweden");

export default ApiHandler;
