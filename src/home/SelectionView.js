import React from "react";
import "./Home.css";
import Select from "react-select";
import { lab } from "d3";

// Styling method taken from React Select Library Documentation

function SelectorView({ title, options, onChange }) {
  return (
    <div>
      <Select
        className="fixed-select"
        options={Object.entries(options).map(([value, label]) => {
          let ref = {};
          ref["value"] = value;
          ref["label"] = label;
          return ref;
        })}
        onChange={onChange}
        placeholder={<p className="selector-text">Select Category!</p>}
      />
    </div>
  );
}

export default SelectorView;
