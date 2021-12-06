import React from 'react';
import './colorGradientComponent.css'
class ColorGradientComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return <div className="gradient-container">

            <div className="gradient-container">
                {Object.entries(this.props.colourConfig.fills).map(colourCode => {
                    // console.log(colourCode[1]);
                    if (colourCode[0] == "defaultFill") {
                        return null;
                    } else {
                        return <div className="gradient-cell-container" key={colourCode[0]}>
                            <div className="gradient-cell" style={{ backgroundColor: colourCode[1] }}>
                                test
                            </div>
                            {colourCode[0] === "ZERO"?(<div>{this.props.metaData[this.props.metaData.currentDataKey].min}</div>):null}
                            {colourCode[0] === "NINE"?(<div>{this.props.metaData[this.props.metaData.currentDataKey].max}</div>):null}
                        </div>

                    }
                })}
            </div>
        </div>
    }

}

export default ColorGradientComponent;