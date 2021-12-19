import "../../css/home.css";
import {Criteria} from "../criteria";
import {useDispatch} from "react-redux";
import {database} from "../persistance/firebaseModel"
import {ref, set} from "firebase/database";
import Select from "react-select";
import React from "react";

function SelectionPresenter() {
    const dispatch = useDispatch();

    return (
        <div className="selectionView">
            <Select
                className="fixed-select"
                options={Object.entries(Criteria).map(([value, label]) => {
                    let ref = {};
                    ref["value"] = value;
                    ref["label"] = label;
                    return ref;
                })}
                onChange={e => {

                    // First update the selected country in the store
                    set(ref(database, 'geoloco'), {
                        criteria: e.value,
                    }).then(
                        dispatch({
                            type: "SELECT_CRITERIA",
                            payload: {
                                criteria: e.value
                            }
                        }));
                }}
                placeholder={<p className="selector-text">SELECT CATEGORY</p>}
            />
        </div>
    );
}

export default SelectionPresenter;
