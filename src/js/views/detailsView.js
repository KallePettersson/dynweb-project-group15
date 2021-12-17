function DetailsView({countriesData, criteriaName, criteriaCode, criteriaInfo, countryHovered}) {
    return (
        <span className="details-view">
            <table className="item-flex">
                <tr>
                    <td>
                        <div className="details-view-banner">
                            Chosen Index:
                            {criteriaName}
                        </div>
                        <div className="index-view-item">
                            {criteriaInfo || "currently no data available"}
                        </div>
                    </td>
                </tr>
            </table>
            <div className="details-view-banner">{countriesData[countryHovered]}</div>
            <table className="item-flex">
                <tr>
                    <td>
                        <div className="details-view-item">
                            {criteriaName}:
                            {countryHovered !== null ? String(countriesData[countryHovered][criteriaCode].toFixed(1)) : "currently no data available"}
                        </div>
                    </td>
                </tr>
            </table>
        </span>
    );
}

export default DetailsView;