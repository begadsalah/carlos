import {SET_PAYMENT_CHECK_OUT_PAYMENT,SET_ORDER_DATA_CHECK_OUT_PAYMENT, CLEAR_CHECK_OUT_PAYMENT } from './actionTypes'
import {
    SUCCESS_MESSAGE,
    ERROR_MESSAGE,
    WARNING_MESSAGE
} from "../alert/actionTypes";
export const setOrderData = (data) => dispatch => {
    dispatch({
        type:SET_ORDER_DATA_CHECK_OUT_PAYMENT,
        payload:data
    })
    dispatch({type: SUCCESS_MESSAGE, payload: {message: "Ready to Redirect", status_code: "PAYMENT-302"}});

}
