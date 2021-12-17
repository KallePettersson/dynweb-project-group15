import { Criteria } from "../criteria";
import indexInfo from "../info";
import { useSelector } from "react-redux";

function DetailsView() {
  let dataKeys = Object.keys(Criteria);
  console.log("dataKeys", dataKeys);

  const countriesData = useSelector(
    (state) => state.countriesReducer.countries
  );

  const criteriaSelected = useSelector(
    (state) => state.selectorReducer.criteria
  );

  const countrySelected = useSelector((state) => state.selectorReducer.country);

  const countryHovered = useSelector(
    (state) => state.countriesReducer.countryHovered
  );

  console.log("details-view criteriaSelected", criteriaSelected);
  return (
    <span className="details-view">
      <table>
        {dataKeys
          .filter((data) => data === criteriaSelected)
          .map((data) => {
            return (
              <tr>
                <td>
                  <div className="details-view-banner">
                    {Criteria[criteriaSelected]}
                  </div>
                  <div className="details-view-item">
                    <p>
                      <div className="item-header">
                        Information about current index <br />
                      </div>
                      The {Criteria[criteriaSelected]} Index:&nbsp;
                      {indexInfo[data] || "currently no data available"} &nbsp;
                      <br />
                      <br />
                      <div className="item-header">
                        General info on our indecies <br />
                      </div>
                      These indices are relative to New York City (NYC). Which
                      means that for New York City, each index should be 100(%).
                      If another city has, for example, rent index of 120, it
                      means that on an average in that city rents are 20% more
                      expensive than in New York City. If a city has rent index
                      of 70, that means on average rent in that city is 30% less
                      expensive than in New York City.
                    </p>
                  </div>
                </td>
              </tr>
            );
          })}
      </table>

      {/*   <table>
        {dataKeys
          .filter((data) => data === criteriaSelected)
          .map((data) => {
            return (
              <tr>
                <td>
                  <div className="details-view-banner">
                    {countriesData[countryHovered] || "No country"}
                  </div>
                  <div className="details-view-item">
                    {Criteria[data]}:
                    {countryHovered !== null
                      ? String(countriesData[countrySelected][data].toFixed(1))
                      : "currently no data available"}
                  </div>
                </td>
              </tr>
            );
          })}
      </table> */}
    </span>
  );
}

export default DetailsView;
