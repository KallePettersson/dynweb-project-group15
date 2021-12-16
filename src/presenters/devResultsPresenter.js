import {useDispatch, useSelector} from "react-redux";
import DevResultsView from "../views/devResultsView";
import CountryCodes from "../countryCodes";
import ApiHandler from "../api-handler";

export default function DevResultsPresenter() {
    const countries = useSelector(
        state => state.countriesReducer.countries
    );
    const selectedCountry = useSelector(
        state => state.selectorReducer.country
    );
    const selectedCity = useSelector(
        state => state.selectorReducer.city
    );
    const selectedCriteria = useSelector(
        state => state.selectorReducer.criteria
    );
    const dispatch = useDispatch();

    return (
        <div>
            <DevResultsView criteria={selectedCriteria}
                            entities={selectedCriteria === null ? countries : {}}/>
            <p>{Object.entries(countries)}</p>
            <button onClick={(e) => {
                let promises = Object.values(CountryCodes).map((name) => ApiHandler.getCountryIndices(name));
                let results = {};
                Promise.all(promises).then(data => {
                    dispatch({
                        type: "UPDATE_COUNTRIES",
                        payload: {
                            countries: data.reduce((accumulator, data) => {
                                accumulator[getKeyByValue(CountryCodes, data.name)] = data;
                                return accumulator;
                            }, {})
                        }
                    });
                })
            }}>Load
            </button>
        </div>
    )
}

function initializeCountries() {
    let promises = Object.values(CountryCodes).map((name) => ApiHandler.getCountryIndices(name));
    let results = {};
    Promise.all(promises).then(data => {
        results = data.reduce((accumulator, data) => {
            accumulator[getKeyByValue(CountryCodes, data.name)] = data;
            return accumulator;
        }, {});
    });
    return results;
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}
