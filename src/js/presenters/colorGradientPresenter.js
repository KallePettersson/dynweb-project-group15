// todo: unnecessary file?

import ColorGradientView from "../views/colorGradientView";
import {useSelector} from "react-redux";
import {ColorConfig} from "../colorConfig";

function ColorGradiantPresenter() {
    let minValue = useSelector(state => state.colorReducer.minValue);
    let maxValue = useSelector(state => state.colorReducer.maxValue);
    let order = useSelector(state => state.colorReducer.order);
    let fills = order === "ascending" ? ColorConfig.ascendingFills : ColorConfig.descendingFills
    return (
        <ColorGradientView
            minValue={minValue}
            maxValue={maxValue}
            fills={fills}
        />
    );
}

export default ColorGradiantPresenter;