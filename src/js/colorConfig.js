const colors = [
    "#f94144",
    "#f3722c",
    "#f9844a",
    "#f8961e",
    "#f9c74f",
    "#90be6d",
    "#43aa8b",
    "#4d908e",
    "#577590",
    "#277da1"
]

/**
 * Color related config for the map.
 */
const ColorConfig = {
    colourKeys: [
        "ZERO",
        "ONE",
        "TWO",
        "THREE",
        "FOUR",
        "FIVE",
        "SIX",
        "SEVEN",
        "EIGHT",
        "NINE",
    ],
    ascendingFills: {
        ZERO: colors[0],
        ONE: colors[1],
        TWO: colors[2],
        THREE: colors[3],
        FOUR: colors[4],
        FIVE: colors[5],
        SIX: colors[6],
        SEVEN: colors[7],
        EIGHT: colors[8],
        NINE: colors[9],
        defaultFill: '#c3c3c3'
    },
    descendingFills: {
        ZERO: colors[9],
        ONE: colors[8],
        TWO: colors[7],
        THREE: colors[6],
        FOUR: colors[5],
        FIVE: colors[4],
        SIX: colors[3],
        SEVEN: colors[2],
        EIGHT: colors[1],
        NINE: colors[0],
        defaultFill: '#c3c3c3'
    },
    highlightColorHover: '#037582',
    highlightBorderColor: '#037582'
}

/**
 * Determines what color a country should get based on the value of the given criteria
 * @param value
 * @param minValue
 * @param maxValue
 * @returns {string|*}
 */
function getColorGradient(value, minValue, maxValue) {
    if (isNaN(value)) {
        return "defaultFill"; //Default color when data is not available
    } else if (value < minValue) {
        return ColorConfig.colourKeys[0]
    } else if (value >= maxValue) {
        return ColorConfig.colourKeys[9]
    } else {
        let colourIndex = Math.floor(((value - minValue) / ((maxValue - minValue) / 10)));
        return ColorConfig.colourKeys[colourIndex]
    }
}

export {ColorConfig, getColorGradient};