import axios from 'axios';
import * as actionTypes from "./actionTypes";
import {cityListURL} from "../constants";

export const fetchSuccess = data => {
    return {
        type: actionTypes.FETCH_CITY_LIST,
        data: data
    }
}

export const fetchCity = () => {
    return dispatch => {
        axios.get(`${cityListURL}`).then(res => {
            dispatch(fetchSuccess(res.data));
        })
            .catch(err => {
                console.log(err)
            })
    }
}