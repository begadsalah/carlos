import {SET_PAYMENT_CHECK_OUT_PAYMENT,SET_ORDER_DATA_CHECK_OUT_PAYMENT, CLEAR_CHECK_OUT_PAYMENT } from './actionTypes'

const initialState = {
    paymentInfo: {},
    paymentOrderInfo:{}
};

export default function(state = initialState, actions) {
    switch (actions.type) {
        case SET_PAYMENT_CHECK_OUT_PAYMENT:
            return {
                ...state,
                paymentInfo: actions.payload

            };
        case SET_ORDER_DATA_CHECK_OUT_PAYMENT:
            return {
                ...state,
                paymentOrderInfo: actions.payload
            };
        case  CLEAR_CHECK_OUT_PAYMENT:
            return {
                paymentInfo: {},
                paymentOrderInfo:{}
            }
        default:
            return state;
    }
}
