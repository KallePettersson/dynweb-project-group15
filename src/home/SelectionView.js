import React from "react";
import "./Home.css";
import Select from "react-select";
import { lab } from "d3";

// Styling method taken from React Select Library Documentation
const style = {
  control: (_, { selectProps: { width } }) => ({
    width: width,
  }),
};

function SelectorView({ title, options, onChange }) {
  return (
    <div>
      <Select
        options={Object.entries(options).map(([value, label]) => {
          let ref = {};
          ref["value"] = value;
          ref["label"] = label;
          return ref;
        })}
        onChange={onChange}
        placeholder={<p className="selector-text">SELECT CATEGORY</p>}
      />
    </div>
  );
}

export default SelectorView;
