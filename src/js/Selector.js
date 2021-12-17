import React from "react";
import "../css/Home.css";
import Select from "react-select";

const options = [
  { value: "sweden", label: "Sweden" },
  { value: "norway", label: "Norway" },
  { value: "denmark", label: "Denmark" },
];
const style = {
  menu: (provided, state) => ({
    ...provided,
    width: state.selectProps.width,
  }),

  control: (_, { selectProps: { width } }) => ({
    width: width,
  }),
};

function Selector(db, title) {
  return (
    <div>
      <Select
        options={db.results}
        onChange={(e) => console.log("Country:", e)}
        styles={style}
        placeholder={<p className="selector-text">Select Category</p>}
        width="300px"
      />
    </div>
  );
}

export default Selector;
