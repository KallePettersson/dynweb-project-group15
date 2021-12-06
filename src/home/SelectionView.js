import React from "react";
import "./Home.css";
import Select from "react-select";

// Styling method taken from React Select Library Documentation
const style = {
  menu: (provided, state) => ({
    ...provided,
    width: state.selectProps.width,
  }),

  control: (_, { selectProps: { width } }) => ({
    width: width,
  }),
};

function SelectorView(title, options, callback) {
  return (
    <div>
      <Select
        options={options}
        onChange={(e) => callback(e)}
        styles={style}
        placeholder={<p className="selector-text">SELECT CATEGORY</p>}
        width="300px"
      />
    </div>
  );
}

export default SelectorView;
