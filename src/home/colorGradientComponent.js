import React from 'react';
import './colorGradientComponent.css';
import {useSelector} from "react-redux";
import ColorConfig from "../colorConfig";


function ColorGradientComponent() {

    const minValue = useSelector(
        state => state.colorReducer.minValue
    )
    const maxValue = useSelector(
        state => state.colorReducer.maxValue
    )
    const order = useSelector(
        state => state.colorReducer.order
    )


    let fills = order === "ascending" ? Object.entries(ColorConfig.fills).reverse() : Object.entries(ColorConfig.fills)

    return (
        <div className="gradient-container">
            <div className="min-cell">{order === "ascending" ? minValue : maxValue}</div>
            {fills.map(colourCode => {
                if (colourCode[0] === "defaultFill") {
                    return null;
                } else {
                    return <div className="gradient-cell" style={{backgroundColor: colourCode[1]}}
                                key={colourCode[0]}/>
                }
            })}
            <div className="max-cell">{order === "ascending" ? maxValue : minValue}</div>
        </div>)
}

export default ColorGradientComponent;