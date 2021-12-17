import React from "react";
import "../../css/Home.css";
import Select from "react-select";

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
