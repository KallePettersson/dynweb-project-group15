import React from "react";
import {useSelector} from "react-redux";
import ColorConfig from "../colorConfig";
import ColorGradientView from "../views/colorGradientView";


function ColorGradiantPresenter() {
    // const minValue = useSelector(
    //     state => state.colorReducer.minValue
    // )
    // const maxValue = useSelector(
    //     state => state.colorReducer.maxValue
    // )
    // const order = useSelector(
    //     state => state.colorReducer.order
    // )
    // let fills = order === "ascending" ? Object.entries(ColorConfig.fills).reverse() : Object.entries(ColorConfig.fills)

    return (
        <ColorGradientView
            minValue={null}
            maxValue={null}
            order={null}
            fills={[]}
        />
    );
}

export default ColorGradiantPresenter;