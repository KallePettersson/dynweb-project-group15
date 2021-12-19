function DetailsView({countriesData, criteriaName, criteriaCode, criteriaInfo, countryHovered}) {
    return (
        <span className="details-view">
            <table>
                <tbody>
                <tr>
                <td>
                  <div className="details-view-banner">
                    {criteriaName}
                  </div>
                  <div className="details-view-item">
                    <span>
                      <div className="item-header">
                        Information about current index <br/>
                      </div>
                      The {criteriaName} Index:&nbsp;
                        {criteriaInfo || "currently no data available"} &nbsp;
                        <br/>
                      <br/>
                      <div className="item-header">
                        General info on our indices <br/>
                      </div>
                      These indices are relative to New York City (NYC). Which
                      means that for New York City, each index should be 100(%).
                      If another city has, for example, rent index of 120, it
                      means that on an average in that city rents are 20% more
                      expensive than in New York City. If a city has rent index
                      of 70, that means on average rent in that city is 30% less
                      expensive than in New York City.
                    </span>
                  </div>
                </td>
                </tr>
                </tbody>
            </table>
        </span>
    );
}

export default DetailsView;