import {Criteria} from "../criteria";
import indexInfo from "../info";
import { useSelector } from "react-redux";

function DetailsView() {
    let dataKeys = Object.keys(Criteria);
    console.log("dataKeys", dataKeys);

    const countriesData = useSelector(
        state => state.countriesReducer.countries
    )

    const criteriaSelected = useSelector(
        state => state.selectorReducer.criteria
    )

    const countrySelected = useSelector(
        state => state.selectorReducer.country
    )

    const countryHovered = useSelector(
        state => state.countriesReducer.countryHovered
    )

    console.log("details-view criteriaSelected", criteriaSelected);
    return (
        <span className="details-view">
            <table className="item-flex">
                {dataKeys
                    .filter((data) => data === criteriaSelected)
                    .map((data) => {
                        return (
                            <tr>
                                <td>
                                    <div className="details-view-banner">
                                        Chosen Index:
                                        {Criteria[criteriaSelected]}
                                    </div>
                                    <div className="index-view-item">
                                        {indexInfo[data] || "currently no data available"}
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
            </table>
            <div className="details-view-banner">{countriesData[countryHovered]}</div>
            <table className="item-flex">
                {/* {dataKeys.map((data) => { */}
                {dataKeys
                    .filter((data) => data === criteriaSelected)
                    .map((data) => {
                        return (
                            <tr>
                                <td>
                                    <div className="details-view-item">
                                        {Criteria[data]}:
                                        {countryHovered !== null ? String(countriesData[countryHovered][data].toFixed(1)) : "currently no data available"}
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
            </table>
        </span>
    );
}

export default DetailsView;