function DetailsView(props) {
  let dataKeys = ["crime_index", "climate_index"];
  console.log("HELLO", props.countryData["SWE"]);
  return (
    <span className="details-view">
      <div className="details-view-banner">SWEDEN</div>
      <table className="item-flex">
        {dataKeys.map((data) => {
          return (
            <tr>
              <td>
                <div className="details-view-item">
                  {props.metaData.keyToString[data]}:
                  {String(props.countryData["SWE"][data]) ||
                    "currently no data available"}
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
