function IndexView(props) {
  let dataKeys = [
    "crime_index",
    "climate_index",
    "cpi_index",
    "groceries_index",
    "health_care_index",
    "pollution_index",
    "property_price_to_income_ratio",
    "purchasing_power_incl_rent_index",
    "rent_index",
    "restaurant_price_index",
    "safety_index",
    "traffic_co2_index",
    "traffic_index",
    "traffic_inefficiency_index",
    "traffic_time_index",
  ];
  console.log("HELLO", props.countryData["SWE"]);
  return (
    <span className="index-view">
      <div className="index-view-banner">About Indicies @GeoLoco:</div>
      <table className="item-flex">
        {dataKeys.map((data) => {
          return (
            <tr>
              <td>
                <div className="index-view-item">
                  {props.metaData.keyToString[data]}:
                  {props.metaData.keyToInfo[data] ||
                    "currently no data available"}
                </div>
              </td>
            </tr>
          );
        })}
        {/* {dataKeys.map((data) => {
            return (
              <tr>
                <td>
                  <div className="details-view-item">
                    {props.metaData.keyToString[data]}:
                    {props.metaData.keyToInfo[data]}
                  </div>
                </td>
              </tr>
            );
          })} */}
      </table>
    </span>
  );
}

export default IndexView;
