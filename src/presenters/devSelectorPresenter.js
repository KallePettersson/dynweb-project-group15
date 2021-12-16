import DevSelectorView from "../views/devSelectorView";
import CountryCodes from "../countryCodes";
import Criteria from "../criteria";
import {useDispatch, useSelector} from "react-redux";
import ApiHandler from "../api-handler";

export default function DevSelectorPresenter() {
    const cities = useSelector(
        state => state.citiesReducer.cities
    )
    const dispatch = useDispatch();

    return (
        <div>
            <DevSelectorView name={"country"}
                             id={"country"}
                             items={Object.entries(CountryCodes)}
                             onChange={e => {
                                 // First update the selected country in the store
                                 dispatch({
                                     type: "SELECT_COUNTRY",
                                     payload: {
                                         country: CountryCodes[e.target.value]
                                     }
                                 });
                                 // Then update the list of cities
                                 ApiHandler.getCities(CountryCodes[e.target.value]).then(data => {
                                     dispatch({
                                         type: "UPDATE_CITIES",
                                         payload: {
                                             cities: data["cities"]
                                         }
                                     });
                                 })
                             }}/>
            <DevSelectorView name={"city"}
                             id={"city"}
                             items={cities.reduce((accumulator, city) => {
                                 return [...accumulator, [city.city, city.city]];
                             }, [])}
                             onChange={e => {
                                 // First update the selected country in the store
                                 dispatch({
                                     type: "SELECT_CITY",
                                     payload: {
                                         city: CountryCodes[e.target.value]
                                     }
                                 });
                             }}/>
            <DevSelectorView name={"criteria"}
                             id={"criteria"}
                             items={Object.entries(Criteria)}
                             onChange={e => {
                                 // First update the selected country in the store
                                 dispatch({
                                     type: "SELECT_CRITERIA",
                                     payload: {
                                         criteria: CountryCodes[e.target.value]
                                     }
                                 });
                             }}/>
        </div>
    )
}