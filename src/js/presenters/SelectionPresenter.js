import React, {useState} from "react";
import "../../css/home.css";
import SelectionView from "../views/SelectionView";
import {Criteria} from "../criteria";
import {useDispatch} from "react-redux";


function SelectionPresenter() {
    const dispatch = useDispatch();

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
