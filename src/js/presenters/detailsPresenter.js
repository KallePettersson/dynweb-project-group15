import {Criteria} from "../criteria";
import {useSelector} from "react-redux";
import DetailsView from "../views/detailsView";
import CriteriaInfo from "../criteriaInfo";

function DetailsPresenter() {
    const countriesData = useSelector(
        state => state.countriesReducer.countries
    )
    const criteriaSelected = useSelector(
        state => state.selectorReducer.criteria
    )
    const countryHovered = useSelector(
        state => state.countriesReducer.countryHovered
    )

    return (
        <DetailsView
            countriesData={countriesData}
            criteriaName={Criteria[criteriaSelected]}
            criteriaCode={criteriaSelected}
            criteriaInfo={CriteriaInfo[criteriaSelected]}
            countryHovered={countryHovered}
        />
    )
}

export default DetailsPresenter;