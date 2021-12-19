import '../../css/colorGradientComponent.css';

function ColorGradientView({minValue, maxValue, fills}) {
    return (
        <div className="gradient-container">
            <div className="min-cell">{minValue}</div>
            {fills.map(colourCode => {
                if (colourCode[0] === "defaultFill") {
                    return null;
                } else {
                    return <div className="gradient-cell" style={{backgroundColor: colourCode[1]}}
                                key={colourCode[0]}/>
                }
            })}
            <div className="max-cell">{maxValue}</div>
        </div>)
}

export default ColorGradientView;