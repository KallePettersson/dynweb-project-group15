import React from "react";
import "./Home.css";
import Select from "react-select";

// Styling method taken from React Select Library Documentation
const style = {
    menu: (provided, state) => ({
        ...provided,
        width: state.selectProps.width,
    }),

    control: (_, {selectProps: {width}}) => ({
        width: width,
    }),
};

function SelectorView(props) {
    return (
        <div>
            <Select
                options={props.options.map((option) => {
                    let ref = {}
                    ref["value"] = option
                    ref["label"] = option
                    return ref
                })}
                onChange={(e) => props.model.setCategory(e.value)}
                styles={style}
                placeholder={<p className="selector-text">SELECT CATEGORY</p>}
                width="300px"
            />
        </div>
    );
}

export default SelectorView;
