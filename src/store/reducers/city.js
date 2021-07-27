import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  data: "",
};

const fetchSuccess = (state, action) => {
  return updateObject(state, {
    data: action.data,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SELECTED_CITY:
      return fetchSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
