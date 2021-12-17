import React, {useState} from "react";
import "../../css/Home.css";
import SelectionView from "../views/SelectionView";
import {Criteria} from "../criteria";
import {useDispatch, useSelector} from "react-redux";


function SelectionPresenter() {
    const dispatch = useDispatch();
    const criteria = useSelector(
        state => state.selectorReducer.criteria
    )

    return (
        <div className="selectionView">
            <SelectionView
                options={Criteria}
                title="Criteria"
                onChange={e => {
                    // First update the selected country in the store
                    dispatch({
                        type: "SELECT_CRITERIA",
                        payload: {
                            criteria: e.value
                        }
                    })
                    dispatch({
                        type: "UPDATE_COLOR_GRADIENT"
                    })
                }}
            />
        </div>
    );
}

export default SelectionPresenter;
