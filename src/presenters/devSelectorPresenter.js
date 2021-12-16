import DevSelectorView from "../views/devSelectorView";
import CountryCodes from "../countryCodes";
import Criteria from "../criteria";
import {useDispatch, useSelector} from "react-redux";
import ApiHandler from "../api-handler";

export default function DevSelectorPresenter() {
    const cities = useSelector(
        store => store.citiesReducer.cities
    )
    const dispatch = useDispatch();

    return (
        <div>
            <DevSelectorView name={"country"}
                             id={"country"}
                             items={Object.entries(CountryCodes)}
                             onChange={e => {
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
                             onChange={e => console.log(e)}/>
            <DevSelectorView name={"criteria"}
                             id={"criteria"}
                             items={Object.entries(Criteria)}
                             onChange={e => console.log(e)}/>
        </div>
    )
}