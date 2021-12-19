import React from "react";
import "../../css/home.css";
import Select from "react-select";

function SelectorView({options, onChange}) {
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
                placeholder={<p className="selector-text">SELECT CATEGORY</p>}
            />
        </div>
    );
}

export default SelectorView;
