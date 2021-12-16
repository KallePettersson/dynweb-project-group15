import {Criteria} from "../criteria";
import indexInfo from "../info";
import { useSelector } from "react-redux";

function DetailsView() {
  let dataKeys = Object.keys(Criteria.Criteria);

  const countriesData = useSelector(
    (state) => state.countriesReducer.countries
  );

  const criteriaSelected = useSelector(
    (state) => state.selectorReducer.criteria
  );

  const countrySelected = useSelector((state) => state.selectorReducer.country);

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
                    {Criteria.Criteria[criteriaSelected]}
                  </div>
                  <div className="index-view-item">
                    {indexInfo[data] || "currently no data available"}
                  </div>
                </td>
              </tr>
            );
          })}
      </table>
      <div className="details-view-banner">{countrySelected.name}</div>
      <table className="item-flex">
        {dataKeys
          .filter((data) => data === criteriaSelected)
          .map((data) => {
            return (
              <tr>
                <td>
                  <div className="index-view-item">
                    {Criteria.Criteria[data]}:
                    {countrySelected !== "World"
                      ? String(countriesData[countrySelected][data].toFixed(1))
                      : "currently no data available"}
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
