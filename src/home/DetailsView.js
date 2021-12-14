function DetailsView(props) {
  console.log("selected", props.metaData);
  return (
    <span className="details-view">
      <div className="details-view-banner">SWEDEN</div>
      <table className="item-flex">
        <tr>
          <td>
            <div className="details-view-item ">Price index: 40</div>
          </td>
        </tr>
        <tr>
          <td>
            <div className="details-view-item ">Crime rate:66</div>
          </td>
        </tr>
        <tr>
          <td>
            <div className="details-view-item ">Pollution: 30</div>
          </td>
        </tr>
        <tr>
          <td>
            <div className="details-view-item ">Price index: 40</div>
          </td>
        </tr>
        <tr>
          <td>
            <div className="details-view-item ">Crime rate:66</div>
          </td>
        </tr>
        <tr>
          <td>
            <div className="details-view-item ">Pollution: 30</div>
          </td>
        </tr>
        <tr>
          <td>
            <div className="details-view-item ">Price index: 40</div>
          </td>
        </tr>
        <tr>
          <td>
            <div className="details-view-item ">Crime rate:66</div>
          </td>
        </tr>
        <tr>
          <td>
            <div className="details-view-item ">Pollution: 30</div>
          </td>
        </tr>
        <tr>
          <td>
            <div className="details-view-item ">Price index: 40</div>
          </td>
        </tr>

        {/*   {props.metaData.map((item, index) => (
          <tr key={index}>
            <td className="priceAlign" key={item}></td>
          </tr>
        ))} */}
      </table>
    </span>
  );
}

export default DetailsView;
