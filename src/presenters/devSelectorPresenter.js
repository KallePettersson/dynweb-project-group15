import DevSelectorView from "../views/devSelectorView";
import CountryCodes from "../countryCodes";
import Criteria from "../criteria";

export default function DevSelectorPresenter() {
    return (
        <div>
            <DevSelectorView name={"country"} id={"country"} items={Object.entries(CountryCodes)}/>
            <DevSelectorView name={"city"} id={"city"} items={[]}/>
            <DevSelectorView name={"criteria"} id={"criteria"} items={Object.entries(Criteria)}/>
        </div>
    )
}