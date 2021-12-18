import CriteriaInfo from "../criteriaInfo";

function DetailsView({countriesData, criteriaName, criteriaCode, criteriaInfo, countryHovered}) {
    return (
        <span className="details-view">
            <table>
                <tbody>
                    <tr>
                        <td>
                            <div className="details-view-banner">
                                Index Information:{criteriaName}
                            </div>
                            <div className="details-view-item">
                                <p>
                                    The {criteriaName} Index:&nbsp;
                                    {CriteriaInfo[criteriaCode] || "currently no data available"} &nbsp;
                                    <br />
                                    <br />
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
                </tbody>
      </table>
            {/*<table className="item-flex">*/}
            {/*    <tr>*/}
            {/*        <td>*/}
            {/*            <div className="details-view-banner">*/}
            {/*                Chosen Index:*/}
            {/*                {criteriaName}*/}
            {/*            </div>*/}
            {/*            <div className="index-view-item">*/}
            {/*                {criteriaInfo || "currently no data available"}*/}
            {/*            </div>*/}
            {/*        </td>*/}
            {/*    </tr>*/}
            {/*</table>*/}
            {/*<div className="details-view-banner">{countriesData[countryHovered]}</div>*/}
            {/*<table className="item-flex">*/}
            {/*    <tr>*/}
            {/*        <td>*/}
            {/*            <div className="details-view-item">*/}
            {/*                {criteriaName}:*/}
            {/*                {countryHovered !== null ? String(countriesData[countryHovered][criteriaCode].toFixed(1)) : "currently no data available"}*/}
            {/*            </div>*/}
            {/*        </td>*/}
            {/*    </tr>*/}
            {/*</table>*/}
        </span>
    );
}

export default DetailsView;