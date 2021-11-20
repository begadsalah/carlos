import { FETCH_STORE_ITEMS, INITIAL_CONFIGURATION } from "./actionTypes";
import { LOADER } from "../alert/actionTypes";
import {
    SET_PAYMENT_USER_INFO,
    SET_PAYMENT_INFO,
    SET_PAYMENT_ORDER_INFO,
    GET_PAYMENT_GATEWAYS
} from "../payment/actionTypes";
import api from "../../config/api";
import { isAnyEmpty } from "../../helpers/object";
export const fetchStoreItems = postData => dispatch => {
    dispatch({ type: LOADER, payload: true });
    let url = api.store.StoreItems.fetch.path;
    fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
    })
        .then(response => response.json())
        .then(data => {
            dispatch({
                type: FETCH_STORE_ITEMS,
                payload: data.payload
            });
            dispatch({ type: LOADER, payload: false });
        });
};
export const callTheWaiter = postData => dispatch => {
    let url = api.store.Waiter.call.path;
    fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
    })
        .then(response => response.json())
        .then(data => console.log(data));
};
export const initial_configuration = initial_data => dispatch => {
    let url = new URLSearchParams(initial_data.location.search);
    let payload = {
        store_id: initial_data.match.params?.id,
        table_number: url.get("table")
    };
    // if(!isAnyEmpty(payload))
    dispatch({
        type: INITIAL_CONFIGURATION,
        payload
    });
};
