import Criteria from "../criteria";
import indexInfo from "../info";

function DetailsView() {
    let dataKeys = ();

    return (
        <span className="details-view">
<table className="item-flex">
{dataKeys
    .filter((data) => data === "rent_index")
    .map((data) => {
        return (
            <tr>
                <td>
                    <div className="details-view-banner">
                        Chosen Index:
                        {Criteria["rent_index"]}
                    </div>
                    <div className="index-view-item">
                        {indexInfo[data] || "currently no data available"}
                    </div>
                </td>
            </tr>
        );
    })}
</table>
<div className="details-view-banner">SWEDEN</div>
      <table className="item-flex">
{/* {dataKeys.map((data) => { */}
          {dataKeys
              .filter((data) => data === "rent_index")
              .map((data) => {
                  return (
                      <tr>
                          <td>
                              <div className="details-view-item">
                                  {Criteria[data]}:
                                  {String(props.countryData["SWE"][data].toFixed(1)) ||
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