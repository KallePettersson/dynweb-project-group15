import React, {useState} from "react";
import "./Home.css";
import SelectionView from "./SelectionView";
import {Criteria} from "../criteria";
import {useDispatch, useSelector} from "react-redux";
import DevSelectorView from "../views/devSelectorView";
import CountryCodes from "../countryCodes";
import ApiHandler from "../api-handler";


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
                }}
            />
        </div>
    );
}

export default SelectionPresenter;
