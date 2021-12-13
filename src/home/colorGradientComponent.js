import React from 'react';
import './colorGradientComponent.css'


function ColorGradientComponent(props) {
    return (<div className="gradient-container">
        <div className="min-cell" >{props.metaData[props.metaData.currentDataKey].min}</div>
        {Object.entries(props.colourConfig.fills).map(colourCode => {
            if (colourCode[0] == "defaultFill") {
                return null;
            } else {
                return <div className="gradient-cell" style={{ backgroundColor: colourCode[1] }} key={colourCode[0]}></div>
            }
        })}
        <div className="max-cell">{props.metaData[props.metaData.currentDataKey].max}</div>
    </div>)
}

export default ColorGradientComponent;