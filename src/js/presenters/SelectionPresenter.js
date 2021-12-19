import "../../css/home.css";
import SelectionView from "../views/SelectionView";
import { Criteria } from "../criteria";
import { useDispatch } from "react-redux";
import { database } from "../firebaseModel"
import { ref, set } from "firebase/database";

function SelectionPresenter() {
    const dispatch = useDispatch();

    return (
        <div className="selectionView">
            <SelectionView
                options={Criteria}
                title="Criteria"
                onChange={e => {
                    // First update the selected country in the store

                    set(ref(database, 'geoloco'), {
                        criteria: e.value,
                    });

                    dispatch({
                        type: "SELECT_CRITERIA",
                        payload: {
                            criteria: e.value
                        }
                    })
                    dispatch({
                        type: "UPDATE_COLOR_GRADIENT" // todo remove
                    })
                }}
            />
        </div>
    );
}

export default SelectionPresenter;
