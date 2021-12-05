import React from "react";
import "./Home.css";
import Select from "react-select";

const options = [
  { value: "sweden", label: "Sweden" },
  { value: "norway", label: "Norway" },
  { value: "denmark", label: "Denmark" },
];
const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    width: state.selectProps.width,
    color: state.selectProps.menuColor,
    paddingLeft: 50,
  }),

  control: (_, { selectProps: { width } }) => ({
    width: width,
  }),
};

function Selector(props) {
  return (
    <div>
      <Select
        options={options}
        onChange={(e) => console.log("Country:", e)}
        styles={customStyles}
        width="200px"
        menuColor="green"
      />
    </div>
  );
}

export default Selector;
