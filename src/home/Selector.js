import React from "react";
import "./Home.css";
import Select from "react-select";

const options = [
  { value: "sweden", label: "Sweden" },
  { value: "norway", label: "Norway" },
  { value: "denmark", label: "Denmark" },
];
const style = {
  menu: (provided, state) => ({
    ...provided,
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
        styles={style}
        placeholder={props.title}
      />
    </div>
  );
}

export default Selector;
